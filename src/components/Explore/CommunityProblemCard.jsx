"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Heart,
  Lightbulb,
  MapPin,
  Rocket,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

const statusColorMap = {
  submitted: "bg-amber-50 text-amber-800 border-amber-200",
  "under-review": "bg-blue-50 text-blue-800 border-blue-200",
  approved: "bg-emerald-50 text-emerald-800 border-emerald-200",
  prototype: "bg-purple-50 text-purple-800 border-purple-200",
  implemented: "bg-violet-50 text-violet-800 border-violet-200",
  rejected: "bg-rose-50 text-rose-800 border-rose-200",
};

const CommunityProblemCard = ({ problem }) => {
  const upvoteCount = problem.upvotes?.length || 0;
  const statusClass =
    statusColorMap[problem.status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-xl sm:p-6">
      <div>
        {/* Category & Status Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-black text-violet-700">
            {problem.category}
          </span>

          <div className="flex items-center gap-1.5">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize ${statusClass}`}
            >
              {problem.status || "Submitted"}
            </span>

            <span className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
              <Heart size={12} fill="currentColor" />
              {upvoteCount}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-black leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-violet-700">
          <Link href={`/problems/${problem._id || problem.id}`}>
            {problem.title}
          </Link>
        </h3>

        {/* Description snippet */}
        <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
          {problem.description}
        </p>

        {/* Meta badges */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin size={13} className="shrink-0 text-violet-600" />
            <span className="truncate">{problem.location || "Community Wide"}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <Users size={13} className="shrink-0 text-violet-600" />
            <span className="truncate">{problem.impactArea || "Local Citizens"}</span>
          </div>
        </div>

        {/* Reporter info */}
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>By: {problem.createdBy?.name || "Community Member"}</span>
          <span className="capitalize font-medium text-slate-500">
            {problem.difficulty || "medium"} difficulty
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
        <Link
          href={`/problems/${problem._id || problem.id}`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 active:scale-95"
        >
          View Details
          <ArrowUpRight size={14} />
        </Link>

        <Link
          href={`/submit?problemId=${problem._id || problem.id}${
            problem.hackathon ? `&hackathonId=${problem.hackathon._id || problem.hackathon}` : ""
          }`}
          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-violet-600 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700 active:scale-95"
        >
          <Rocket size={14} />
          Solve This
        </Link>
      </div>
    </article>
  );
};

export default CommunityProblemCard;
