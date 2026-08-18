"use client";

import { ArrowRight, Search, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      router.push("/hackathons");
      return;
    }

    router.push(`/hackathons?search=${encodeURIComponent(value)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/70 blur-3xl sm:h-96 sm:w-96" />

        <div className="absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-indigo-100/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-[960px] text-center">
        {/* Top badge */}
        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-2 text-xs font-bold text-[#1769c2] shadow-sm sm:px-4 sm:text-sm">
          <Zap
            size={15}
            fill="currentColor"
            className="shrink-0"
          />

          <span className="truncate sm:whitespace-normal">
            1,000+ new opportunities added this week
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto mt-6 max-w-[900px] text-[42px] font-black leading-[0.98] tracking-[-0.055em] text-slate-950 min-[390px]:text-[46px] sm:mt-7 sm:text-6xl lg:text-[76px]">
          Unlock Your{" "}
          <span className="bg-gradient-to-r from-[#225fbd] via-[#1685ca] to-[#18a7cf] bg-clip-text text-transparent">
            Career
          </span>

          <span className="mt-1 block bg-gradient-to-r from-[#2188d1] to-[#22b9c7] bg-clip-text text-transparent sm:mt-2">
            Potential
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-[720px] px-1 text-[15px] leading-6 text-slate-500 sm:mt-7 sm:text-lg sm:leading-8">
          Discover hackathons, coding competitions, case study challenges,
          internships and opportunities from leading companies.
        </p>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-[720px] sm:mt-10"
        >
          <div className="rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.08)] sm:flex sm:items-center sm:rounded-full">
            <label className="flex h-13 flex-1 items-center gap-3 px-3 sm:h-14 sm:px-4">
              <Search
                size={20}
                className="shrink-0 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search hackathons, companies or skills..."
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 sm:text-[15px]"
              />
            </label>

            <button
              type="submit"
              className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#1769c2] to-[#168ed0] px-7 text-sm font-bold text-white shadow-md transition duration-300 active:scale-[0.98] sm:mt-0 sm:h-12 sm:w-auto sm:rounded-full sm:px-7 sm:hover:-translate-y-0.5 sm:hover:shadow-lg"
            >
              Explore Now

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </form>

        {/* Small trust line */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 sm:mt-7 sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#1685ca]" />
            Discover opportunities
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <span>No registration fee</span>

          <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

          <span>Build your profile</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;