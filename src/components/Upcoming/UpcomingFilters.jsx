"use client";

import { Filter } from "lucide-react";

const modes = [
  "All",
  "Online",
  "Offline",
  "Hybrid",
];

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
    <section className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:p-5">
      {/* HEADER */}

      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2]">
          <Filter size={16} />
        </div>

        <div>
          <p className="text-sm font-black text-slate-900">
            Filters
          </p>

          <p className="text-[11px] text-slate-400">
            Refine upcoming events
          </p>
        </div>
      </div>

      {/* MODE */}

      <FilterGroup
        label="Mode"
        options={modes}
        value={mode}
        onChange={setMode}
      />

      {/* CATEGORY */}

      <FilterGroup
        label="Category"
        options={categories}
        value={category}
        onChange={setCategory}
      />
    </section>
  );
};

const FilterGroup = ({
  label,
  options,
  value,
  onChange,
}) => {
  return (
    <div className="mt-5">
      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
        {label}
      </p>

      <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1">
        {options.map(
          (item) => {
            const active =
              value === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onChange(item)
                }
                className={`
                  shrink-0
                  rounded-xl
                  border
                  px-3.5
                  py-2.5
                  text-[11px]
                  font-bold
                  transition-all
                  active:scale-95
                  sm:px-4
                  sm:text-xs

                  ${
                    active
                      ? "border-[#1769c2] bg-[#1769c2] text-white shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
                  }
                `}
              >
                {item}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default UpcomingFilters;