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
// this is just for push 

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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const storedUser = localStorage.getItem("hackon_user");
    const token = localStorage.getItem("hackon_token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Stored user data invalid:", error);

        localStorage.removeItem("hackon_user");
        localStorage.removeItem("hackon_token");
      }
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
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

  const handleMobileSearch = (event) => {
    event.preventDefault();

    const value = mobileSearch.trim();

    if (!value) {
      router.push("/hackathons");
      setMobileSearchOpen(false);
      return;
    }

    router.push(
      `/hackathons?search=${encodeURIComponent(value)}`
    );

    setMobileSearchOpen(false);
    setMobileSearch("");
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

  const isMenuActive = (href) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="flex h-[68px] items-center gap-2 px-4 sm:h-19 sm:px-6 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-fit shrink-0 items-center gap-2 md:min-w-55"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1769c2] text-base font-black text-white shadow-[0_5px_15px_rgba(23,105,194,0.24)] sm:h-10 sm:w-10 sm:text-lg">
              H
            </span>

            <span className="whitespace-nowrap text-lg font-black tracking-[-0.04em] text-slate-950 sm:text-[22px]">
              HackOn
            </span>
          </Link>

          {/* Desktop search */}
          <div className="mx-auto hidden w-full max-w-[610px] md:block">
            <label className="flex h-11 items-center gap-3 rounded-full border border-transparent bg-slate-100 px-5 text-slate-500 transition focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#1769c2]/10">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
            </label>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
            {/* Mobile search */}
            <button
              type="button"
              onClick={() =>
                setMobileSearchOpen((prev) => !prev)
              }
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                transition
                active:scale-90
                md:hidden

                ${
                  mobileSearchOpen
                    ? "bg-blue-50 text-[#1769c2]"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#1769c2]"
                }
              `}
              aria-label="Search"
            >
              {mobileSearchOpen ? (
                <X size={20} />
              ) : (
                <Search size={21} />
              )}
            </button>

            {/* Notification */}
            {mounted && user && (
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-slate-100 hover:text-[#1769c2] active:scale-90"
                aria-label="Notifications"
              >
                <Bell size={21} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
              </button>
            )}

            {/* Desktop user */}
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

            {/* Mobile user */}
            <div className="md:hidden">
              {!mounted ? (
                <div className="h-10 w-10" />
              ) : user ? (
                <button
                  type="button"
                  onClick={() =>
                    setMobileMenuOpen(true)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-950 transition hover:bg-slate-100 hover:text-[#1769c2] active:scale-90"
                  aria-label="Open menu"
                >
                  <Menu
                    size={25}
                    strokeWidth={2.3}
                  />
                </button>
              ) : (
                <Link
                  href="/auth"
                  className="rounded-full bg-[#1769c2] px-4 py-2.5 text-xs font-bold text-white shadow-sm active:scale-95"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div
          className={`
            overflow-hidden
            border-t
            border-slate-100
            bg-white
            transition-all
            duration-300
            md:hidden

            ${
              mobileSearchOpen
                ? "max-h-24 opacity-100"
                : "max-h-0 border-transparent opacity-0"
            }
          `}
        >
          <form
            onSubmit={handleMobileSearch}
            className="flex items-center gap-2 px-4 py-3"
          >
            <label className="flex h-11 flex-1 items-center gap-2.5 rounded-2xl bg-slate-100 px-4 text-slate-500 focus-within:ring-2 focus-within:ring-[#1769c2]/20">
              <Search size={18} />

              <input
                type="text"
                value={mobileSearch}
                onChange={(event) =>
                  setMobileSearch(event.target.value)
                }
                autoFocus={mobileSearchOpen}
                placeholder="Search opportunities..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>

            <button
              type="submit"
              className="flex h-11 shrink-0 items-center justify-center rounded-2xl bg-[#1769c2] px-4 text-xs font-bold text-white shadow-sm active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`
          fixed
          inset-0
          z-50
          bg-slate-950/45
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          md:hidden

          ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={() =>
          setMobileMenuOpen(false)
        }
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`
          fixed
          bottom-0
          right-0
          top-0
          z-[60]
          flex
          w-[86%]
          max-w-[360px]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out

          sm:w-1/2
          md:hidden

          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Drawer top */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <Link
            href="/"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="flex items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1769c2] font-black text-white shadow-sm">
              H
            </span>

            <span className="text-xl font-black tracking-[-0.04em] text-slate-950">
              HackOn
            </span>
          </Link>

          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-red-50 hover:text-red-600 active:scale-90"
            aria-label="Close menu"
          >
            <X size={23} />
          </button>
        </div>

        {/* USER CARD */}
        {user && (
          <div className="border-b border-slate-100 px-4 py-4">
            <Link
              href="/profile"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3.5 shadow-sm transition active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1769c2] text-sm font-black text-white shadow-[0_6px_15px_rgba(23,105,194,0.25)]">
                {getInitials()}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-slate-950">
                  {user.name || "HackOn User"}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {user.email ||
                    user.phone ||
                    "Participant"}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-[#1769c2]">
                  {user.role || "user"}
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1.5">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isMenuActive(
                item.href
              );

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={
                    active ? "page" : undefined
                  }
                  className={`
                    group
                    relative
                    flex
                    min-h-[52px]
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-2xl
                    px-3
                    py-2.5
                    text-sm
                    font-bold
                    transition-all
                    duration-200
                    active:scale-[0.97]

                    ${
                      active
                        ? "bg-[#1769c2] text-white shadow-[0_8px_20px_rgba(23,105,194,0.23)]"
                        : "text-slate-600 hover:bg-blue-50 hover:text-[#1769c2]"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                  )}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all

                      ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-[#1769c2]"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={
                        active ? 2.5 : 2
                      }
                    />
                  </span>

                  <span className="flex-1">
                    {item.label}
                  </span>

                  {active && (
                    <span className="rounded-full bg-white/15 px-2 py-1 text-[9px] font-black uppercase tracking-wider">
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* BOTTOM ACTIONS */}
        <div className="border-t border-slate-200 bg-white p-4">
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() =>
                  setMobileMenuOpen(false)
                }
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <User size={19} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 active:scale-[0.98]"
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