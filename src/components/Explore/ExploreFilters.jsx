"use client";

import { Search } from "lucide-react";

const categories = [
  {
    name: "All Categories",
  },
  {
    name: "Hackathon",
  },
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
  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setMode("All Modes");
  };

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white px-5 py-7 lg:block">
      <div>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-black text-slate-950">
            Filters
          </h2>

          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-bold text-[#1769c2] transition hover:text-[#125aa7]"
          >
            Clear
          </button>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          Find the right opportunity
        </p>
      </div>

      {/* Search */}
      <div className="mt-7">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
          Search
        </p>

        <label className="mt-4 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-500 transition focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search hackathons..."
            className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      {/* Category */}
      <div className="mt-9">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
          Category
        </p>

        <div className="mt-4 space-y-1.5">
          {categories.map((item) => {
            const active =
              category === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setCategory(item.name)
                }
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? "bg-[#e9f3fb] text-[#1769c2]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span>{item.name}</span>

                {active && (
                  <span className="h-2 w-2 rounded-full bg-[#1769c2]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode */}
      <div className="mt-9">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
          Mode
        </p>

        <div className="mt-4 space-y-1.5">
          {modes.map((item) => {
            const active =
              mode === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setMode(item)
                }
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? "bg-[#e9f3fb] text-[#1769c2]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span>{item}</span>

                {active && (
                  <span className="h-2 w-2 rounded-full bg-[#1769c2]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-10 rounded-2xl border border-[#d9effb] bg-[#f4fbff] p-4">
        <p className="text-xs font-black text-[#1769c2]">
          Quick tip
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Search by hackathon name, description or location.
        </p>
      </div>
    </aside>
  );
};

export default ExploreFilters;