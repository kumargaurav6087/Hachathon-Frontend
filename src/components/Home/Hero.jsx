"use client";

import { ArrowRight, Compass, HeartHandshake, PlusCircle, Search, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Hero = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const value = search.trim();
    if (!value) {
      router.push("/explore");
      return;
    }
    router.push(`/explore?search=${encodeURIComponent(value)}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 lg:py-20">
      {/* Background ambient gradient decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-4 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-200/50 blur-3xl sm:h-[450px] sm:w-[450px]" />
        <div className="absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        {/* Top presentation badge */}
        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-violet-200 bg-violet-50/90 px-4 py-1.5 text-xs font-bold text-violet-700 shadow-sm backdrop-blur-sm sm:text-sm">
          <Sparkles size={15} className="shrink-0 text-violet-600" />
          <span className="truncate sm:whitespace-normal">
            NexKripa • Community-Based Hackathon for Social Innovation
          </span>
        </div>

        {/* Heading */}
        <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-[1.08] tracking-tight text-slate-950 sm:mt-7 sm:text-5xl lg:text-6xl">
          Empowering Communities,{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Innovating Solutions
          </span>
          <span className="mt-2 block text-2xl font-black text-slate-800 sm:text-4xl lg:text-[44px]">
            for Real-World Social Impact
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-2xl px-2 text-sm leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-7">
          Citizens report grassroots social challenges. Developers, designers, students, and NGOs collaborate in focused
          hackathon sprints to build sustainable prototypes from idea to community implementation.
        </p>

        {/* Dual Primary Call to Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/problems/new"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-7 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition duration-200 hover:from-violet-700 hover:to-purple-700 hover:shadow-violet-600/35 active:scale-95 sm:w-auto"
          >
            <PlusCircle size={18} />
            Raise a Community Problem
          </Link>

          <Link
            href="/explore"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-7 text-sm font-bold text-slate-800 shadow-sm transition duration-200 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 active:scale-95 sm:w-auto"
          >
            <Compass size={18} />
            Explore Challenges & Sprints
          </Link>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-2xl sm:mt-10"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_32px_rgba(124,58,237,0.06)] sm:flex sm:items-center sm:rounded-full">
            <label className="flex h-12 flex-1 items-center gap-3 px-3 sm:h-13 sm:px-4">
              <Search size={19} className="shrink-0 text-violet-500" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search challenges by category, location, or keywords..."
                className="min-w-0 flex-1 bg-transparent text-xs font-medium text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
              />
            </label>

            <button
              type="submit"
              className="group mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 text-xs font-bold text-white shadow transition hover:bg-violet-700 active:scale-[0.98] sm:mt-0 sm:h-11 sm:w-auto sm:rounded-full sm:text-sm"
            >
              Search
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>
        </form>

        {/* 5-Stage Workflow Quick Flow (from Presentation) */}
        <div className="mt-10 rounded-2xl border border-violet-100 bg-violet-50/60 p-4 backdrop-blur-sm sm:mt-12 sm:p-5">
          <p className="text-xs font-black uppercase tracking-wider text-violet-700">
            5-Stage Social Innovation Journey
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-left sm:grid-cols-5 sm:gap-3">
            <div className="rounded-xl bg-white p-2.5 shadow-xs">
              <span className="block text-[10px] font-black text-violet-600">STAGE 1</span>
              <p className="text-xs font-bold text-slate-800">1. Citizen Report</p>
              <p className="text-[10px] text-slate-500">Real-world issues reported</p>
            </div>

            <div className="rounded-xl bg-white p-2.5 shadow-xs">
              <span className="block text-[10px] font-black text-violet-600">STAGE 2</span>
              <p className="text-xs font-bold text-slate-800">2. Review & Vetting</p>
              <p className="text-[10px] text-slate-500">Moderators approve & scope</p>
            </div>

            <div className="rounded-xl bg-white p-2.5 shadow-xs">
              <span className="block text-[10px] font-black text-violet-600">STAGE 3</span>
              <p className="text-xs font-bold text-slate-800">3. Hackathon Sprint</p>
              <p className="text-[10px] text-slate-500">Multidisciplinary teams build</p>
            </div>

            <div className="rounded-xl bg-white p-2.5 shadow-xs">
              <span className="block text-[10px] font-black text-violet-600">STAGE 4</span>
              <p className="text-xs font-bold text-slate-800">4. Prototype Review</p>
              <p className="text-[10px] text-slate-500">Judges score viability</p>
            </div>

            <div className="col-span-2 rounded-xl bg-white p-2.5 shadow-xs sm:col-span-1">
              <span className="block text-[10px] font-black text-emerald-600">STAGE 5</span>
              <p className="text-xs font-bold text-slate-800">5. Civic Impact</p>
              <p className="text-[10px] text-slate-500">Community implementation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;