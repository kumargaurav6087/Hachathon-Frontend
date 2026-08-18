"use client";

import {
  usePathname,
} from "next/navigation";

import Footer from "./Footer";

const SiteFooter = () => {
  const pathname =
    usePathname();

  const hiddenRoutes = [
    "/auth",
    "/login",
    "/signup",
  ];

  const hideFooter =
    hiddenRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`
        )
    );

  if (hideFooter) {
    return null;
  }

  return <Footer />;
};

export default SiteFooter;