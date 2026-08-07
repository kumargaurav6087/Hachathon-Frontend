"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  BarChart3,
  Bell,
  CalendarDays,
  Home,
  LogOut,
  Menu,
  Search,
  Settings,
  Trophy,
  Upload,
  User,
  X,
} from "lucide-react";

const mobileMenuItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore",
    href: "/explore",
    icon: Search,
  },
  {
    label: "Upcoming",
    href: "/upcoming",
    icon: CalendarDays,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Submit Project",
    href: "/submit",
    icon: Upload,
  },
  {
    label: "Certificates",
    href: "/certificates",
    icon: Trophy,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedUser =
      localStorage.getItem("hackon_user");

    const token =
      localStorage.getItem("hackon_token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error(
          "Stored user data invalid:",
          error,
        );

        localStorage.removeItem("hackon_user");
        localStorage.removeItem("hackon_token");
      }
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("hackon_token");
    localStorage.removeItem("hackon_user");

    setUser(null);
    setMobileMenuOpen(false);

    router.push("/auth");
    router.refresh();
  };

  const getInitials = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="flex h-19 items-center gap-3 px-4 sm:px-6 lg:px-10">
          {/* Logo and full name */}
          <Link
            href="/"
            className="flex min-w-fit shrink-0 items-center gap-2.5 md:min-w-55"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1769c2] text-lg font-black text-white shadow-sm">
              H
            </span>

            <span className="whitespace-nowrap text-lg font-extrabold tracking-[-0.04em] text-slate-950 sm:text-[22px]">
              HackOn
            </span>
          </Link>

          {/* Desktop search */}
          <div className="mx-auto hidden w-full max-w-152.5 md:block">
            <label className="flex h-11 items-center gap-3 rounded-full bg-slate-100 px-5 text-slate-500 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1769c2]/20">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
            </label>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* Mobile search */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-slate-700 transition hover:text-[#1769c2] md:hidden"
              aria-label="Search"
            >
              <Search size={21} />
            </button>

            {/* Notification */}
            {mounted && user && (
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center text-slate-700 transition hover:text-[#1769c2]"
                aria-label="Notifications"
              >
                <Bell size={21} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
              </button>
            )}

            {/* Desktop user/login — no hamburger */}
            <div className="hidden md:block">
              {!mounted ? (
                <div className="h-10 w-24 rounded-full bg-slate-100" />
              ) : user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1769c2] text-xs font-black text-white">
                    {getInitials()}
                  </span>

                  <span className="max-w-32 truncate text-sm font-bold text-slate-800">
                    {user.name || "User"}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="rounded-full bg-[#1769c2] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#125aa7] hover:shadow-md"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile login/hamburger */}
            <div className="md:hidden">
              {!mounted ? (
                <div className="h-10 w-10" />
              ) : user ? (
                <button
                  type="button"
                  onClick={() =>
                    setMobileMenuOpen(true)
                  }
                  className="flex h-10 w-10 items-center justify-center bg-transparent p-0 text-slate-950 transition hover:text-[#1769c2]"
                  aria-label="Open menu"
                >
                  <Menu
                    size={27}
                    strokeWidth={2.3}
                  />
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="rounded-full bg-[#1769c2] px-4 py-2.5 text-xs font-bold text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() =>
          setMobileMenuOpen(false)
        }
      />

      {/* Mobile right drawer */}
      <aside
        className={`fixed bottom-0 right-0 top-0 z-60 flex w-[82%] max-w-90 flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-1/2 md:hidden ${
          mobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
          <Link
            href="/"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="flex items-center gap-3"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1769c2] font-black text-white">
              H
            </span>

            <span className="text-xl font-black text-slate-950">
              HackOn
            </span>
          </Link>

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="flex h-10 w-10 items-center justify-center bg-transparent text-slate-700 transition hover:text-red-600"
            aria-label="Close menu"
          >
            <X
              size={24}
              strokeWidth={2.2}
            />
          </button>
        </div>

        {/* Logged-in user information */}
        {user && (
          <div className="border-b border-slate-100 px-5 py-5">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1769c2] text-sm font-black text-white">
                {getInitials()}
              </span>

              <div className="min-w-0">
                <p className="wrap-break-word text-sm font-black text-slate-950">
                  {user.name || "HackOn User"}
                </p>

                <p className="mt-1 break-all text-xs text-slate-500">
                  {user.email ||
                    user.phone ||
                    "Participant"}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-blue-700">
                  {user.role || "user"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(
                    item.href,
                  ));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold transition ${
                    active
                      ? "bg-blue-50 text-[#1769c2]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <Icon size={19} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-slate-200 p-4">
          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <User size={19} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={19} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="flex w-full items-center justify-center rounded-xl bg-[#1769c2] px-5 py-3.5 text-sm font-bold text-white"
            >
              Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;