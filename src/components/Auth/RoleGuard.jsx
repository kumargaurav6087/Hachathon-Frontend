"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const RoleGuard = ({
  children,
  allowedRoles = [],
}) => {
  const router = useRouter();

  const [checking, setChecking] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "hackon_token"
      );

    const userString =
      localStorage.getItem(
        "hackon_user"
      );

    if (!token || !userString) {
      router.replace("/auth");
      return;
    }

    let user;

    try {
      user = JSON.parse(userString);
    } catch {
      localStorage.removeItem(
        "hackon_token"
      );

      localStorage.removeItem(
        "hackon_user"
      );

      router.replace("/auth");
      return;
    }

    if (
      !allowedRoles.includes(
        user.role
      )
    ) {
      router.replace(
        "/dashboard"
      );

      return;
    }

    setAllowed(true);
    setChecking(false);
  }, [router, allowedRoles]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-blue-700"
          />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Checking access...
          </p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return children;
};

export default RoleGuard;