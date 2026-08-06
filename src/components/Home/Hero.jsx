"use client";

import { Search, Zap } from "lucide-react";
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
    <section className="flex min-h-[610px] items-center justify-center py-20 text-center">
      <div className="mx-auto max-w-[920px]">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-[#e9f3fb] px-4 py-2 text-sm font-semibold text-[#1769c2]">
          <Zap size={16} fill="currentColor" />
          Over 1,000+ new opportunities added this week
        </div>

        <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[76px]">
          Unlock Your{" "}
          <span className="bg-gradient-to-r from-[#225fbd] to-[#18a7cf] bg-clip-text text-transparent">
            Career
          </span>

          <span className="mt-2 block bg-gradient-to-r from-[#2188d1] to-[#22b9c7] bg-clip-text text-transparent">
            Potential
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-[770px] text-base leading-7 text-slate-500 sm:text-lg">
          Discover hackathons, coding competitions, case study challenges, and
          internships. Compete, learn, and get hired by top companies.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-9 flex max-w-[670px] flex-col items-stretch gap-3 sm:flex-row sm:items-center"
        >
          <label className="flex h-14 flex-1 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 shadow-sm transition focus-within:border-[#1769c2] focus-within:ring-4 focus-within:ring-[#1769c2]/10">
            <Search size={20} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for hackathons, companies, or skills..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="submit"
            className="h-14 rounded-full bg-[#1685ca] px-9 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0f73b3] hover:shadow-lg"
          >
            Explore Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;