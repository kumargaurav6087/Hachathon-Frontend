"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Filter,
  PlusCircle,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { SOCIAL_INNOVATION_CATEGORIES } from "@/lib/problemApi";

const categories = [
  "All Categories",
  ...SOCIAL_INNOVATION_CATEGORIES,
  "Hackathon",
];

const modes = [
  "All Modes",
  "Online",
  "Offline",
  "Hybrid",
];

const ExploreFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  mode,
  setMode,
  status,
  setStatus,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setMode("All Modes");
    if (setStatus) setStatus("all");
  };

  const activeFilterCount =
    (category !== "All Categories" ? 1 : 0) +
    (mode !== "All Modes" ? 1 : 0) +
    (status && status !== "all" ? 1 : 0);

  useEffect(() => {
    if (!mobileFiltersOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const renderFilterContent = (mobile = false) => (
    <>
      {/* Raise a Problem CTA */}
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 p-4 text-white shadow-md">
        <p className="text-xs font-black uppercase tracking-wider text-violet-200">Community Voice</p>
        <p className="mt-1 text-sm font-bold">Have a problem in your neighborhood?</p>
        <Link
          href="/problems/new"
          className="mt-3 flex items-center justify-center gap-1.5 rounded-xl bg-white py-2 text-xs font-black text-violet-800 shadow-sm transition hover:bg-violet-50 active:scale-95"
        >
          <PlusCircle size={15} />
          Report Community Issue
        </Link>
      </div>

      {/* Search */}
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Search Challenges
        </p>

        <label className="mt-3 flex h-11 items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 text-slate-500 transition focus-within:border-violet-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-violet-50">
          <Search size={17} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by issue or location..."
            className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
          />
        </label>
      </div>

      {/* Social Innovation Categories */}
      <div className="mt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Category
        </p>

        <div className="mt-3 max-h-60 space-y-1.5 overflow-y-auto pr-1">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-3.5
                  py-2.5
                  text-left
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  active:scale-[0.98]
                  ${
                    active
                      ? "bg-violet-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-violet-50 hover:text-violet-700"
                  }
                `}
              >
                <span className="truncate">{item}</span>

                <span
                  className={`
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${active ? "bg-white/20" : "bg-slate-100"}
                  `}
                >
                  {active ? (
                    <Check size={12} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode */}
      <div className="mt-6">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Delivery Mode
        </p>

        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {modes.map((item) => {
            const active = mode === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`
                  rounded-xl
                  px-3
                  py-2
                  text-center
                  text-xs
                  font-bold
                  transition-all
                  ${
                    active
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* MOBILE FILTER BAR */}
      <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl">
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl bg-slate-100 px-3">
            <Search size={16} className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search challenges..."
              className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className={`
              flex
              h-11
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              px-3.5
              text-xs
              font-bold
              transition
              active:scale-95
              ${
                activeFilterCount > 0
                  ? "bg-violet-600 text-white"
                  : "bg-slate-900 text-white"
              }
            `}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-black text-violet-700">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-5 py-6 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={17} className="text-violet-600" />
            <h2 className="text-base font-black text-slate-900">Filter Challenges</h2>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-violet-600 hover:underline"
          >
            Reset
          </button>
        </div>

        <div className="mt-5">
          {renderFilterContent()}
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      <div
        onClick={() => setMobileFiltersOpen(false)}
        className={`fixed inset-0 z-[70] bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileFiltersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-[80] max-h-[85vh] overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-center pt-3">
          <span className="h-1.5 w-12 rounded-full bg-slate-200" />
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 px-5 pb-3 pt-2">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={17} className="text-violet-600" />
            <h2 className="text-base font-black text-slate-900">Filters</h2>
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(85vh-140px)] overflow-y-auto px-5 py-4">
          {renderFilterContent(true)}
        </div>

        <div className="flex gap-2.5 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={clearFilters}
            className="h-11 flex-1 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="h-11 flex-[1.4] rounded-xl bg-violet-600 text-xs font-bold text-white shadow-md"
          >
            Show Challenges
          </button>
        </div>
      </div>
    </>
  );
};

export default ExploreFilters;