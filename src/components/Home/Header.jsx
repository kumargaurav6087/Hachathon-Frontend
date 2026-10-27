"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  BarChart3,
  Bell,
  CalendarDays,
  FileCheck2,
  Home,
  Info,
  LogOut,
  Menu,
  PlusCircle,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Trophy,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";

const mobileMenuItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Explore Challenges",
    href: "/explore",
    icon: Search,
  },
  {
    label: "Raise a Problem",
    href: "/problems/new",
    icon: PlusCircle,
    highlight: true,
  },
  {
    label: "About Project",
    href: "/about",
    icon: Info,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    label: "Teams",
    href: "/teams",
    icon: Users,
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
    label: "Admin Moderation",
    href: "/admin/moderation",
    icon: ShieldAlert,
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
  const [desktopSearch, setDesktopSearch] = useState("");

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

  const handleDesktopSearch = (event) => {
    event.preventDefault();
    const value = desktopSearch.trim();
    if (!value) {
      router.push("/explore");
      return;
    }
    router.push(`/explore?search=${encodeURIComponent(value)}`);
  };

  const handleMobileSearch = (event) => {
    event.preventDefault();
    const value = mobileSearch.trim();

    if (!value) {
      router.push("/explore");
      setMobileSearchOpen(false);
      return;
    }

    router.push(`/explore?search=${encodeURIComponent(value)}`);
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

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* HEADER */}
<<<<<<< HEAD
      <header className="sticky top-0 z-40 border-b border-violet-100 bg-white/95 backdrop-blur-xl">
        <div className="flex h-[70px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-10">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex min-w-fit shrink-0 items-center gap-2.5 transition-transform hover:scale-[1.02]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-700 via-purple-600 to-indigo-600 text-lg font-black text-white shadow-[0_6px_20px_rgba(124,58,237,0.32)]">
                N
              </span>
=======
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="flex h-17 items-center gap-2 px-4 sm:h-19 sm:px-6 lg:px-10">

          {/* Logo */}
          <Link
            href="/"
            className="flex min-w-fit shrink-0 items-center gap-2 md:min-w-55"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1769c2] text-base font-black text-white shadow-[0_5px_15px_rgba(23,105,194,0.24)] sm:h-10 sm:w-10 sm:text-lg">
              H
            </span>
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146

              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-950 sm:text-[22px]">
                  NexKripa
                </span>
                <span className="hidden text-[10px] font-bold uppercase tracking-wider text-violet-600 sm:block">
                  Social Innovation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 lg:flex">
              <Link
                href="/explore"
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  pathname === "/explore"
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Challenges
              </Link>
              <Link
                href="/about"
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  pathname === "/about"
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                About Project
              </Link>
              <Link
                href="/dashboard"
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                  pathname === "/dashboard"
                    ? "bg-violet-50 text-violet-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Dashboard
              </Link>
            </nav>
          </div>

<<<<<<< HEAD
          {/* Desktop search */}
          <div className="mx-2 hidden w-full max-w-[480px] md:block">
            <form onSubmit={handleDesktopSearch}>
              <label className="flex h-11 items-center gap-3 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 text-slate-500 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-500/10">
                <Search size={18} className="text-violet-600" />
                <input
                  type="text"
                  value={desktopSearch}
                  onChange={(e) => setDesktopSearch(e.target.value)}
                  placeholder="Search social challenges, domains, skills..."
                  className="w-full bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                />
              </label>
            </form>
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Raise a Problem Button (Desktop) */}
            <Link
              href="/problems/new"
              className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:from-violet-700 hover:to-purple-700 hover:shadow-md sm:inline-flex"
            >
              <PlusCircle size={16} />
              Raise a Problem
            </Link>

            {/* Mobile search toggle */}
            <button
              type="button"
              onClick={() => setMobileSearchOpen((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl transition active:scale-90 md:hidden ${
                mobileSearchOpen
                  ? "bg-violet-50 text-violet-600"
                  : "text-slate-700 hover:bg-slate-100 hover:text-violet-600"
              }`}
=======
          {/* Desktop Search */}
          <div className="mx-auto hidden w-full max-w-152.5 md:block">
            <label className="flex h-11 items-center gap-3 rounded-full border border-transparent bg-slate-100 px-5 text-slate-500 transition focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#1769c2]/10">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search opportunities..."
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
              />
            </label>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">

            {/* Mobile Search */}
            <button
              type="button"
              onClick={() =>
                setMobileSearchOpen((prev) => !prev)
              }
              className={`
                flex h-10 w-10 items-center justify-center
                rounded-xl transition active:scale-90 md:hidden
                ${
                  mobileSearchOpen
                    ? "bg-blue-50 text-[#1769c2]"
                    : "text-slate-700 hover:bg-slate-100 hover:text-[#1769c2]"
                }
              `}
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
              aria-label="Search"
            >
              {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            {/* Notifications */}
            {mounted && user && (
              <button
                type="button"
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition hover:bg-violet-50 hover:text-violet-700 active:scale-90"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-violet-600" />
              </button>
            )}

<<<<<<< HEAD
            {/* Desktop user profile button */}
            <div className="hidden sm:block">
=======
            {/* Desktop User */}
            <div className="hidden md:block">
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
              {!mounted ? (
                <div className="h-10 w-24 rounded-full bg-slate-100" />
              ) : user ? (
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 shadow-sm transition hover:border-violet-300 hover:bg-violet-50/50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-xs font-black text-white">
                    {getInitials()}
                  </span>
                  <span className="max-w-28 truncate text-xs font-bold text-slate-800">
                    {user.name || "User"}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="rounded-full bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700"
                >
                  Sign In
                </Link>
              )}
            </div>

<<<<<<< HEAD
            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-900 transition hover:bg-violet-50 hover:text-violet-700 active:scale-90"
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={2.3} />
              </button>
            </div>
=======
            {/* MOBILE HAMBURGER */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-950 transition hover:bg-slate-100 hover:text-[#1769c2] active:scale-90 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu
                size={25}
                strokeWidth={2.3}
              />
            </button>
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
          </div>
        </div>

        {/* MOBILE SEARCH BAR */}
        <div
<<<<<<< HEAD
          className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 md:hidden ${
            mobileSearchOpen ? "max-h-24 opacity-100" : "max-h-0 border-transparent opacity-0"
          }`}
=======
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
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
        >
          <form onSubmit={handleMobileSearch} className="flex items-center gap-2 px-4 py-3">
            <label className="flex h-11 flex-1 items-center gap-2.5 rounded-2xl bg-slate-100 px-4 text-slate-500 focus-within:ring-2 focus-within:ring-violet-600/20">
              <Search size={18} />
              <input
                type="text"
                value={mobileSearch}
                onChange={(event) => setMobileSearch(event.target.value)}
                autoFocus={mobileSearchOpen}
                placeholder="Search challenges, skills, categories..."
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </label>

            <button
              type="submit"
              className="flex h-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 px-4 text-xs font-bold text-white shadow-sm active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
<<<<<<< HEAD
        className={`fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
=======
        className={`
          fixed inset-0 z-50 bg-slate-950/45
          backdrop-blur-[2px]
          transition-opacity duration-300 md:hidden
          ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={() =>
          setMobileMenuOpen(false)
        }
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
      />

      {/* MOBILE DRAWER */}
      <aside
<<<<<<< HEAD
        className={`fixed bottom-0 right-0 top-0 z-[60] flex w-[86%] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-1/2 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
=======
        className={`
          fixed bottom-0 right-0 top-0 z-60
          flex w-[86%] max-w-90 flex-col
          bg-white shadow-2xl
          transition-transform duration-300 ease-out
          sm:w-1/2 md:hidden
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
      >
        {/* Drawer Top */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-purple-700 font-black text-white shadow-sm">
              N
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-950">
                NexKripa
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-violet-600">
                Social Innovation
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-red-50 hover:text-red-600 active:scale-90"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* USER CARD (if logged in) */}
        {user ? (
          <div className="border-b border-slate-100 px-4 py-3.5">
            <Link
              href="/profile"
<<<<<<< HEAD
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/50 to-white p-3 shadow-sm transition active:scale-[0.98]"
=======
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-linear-to-br from-slate-50 to-white p-3.5 shadow-sm transition active:scale-[0.98]"
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 text-xs font-black text-white shadow-sm">
                {getInitials()}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-slate-950">
                  {user.name || "Innovator"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user.email || user.phone || "Community Member"}
                </p>
                <span className="mt-1 inline-flex rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-violet-700">
                  {user.role || "community"}
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="border-b border-slate-100 p-4">
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-xs font-bold text-white shadow-sm active:scale-95"
            >
              Sign In / Register
            </Link>
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-1">
            {mobileMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isMenuActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
<<<<<<< HEAD
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex min-h-[46px] items-center gap-3 overflow-hidden rounded-xl px-3 py-2 text-xs font-bold transition-all duration-200 active:scale-[0.98] ${
                    active
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                      : item.highlight
                      ? "bg-violet-50 text-violet-700 hover:bg-violet-100"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
=======
                  aria-current={
                    active ? "page" : undefined
                  }
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className={`
                    group relative flex min-h-13
                    items-center gap-3 overflow-hidden
                    rounded-2xl px-3 py-2.5
                    text-sm font-bold transition-all
                    duration-200 active:scale-[0.97]
                    ${
                      active
                        ? "bg-[#1769c2] text-white shadow-[0_8px_20px_rgba(23,105,194,0.23)]"
                        : "text-slate-600 hover:bg-blue-50 hover:text-[#1769c2]"
                    }
                  `}
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
                >
                  <span
<<<<<<< HEAD
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${
                      active
                        ? "bg-white/20 text-white"
                        : item.highlight
                        ? "bg-violet-200 text-violet-800"
                        : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-violet-600"
                    }`}
=======
                    className={`
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-xl transition-all
                      ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-[#1769c2]"
                      }
                    `}
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
                  >
                    <Icon size={16} strokeWidth={active ? 2.5 : 2} />
                  </span>

                  <span className="flex-1">{item.label}</span>

                  {item.highlight && !active && (
                    <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* BOTTOM ACTIONS */}
<<<<<<< HEAD
        {user && (
          <div className="border-t border-slate-200 bg-white p-3">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50 active:scale-[0.98]"
=======
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
              onClick={() =>
                setMobileMenuOpen(false)
              }
              className="flex w-full items-center justify-center rounded-xl bg-[#1769c2] px-5 py-3.5 text-sm font-bold text-white"
>>>>>>> 632dc709e59a36e5eb9cf54900a9976878fe4146
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Header;