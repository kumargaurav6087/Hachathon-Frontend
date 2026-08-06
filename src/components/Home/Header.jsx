"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-[76px] items-center gap-6 px-5 sm:px-7 lg:px-10">
        <Link
          href="/"
          className="flex min-w-fit items-center gap-2.5 md:min-w-[220px]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1769c2] text-lg font-black text-white shadow-sm">
            H
          </span>

          <span className="text-[22px] font-extrabold tracking-[-0.04em] text-slate-950">
            HackOn
          </span>
        </Link>

        <div className="mx-auto hidden w-full max-w-[610px] md:block">
          <label className="flex h-11 items-center gap-3 rounded-full bg-slate-100 px-5 text-slate-500 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1769c2]/20">
            <Search size={19} strokeWidth={2} />

            <input
              type="text"
              placeholder="Search opportunities..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
            />
          </label>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
          </button>

          <Link
            href="/login"
            className="rounded-full bg-[#1769c2] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#125aa7] hover:shadow-md"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;