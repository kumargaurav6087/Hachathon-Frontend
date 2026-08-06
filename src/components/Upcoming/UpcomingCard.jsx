"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Globe2,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const UpcomingCard = ({ hackathon }) => {
  const progress = Math.min(
    (hackathon.registered / hackathon.maxTeams) * 100,
    100,
  );

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1769c2]">
            <Zap size={14} fill="currentColor" />
            Featured Event
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-extrabold text-slate-950">
              {hackathon.title}
            </h2>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {hackathon.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {hackathon.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} />
              {hackathon.date}
            </span>

            <span className="flex items-center gap-1.5">
              <Globe2 size={16} />
              {hackathon.mode}
            </span>

            <span className="flex items-center gap-1.5">
              <Users size={16} />
              {hackathon.expected}
            </span>

            <span className="flex items-center gap-1.5">
              <Trophy size={16} />
              {hackathon.organizer}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {hackathon.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="min-w-[190px] lg:text-right">
          <p className="text-2xl font-black text-[#1769c2]">
            {hackathon.prize}
          </p>

          <p className="mt-1 text-xs text-slate-400">prize pool</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>{hackathon.registered} registered</span>
          <span>{hackathon.maxTeams} max teams</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1769c2] to-[#24a6c7]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-red-500">
          ◉ {hackathon.daysLeft}
        </span>

        <Link
          href={`/upcoming/${hackathon.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1685ca] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f72ad]"
        >
          Register Now
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
};

export default UpcomingCard;