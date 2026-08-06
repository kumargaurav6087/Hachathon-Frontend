"use client";

import { Search } from "lucide-react";

const categories = [
  { name: "All Categories", count: null },
  { name: "Hackathon", count: 3 },
  { name: "Competition", count: 5 },
  { name: "Internship", count: 2 },
  { name: "Course", count: 1 },
  { name: "Mentorship", count: 1 },
];

const modes = ["All Modes", "Online", "Offline", "Hybrid"];

const ExploreFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  mode,
  setMode,
}) => {
  return (
    <aside className="sticky top-[76px] hidden h-[calc(100vh-76px)] w-[285px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white px-6 py-7 lg:block">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
          Search
        </p>

        <label className="mt-4 flex h-11 items-center gap-3 rounded-xl bg-slate-50 px-4 text-slate-500">
          <Search size={18} />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search opportunities..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      <div className="mt-9">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
          Category
        </p>

        <div className="mt-4 space-y-1.5">
          {categories.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setCategory(item.name)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                category === item.name
                  ? "bg-[#e9f3fb] text-[#1769c2]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span>{item.name}</span>

              {item.count !== null && (
                <span className="text-xs">{item.count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-700">
          Mode
        </p>

        <div className="mt-4 space-y-1.5">
          {modes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                mode === item
                  ? "bg-[#e9f3fb] text-[#1769c2]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ExploreFilters;