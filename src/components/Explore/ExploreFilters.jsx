"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const categories = [
  "All Categories",
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
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setMode("All Modes");
  };

  const activeFilterCount =
    (category !== "All Categories" ? 1 : 0) +
    (mode !== "All Modes" ? 1 : 0);

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

  const FilterContent = ({ mobile = false }) => (
    <>
      {/* Search */}
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Search
        </p>

        <label className="mt-3 flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-slate-500 transition focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search hackathons..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
          />
        </label>
      </div>

      {/* Category */}
      <div className="mt-7">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Category
        </p>

        <div className="mt-3 space-y-2">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setCategory(item)
                }
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-left
                  text-sm
                  font-bold
                  transition-all
                  duration-200
                  active:scale-[0.98]

                  ${
                    active
                      ? "bg-[#1769c2] text-white shadow-[0_6px_16px_rgba(23,105,194,0.20)]"
                      : "bg-white text-slate-600 hover:bg-blue-50 hover:text-[#1769c2]"
                  }
                `}
              >
                <span>{item}</span>

                <span
                  className={`
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full

                    ${
                      active
                        ? "bg-white/15"
                        : "bg-slate-100"
                    }
                  `}
                >
                  {active ? (
                    <Check size={14} />
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
      <div className="mt-7">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
          Mode
        </p>

        <div className="mt-3 space-y-2">
          {modes.map((item) => {
            const active = mode === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setMode(item)
                }
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-left
                  text-sm
                  font-bold
                  transition-all
                  duration-200
                  active:scale-[0.98]

                  ${
                    active
                      ? "bg-[#1769c2] text-white shadow-[0_6px_16px_rgba(23,105,194,0.20)]"
                      : "bg-white text-slate-600 hover:bg-blue-50 hover:text-[#1769c2]"
                  }
                `}
              >
                <span>{item}</span>

                <span
                  className={`
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full

                    ${
                      active
                        ? "bg-white/15"
                        : "bg-slate-100"
                    }
                  `}
                >
                  {active ? (
                    <Check size={14} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop tip */}
      {!mobile && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
          <p className="text-xs font-black text-[#1769c2]">
            Quick tip
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Search by hackathon name,
            description or location.
          </p>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* =========================
          MOBILE FILTER BAR
      ========================== */}
      <div className="fixed bottom-4 left-4 right-4 z-30 lg:hidden">
        <div className="flex items-center gap-2 rounded-[20px] border border-slate-200 bg-white/95 p-2 shadow-[0_12px_35px_rgba(15,23,42,0.16)] backdrop-blur-xl">
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl bg-slate-100 px-3">
            <Search
              size={17}
              className="shrink-0 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(true)
            }
            className={`
              relative
              flex
              h-11
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              px-3.5
              text-sm
              font-bold
              transition
              active:scale-95

              ${
                activeFilterCount > 0
                  ? "bg-[#1769c2] text-white"
                  : "bg-slate-950 text-white"
              }
            `}
          >
            <SlidersHorizontal size={17} />

            <span className="hidden min-[380px]:inline">
              Filters
            </span>

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-[#1769c2]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* =========================
          DESKTOP SIDEBAR
      ========================== */}
      <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-5 py-7 lg:block">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Filter
                size={18}
                className="text-[#1769c2]"
              />

              <h2 className="text-lg font-black text-slate-950">
                Filters
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Find the right opportunity
            </p>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg px-2 py-1 text-xs font-bold text-[#1769c2] transition hover:bg-blue-50 active:scale-95"
          >
            Clear
          </button>
        </div>

        <div className="mt-7">
          <FilterContent />
        </div>
      </aside>

      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      <div
        onClick={() =>
          setMobileFiltersOpen(false)
        }
        className={`
          fixed
          inset-0
          z-[70]
          bg-slate-950/45
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            mobileFiltersOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =========================
          MOBILE FILTER DRAWER
      ========================== */}
      <div
        className={`
          fixed
          bottom-0
          left-0
          right-0
          z-[80]
          max-h-[88vh]
          overflow-hidden
          rounded-t-[30px]
          bg-[#f8fafc]
          shadow-[0_-20px_60px_rgba(15,23,42,0.18)]
          transition-transform
          duration-300
          ease-out
          lg:hidden

          ${
            mobileFiltersOpen
              ? "translate-y-0"
              : "translate-y-full"
          }
        `}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <span className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 pb-4 pt-3">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={19}
                className="text-[#1769c2]"
              />

              <h2 className="text-lg font-black text-slate-950">
                Filters
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Refine your opportunities
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="max-h-[calc(88vh-160px)] overflow-y-auto px-5 py-5">
          <FilterContent mobile />
        </div>

        {/* Bottom actions */}
        <div className="flex gap-3 border-t border-slate-200 bg-white p-4">
          <button
            type="button"
            onClick={clearFilters}
            className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white text-sm font-bold text-slate-700 transition active:scale-[0.98]"
          >
            Clear All
          </button>

          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(false)
            }
            className="h-12 flex-[1.3] rounded-2xl bg-[#1769c2] text-sm font-bold text-white shadow-[0_7px_18px_rgba(23,105,194,0.25)] transition active:scale-[0.98]"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
};

export default ExploreFilters;