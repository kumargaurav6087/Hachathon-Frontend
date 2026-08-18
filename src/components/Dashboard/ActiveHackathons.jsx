import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  Users,
} from "lucide-react";

const ActiveHackathons = ({ hackathons = [] }) => {
  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:px-6 lg:px-7">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1769c2]">
            Your Events
          </p>

          <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
            Active hackathons
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            Your ongoing and registered events
          </p>
        </div>

        <Link
          href="/explore"
          className="group inline-flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2 text-xs font-bold text-[#1769c2] transition-all active:scale-95 hover:bg-[#1769c2] hover:text-white sm:text-sm"
        >
          Explore more

          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>

      {/* Content */}
      {hackathons.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {hackathons.map((hackathon, index) => (
            <HackathonRow
              key={
                hackathon.id ||
                hackathon._id ||
                index
              }
              hackathon={hackathon}
            />
          ))}
        </div>
      ) : (
        <div className="px-5 py-10 text-center sm:px-7 sm:py-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1769c2]">
            <Code2 size={20} />
          </div>

          <h3 className="mt-4 text-base font-black text-slate-950">
            No active hackathons
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Explore hackathons and join one to see it here.
          </p>

          <Link
            href="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-all active:scale-95 hover:bg-[#1769c2]"
          >
            Explore hackathons

            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </section>
  );
};

const HackathonRow = ({ hackathon }) => {
  const hackathonId =
    hackathon.id || hackathon._id;

  const deadline = hackathon.deadline
    ? new Date(
        hackathon.deadline
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No deadline";

  const statusClass =
    getStatusClass(hackathon.status);

  const statusLabel =
    getStatusLabel(hackathon.status);

  const rawProgress =
    Number(hackathon.progress) || 0;

  const progress = Math.max(
    0,
    Math.min(rawProgress, 100)
  );

  return (
    <article className="group px-5 py-5 transition-colors hover:bg-slate-50/60 sm:px-6 sm:py-6 lg:px-7">
      <div className="flex flex-col gap-5">
        {/* Top */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex min-w-0 gap-3.5 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#1769c2] sm:h-12 sm:w-12">
              <Code2 size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="min-w-0 text-base font-black leading-6 text-slate-950 sm:text-lg">
                  {hackathon.title}
                </h3>

                <span
                  className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${statusClass}`}
                >
                  {statusLabel}
                </span>
              </div>

              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2] sm:text-xs">
                {hackathon.category ||
                  "Hackathon"}
              </p>

              <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-slate-500">
                {hackathon.description ||
                  "Continue working on your registered hackathon."}
              </p>
            </div>
          </div>

          {hackathonId && (
            <Link
              href={`/events/${hackathonId}`}
              className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-all active:scale-[0.97] hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2] sm:w-auto"
            >
              View event

              <ArrowUpRight size={16} />
            </Link>
          )}
        </div>

        {/* Progress + Meta */}
        <div className="grid gap-4 rounded-[20px] border border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
          {/* Progress */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-slate-500">
                Progress
              </span>

              <span className="font-black text-slate-900">
                {progress}%
              </span>
            </div>

            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-[#1769c2] transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <HackathonMeta
            icon={CalendarDays}
            label="Deadline"
            value={deadline}
          />

          <HackathonMeta
            icon={Users}
            label={
              hackathon.team ||
              "Team"
            }
            value={
              hackathon.members
                ? `${hackathon.members} members`
                : "No members"
            }
          />
        </div>
      </div>
    </article>
  );
};

const HackathonMeta = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-black uppercase tracking-[0.08em] text-slate-500 sm:text-xs">
          {label}
        </p>

        <p
          className="mt-0.5 truncate text-[11px] font-semibold text-slate-400 sm:text-xs"
          title={value}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (
    status?.toLowerCase()
  ) {
    case "ongoing":
      return "bg-emerald-50 text-emerald-700";

    case "upcoming":
      return "bg-blue-50 text-blue-700";

    case "completed":
      return "bg-slate-100 text-slate-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getStatusLabel = (status) => {
  switch (
    status?.toLowerCase()
  ) {
    case "ongoing":
      return "In progress";

    case "upcoming":
      return "Upcoming";

    case "completed":
      return "Completed";

    default:
      return status || "Unknown";
  }
};

export default ActiveHackathons;