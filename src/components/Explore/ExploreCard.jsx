"use client";

import Link from "next/link";
import {
  Bookmark,
  CalendarDays,
  IndianRupee,
  Users,
} from "lucide-react";

const ExploreCard = ({ opportunity }) => {
  return (
    <Link
      href={`/events/${opportunity.id}`}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    >
      <div
        className="relative h-[175px] overflow-hidden bg-slate-100 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(11, 38, 64, 0.05),
            rgba(11, 38, 64, 0.3)
          ), url("${opportunity.image}")`,
        }}
      >
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur">
            {opportunity.mode.toLowerCase()}
          </span>

          {opportunity.featured && (
            <span className="rounded-full bg-[#e2733a] px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 backdrop-blur transition hover:text-[#1769c2]"
        >
          <Bookmark size={17} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1769c2]">
          {opportunity.company}
        </p>

        <h2 className="mt-2 min-h-[52px] text-lg font-extrabold leading-6 text-slate-950 group-hover:text-[#1769c2]">
          {opportunity.title}
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {opportunity.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} />
            {opportunity.deadline}
          </span>

          <span className="flex items-center gap-1.5">
            <Users size={16} />
            {opportunity.participants}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-lg font-black text-slate-950">
          {!opportunity.prize.startsWith("$") && (
            <IndianRupee size={17} />
          )}

          {opportunity.prize.replace("₹", "")}
        </div>
      </div>
    </Link>
  );
};

export default ExploreCard;