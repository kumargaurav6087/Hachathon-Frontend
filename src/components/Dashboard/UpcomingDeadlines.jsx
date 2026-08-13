import {
  CalendarClock,
  CircleAlert,
  FileUp,
} from "lucide-react";

const UpcomingDeadlines = ({ deadlines = [] }) => {
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

      {deadlines.length > 0 ? (
        <div className="divide-y divide-slate-100 px-6">
          {deadlines.map((deadline) => {
            const formattedDate = deadline.date
              ? new Date(deadline.date).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "No date";

            const formattedTime = deadline.date
              ? new Date(deadline.date).toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "";

            return (
              <article
                key={deadline.id}
                className="py-5"
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      deadline.urgent
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <FileUp size={18} />
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
                      <span>{formattedDate}</span>

                      {formattedTime && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />
                          <span>{formattedTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="px-6 py-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <CalendarClock size={20} />
          </div>

          <h3 className="mt-4 text-sm font-black text-slate-900">
            No upcoming deadlines
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Tumhare registered hackathons ke future deadlines yahan
            dikhenge.
          </p>
        </div>
      )}

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