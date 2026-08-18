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

const UpcomingCard = ({
  hackathon,
}) => {
  const registered =
    Number(
      hackathon.registered
    ) || 0;

  const maxTeams =
    Number(
      hackathon.maxTeams
    ) || 0;

  const progress =
    maxTeams > 0
      ? Math.min(
          (registered /
            maxTeams) *
            100,
          100
        )
      : 0;

  return (
    <article className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 active:scale-[0.995] sm:p-6 lg:p-7 lg:hover:-translate-y-1 lg:hover:border-blue-200 lg:hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* MAIN CONTENT */}

        <div className="min-w-0 flex-1">
          {/* BADGES */}

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.09em] text-[#1769c2] sm:text-[10px]">
              <Zap
                size={12}
                fill="currentColor"
              />

              Upcoming
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.07em] sm:text-[10px] ${getStatusStyle(
                hackathon.status
              )}`}
            >
              {
                hackathon.status
              }
            </span>
          </div>

          {/* TITLE */}

          <h2 className="mt-4 break-words text-xl font-black leading-7 tracking-[-0.025em] text-slate-950 transition-colors group-hover:text-[#1769c2] sm:text-2xl">
            {hackathon.title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {
              hackathon.subtitle
            }
          </p>

          {/* META */}

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetaItem
              icon={CalendarDays}
              label="Date"
              value={
                hackathon.date
              }
            />

            <MetaItem
              icon={Globe2}
              label="Mode"
              value={
                hackathon.mode
              }
            />

            <MetaItem
              icon={Users}
              label="Expected"
              value={
                hackathon.expected
              }
            />

            <MetaItem
              icon={Trophy}
              label="Organizer"
              value={
                hackathon.organizer
              }
            />
          </div>

          {/* SKILLS */}

          {hackathon.skills?.length >
            0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {hackathon.skills
                .slice(0, 4)
                .map(
                  (skill) => (
                    <span
                      key={
                        skill
                      }
                      className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-bold text-slate-600 sm:text-xs"
                    >
                      {
                        skill
                      }
                    </span>
                  )
                )}
            </div>
          )}
        </div>

        {/* PRIZE */}

        <div className="shrink-0 rounded-[20px] border border-blue-100 bg-blue-50/70 px-4 py-4 lg:min-w-[170px] lg:text-right">
          <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 sm:text-[10px]">
            Prize Pool
          </p>

          <p className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#1769c2]">
            {
              hackathon.prize
            }
          </p>
        </div>
      </div>

      {/* REGISTRATION PROGRESS */}

      <div className="mt-6 rounded-[18px] border border-slate-100 bg-slate-50/70 p-4">
        <div className="flex items-center justify-between gap-4 text-[10px] font-semibold text-slate-500 sm:text-xs">
          <span>
            {registered.toLocaleString(
              "en-IN"
            )}{" "}
            registered
          </span>

          <span>
            {maxTeams.toLocaleString(
              "en-IN"
            )}{" "}
            max teams
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1769c2] to-[#24a6c7] transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mt-2 text-[10px] font-semibold text-slate-400">
          {Math.round(progress)}%
          registration capacity
          filled
        </p>
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
          <span className="h-2 w-2 rounded-full bg-red-500" />

          {
            hackathon.daysLeft
          }
        </span>

        <Link
          href={`/upcoming/${hackathon.id}`}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-5 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.97] hover:bg-[#125aa7] sm:w-auto"
        >
          View Event

          <ArrowRight
            size={16}
          />
        </Link>
      </div>
    </article>
  );
};

// ========================================
// META ITEM
// ========================================

const MetaItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-[16px] bg-slate-50/80 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1769c2] shadow-sm">
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
          {label}
        </p>

        <p
          className="mt-1 break-words text-xs font-bold leading-5 text-slate-800"
          title={value}
        >
          {value || "-"}
        </p>
      </div>
    </div>
  );
};

// ========================================
// STATUS
// ========================================

const getStatusStyle = (
  status
) => {
  const normalized =
    status
      ?.toLowerCase()
      .trim();

  if (
    normalized ===
    "registrations open"
  ) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (
    normalized ===
    "opens soon"
  ) {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-slate-100 text-slate-600";
};

export default UpcomingCard;