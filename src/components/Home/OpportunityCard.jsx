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

  const isDollarPrize = prize?.startsWith("$");

  return (
    <Link
      href={href}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_8px_28px_rgba(15,23,42,0.06)]
        transition
        duration-300

        active:scale-[0.99]

        md:hover:-translate-y-1.5
        md:hover:border-slate-300
        md:hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]
      "
    >
      {/* Image */}
      <div
        className="
          relative
          h-[170px]
          overflow-hidden
          bg-slate-100
          bg-cover
          bg-center
          sm:h-[185px]
        "
        style={{
          backgroundImage: `linear-gradient(
            to bottom,
            rgba(10, 25, 45, 0.04),
            rgba(10, 25, 45, 0.38)
          ), url("${image}")`,
        }}
      >
        {/* Top badges */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
          <span
            className="
              rounded-full
              border
              border-white/60
              bg-white/90
              px-3
              py-1.5
              text-[10px]
              font-bold
              capitalize
              text-slate-700
              shadow-sm
              backdrop-blur-md
              sm:text-xs
            "
          >
            {mode}
          </span>

          {featured && (
            <span
              className="
                rounded-full
                bg-[#e98432]
                px-3
                py-1.5
                text-[10px]
                font-bold
                text-white
                shadow-sm
                sm:text-xs
              "
            >
              Featured
            </span>
          )}
        </div>

        {/* Bookmark */}
        <button
          type="button"
          onClick={handleBookmark}
          className="
            absolute
            right-3
            top-3
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/50
            bg-white/90
            text-slate-600
            shadow-sm
            backdrop-blur-md
            transition
            active:scale-95

            sm:right-4
            sm:top-4

            md:hover:bg-white
            md:hover:text-[#1769c2]
          "
          aria-label={`Save ${title}`}
        >
          <Bookmark size={17} strokeWidth={2} />
        </button>

        {/* Image bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/15 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Company */}
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#1769c2] sm:text-xs">
          {company}
        </p>

        {/* Title */}
        <h3
          className="
            mt-2
            line-clamp-2
            text-[17px]
            font-black
            leading-[1.35]
            tracking-[-0.025em]
            text-slate-950
            transition
            sm:text-lg

            md:group-hover:text-[#1769c2]
          "
        >
          {title}
        </h3>

        {/* Skills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {skills?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="
                rounded-lg
                border
                border-slate-200/70
                bg-slate-50
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-slate-600
                sm:text-[11px]
              "
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Deadline
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
              <CalendarDays
                size={15}
                className="shrink-0 text-slate-400"
              />
              <span className="truncate">{deadline}</span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Participants
            </p>

            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
              <Users
                size={15}
                className="shrink-0 text-slate-400"
              />
              <span className="truncate">{participants}</span>
            </div>
          </div>
        </div>

        {/* Prize */}
        <div className="mt-auto pt-5">
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              Prize Pool
            </p>

            <div className="mt-1 flex items-center gap-1 text-[19px] font-black tracking-[-0.025em] text-slate-950">
              {!isDollarPrize && (
                <IndianRupee
                  size={17}
                  strokeWidth={2.4}
                  className="shrink-0"
                />
              )}

              <span>{prize?.replace("₹", "")}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OpportunityCard;