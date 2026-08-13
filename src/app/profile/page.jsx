"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  BadgeCheck,
  Building2,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import { getUserProfile } from "@/lib/authApi";

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("hackon_token");

        if (!token) {
          router.push("/auth");
          return;
        }

        const response = await getUserProfile(token);

        setUser(response.user);

        // LocalStorage user ko bhi latest profile se update kar do
        localStorage.setItem(
          "hackon_user",
          JSON.stringify(response.user)
        );
      } catch (err) {
        setError(
          err.message || "Profile load nahi hua."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("hackon_token");
    localStorage.removeItem("hackon_user");

    router.push("/auth");
    router.refresh();
  };

  const handleEditProfile = () => {
    // Abhi edit page/modal nahi bana hai.
    // Next step me isko working banayenge.
    router.push("/settings");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Sidebar />

        <div className="min-h-screen pl-0 md:pl-19">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#1d8dcc]" />

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading profile...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-white">
        <Sidebar />

        <div className="min-h-screen pl-0 md:pl-19">
          <Header />

          <section className="mx-auto max-w-3xl px-5 py-16">
            <div className="rounded-3xl border border-red-100 bg-red-50 p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-xl font-black text-red-600">
                !
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-950">
                Profile load nahi hua
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d8dcc]"
              >
                Try Again
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const initials =
    user?.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-19">
        <Header />

        <section className="mx-auto max-w-330 px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          {/* Page heading */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef8ff] px-3.5 py-2 text-xs font-bold text-[#1678bd]">
              <UserRound size={15} />
              My account
            </span>

            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage your personal information, account details and
              HackOn profile.
            </p>
          </div>

          {/* Main profile card */}
          <section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
            {/* Banner */}
            <div className="relative h-44 overflow-hidden bg-[linear-gradient(135deg,#eef8ff,#f8fbff,#ecfdff)]">
              <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-cyan-200/35 blur-3xl" />

              <div className="absolute left-1/3 top-8 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-2 text-xs font-bold text-[#1678bd] backdrop-blur sm:left-8 sm:top-8">
                <BadgeCheck size={15} />
                Verified HackOn Profile
              </div>
            </div>

            {/* Identity block */}
            <div className="px-5 pb-8 sm:px-8">
              <div className="relative -mt-12">
                <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Avatar */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#1769c2,#27b3d9)] text-2xl font-black text-white shadow-lg">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl">
                        {user?.name || "User"}
                      </h2>

                      <p className="mt-1 break-all text-sm font-medium text-slate-500">
                        {user?.email || "No email"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#eef8ff] px-3 py-1.5 text-xs font-bold capitalize text-[#1678bd]">
                          {user?.role || "user"}
                        </span>

                        {user?.college && (
                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                            {user.college}
                          </span>
                        )}

                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleEditProfile}
                      className="inline-flex h-11 items-center justify-center rounded-xl bg-[#1d8dcc] px-5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#177db6] hover:shadow-md"
                    >
                      Edit Profile
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* User information cards */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <ProfileInfoCard
                  icon={UserRound}
                  label="Full Name"
                  value={user?.name}
                  iconClass="bg-blue-50 text-blue-700"
                />

                <ProfileInfoCard
                  icon={Mail}
                  label="Email Address"
                  value={user?.email}
                  iconClass="bg-cyan-50 text-cyan-700"
                />

                <ProfileInfoCard
                  icon={Building2}
                  label="College"
                  value={user?.college || "Not added"}
                  iconClass="bg-violet-50 text-violet-700"
                />

                <ProfileInfoCard
                  icon={Phone}
                  label="Phone Number"
                  value={
                    user?.phone
                      ? `+91 ${user.phone}`
                      : "Not added"
                  }
                  iconClass="bg-emerald-50 text-emerald-700"
                />

                <ProfileInfoCard
                  icon={ShieldCheck}
                  label="Account Role"
                  value={user?.role || "user"}
                  iconClass="bg-amber-50 text-amber-700"
                />

                <ProfileInfoCard
                  icon={BadgeCheck}
                  label="Account Status"
                  value="Active"
                  iconClass="bg-sky-50 text-sky-700"
                />
              </div>
            </div>
          </section>

          {/* Bottom cards */}
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            {/* Account overview */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="text-lg font-black text-slate-950">
                Account overview
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Basic information linked with your HackOn account.
              </p>

              <div className="mt-6 divide-y divide-slate-100">
                <OverviewRow
                  label="User ID"
                  value={user?._id || user?.id || "-"}
                />

                <OverviewRow
                  label="Profile Type"
                  value={
                    user?.role === "admin"
                      ? "Administrator"
                      : user?.role === "judge"
                      ? "Judge"
                      : "Participant"
                  }
                />

                <OverviewRow
                  label="College"
                  value={user?.college || "Not added"}
                />

                <OverviewRow
                  label="Phone"
                  value={
                    user?.phone
                      ? `+91 ${user.phone}`
                      : "Not added"
                  }
                />

                <OverviewRow
                  label="Account Access"
                  value="Hackathons, Teams & Submissions"
                />
              </div>
            </section>

            {/* Security */}
            <section className="rounded-3xl border border-[#d9effb] bg-[#f4fbff] p-6 sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#1d8dcc] shadow-sm">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-5 text-lg font-black text-slate-950">
                Your account is secure
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your profile uses authenticated access and JWT-based
                backend verification.
              </p>

              <button
                type="button"
                onClick={() => router.push("/security")}
                className="mt-6 inline-flex items-center justify-center rounded-xl border border-[#c9e8f7] bg-white px-4 py-3 text-sm font-bold text-[#1678bd] transition hover:bg-[#eef8ff]"
              >
                Security Settings
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={17} />
                Logout from HackOn
              </button>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

const ProfileInfoCard = ({
  icon: Icon,
  label,
  value,
  iconClass,
}) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
      >
        <Icon size={18} />
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm font-extrabold text-slate-900">
        {value || "-"}
      </p>
    </article>
  );
};

const OverviewRow = ({ label, value }) => {
  return (
    <div className="flex flex-col justify-between gap-2 py-4 sm:flex-row sm:items-center">
      <span className="text-sm font-semibold text-slate-500">
        {label}
      </span>

      <span className="break-all text-sm font-bold text-slate-900">
        {value}
      </span>
    </div>
  );
};

export default ProfilePage;