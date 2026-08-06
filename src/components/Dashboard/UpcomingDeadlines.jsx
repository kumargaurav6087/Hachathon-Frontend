import {
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  FileUp,
  Presentation,
} from "lucide-react";

const deadlines = [
  {
    id: 1,
    title: "Final project submission",
    event: "FutureTech AI Hackathon",
    date: "28 July",
    time: "11:59 PM",
    remaining: "2 days",
    icon: FileUp,
    iconBox: "bg-red-50 text-red-600",
    urgent: true,
  },
  {
    id: 2,
    title: "Mentor review meeting",
    event: "FutureTech AI Hackathon",
    date: "30 July",
    time: "4:00 PM",
    remaining: "4 days",
    icon: Presentation,
    iconBox: "bg-violet-50 text-violet-600",
  },
  {
    id: 3,
    title: "Team registration closes",
    event: "India Web3 Challenge",
    date: "04 August",
    time: "9:00 PM",
    remaining: "9 days",
    icon: CheckCircle2,
    iconBox: "bg-blue-50 text-blue-600",
  },
];

const UpcomingDeadlines = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <CalendarClock size={19} />
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-950">
              Upcoming deadlines
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Stay ahead of important dates
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 px-6">
        {deadlines.map((deadline) => {
          const Icon = deadline.icon;

          return (
            <article
              key={deadline.id}
              className="py-5"
            >
              <div className="flex gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${deadline.iconBox}`}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-extrabold leading-5 text-slate-900">
                      {deadline.title}
                    </h3>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${
                        deadline.urgent
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {deadline.remaining}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-xs text-slate-400">
                    {deadline.event}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span>{deadline.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span>{deadline.time}</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-amber-800">
          <CircleAlert
            size={18}
            className="mt-0.5 shrink-0"
          />

          <p className="text-xs font-semibold leading-5">
            Complete submissions at least one hour before the deadline to
            avoid last-minute issues.
          </p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDeadlines;