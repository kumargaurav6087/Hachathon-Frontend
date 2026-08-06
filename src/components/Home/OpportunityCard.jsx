"use client";

import Link from "next/link";
import {
  Bookmark,
  CalendarDays,
  IndianRupee,
  Users,
} from "lucide-react";

const OpportunityCard = ({
  href,
  company,
  title,
  mode,
  featured,
  image,
  skills,
  deadline,
  participants,
  prize,
}) => {
  const handleBookmark = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log(`${title} saved`);
  };

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl"
    >
      <div
        className="relative h-[180px] overflow-hidden bg-slate-100 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(10, 25, 45, 0.06),
            rgba(10, 25, 45, 0.34)
          ), url("${image}")`,
        }}
      >
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium capitalize text-slate-700 backdrop-blur">
            {mode}
          </span>

          {featured && (
            <span className="rounded-full bg-[#e98432] px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleBookmark}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 backdrop-blur transition hover:bg-white hover:text-[#1769c2]"
          aria-label={`Save ${title}`}
        >
          <Bookmark size={17} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#1769c2]">
          {company}
        </p>

        <h3 className="mt-2 line-clamp-2 min-h-12 text-lg font-bold leading-6 text-slate-950 transition group-hover:text-[#1769c2]">
          {title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={16} />
            {deadline}
          </span>

          <span className="flex items-center gap-1.5">
            <Users size={16} />
            {participants}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-lg font-extrabold text-slate-950">
          {!prize.startsWith("$") && <IndianRupee size={17} />}

          <span>{prize.replace("₹", "")}</span>
        </div>
      </div>
    </Link>
  );
};

export default OpportunityCard;