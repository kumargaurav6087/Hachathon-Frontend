import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  Users,
} from "lucide-react";

const ActiveHackathons = ({ hackathons = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:px-7">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-950">
            Active hackathons
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your ongoing and registered events
          </p>
        </div>

        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
        >
          Explore more
          <ArrowUpRight size={17} />
        </Link>
      </div>

      {hackathons.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {hackathons.map((hackathon) => (
            <HackathonRow
              key={hackathon.id}
              hackathon={hackathon}
            />
          ))}
        </div>
      ) : (
        <div className="px-6 py-12 text-center sm:px-7">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <Code2 size={20} />
          </div>

          <h3 className="mt-4 text-base font-black text-slate-950">
            No active hackathons
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Explore hackathons and join one to see it here.
          </p>

          <Link
            href="/explore"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
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
  const deadline = hackathon.deadline
    ? new Date(hackathon.deadline).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No deadline";

  const statusClass = getStatusClass(hackathon.status);
  const statusLabel = getStatusLabel(hackathon.status);

  return (
    <article className="group px-6 py-6 transition hover:bg-slate-50/70 sm:px-7">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
              <Code2 size={21} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-950">
                  {hackathon.title}
                </h3>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${statusClass}`}
                >
                  {statusLabel}
                </span>
              </div>

              <p className="mt-1 text-xs font-bold text-blue-700">
                {hackathon.category || "Hackathon"}
              </p>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {hackathon.description}
              </p>
            </div>
          </div>

          <Link
            href={`/events/${hackathon.id}`}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            View event
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">
                Progress
              </span>

              <span className="font-black text-slate-800">
                {hackathon.progress ?? 0}%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-700 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    hackathon.progress ?? 0,
                    100
                  )}%`,
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
            label={hackathon.team || "No team"}
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
    <div className="flex min-w-38 items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
        <Icon size={16} />
      </div>

      <div>
        <p className="text-xs font-bold text-slate-700">
          {label}
        </p>

        <p className="mt-0.5 text-[11px] text-slate-400">
          {value}
        </p>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
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
  switch (status) {
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