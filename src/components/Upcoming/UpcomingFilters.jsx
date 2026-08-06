"use client";

import { Filter } from "lucide-react";

const modes = ["All", "Online", "Offline", "Hybrid"];

const categories = [
  "All",
  "Multi-Track",
  "FinTech",
  "Healthcare",
  "Blockchain",
  "Cloud",
];

const UpcomingFilters = ({
  mode,
  setMode,
  category,
  setCategory,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <Filter size={17} />
          Mode:
        </div>

        {modes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setMode(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === item
                ? "bg-[#1769c2] text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold text-slate-700">
          Category:
        </span>

        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === item
                ? "bg-[#1769c2] text-white shadow-sm"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpcomingFilters;