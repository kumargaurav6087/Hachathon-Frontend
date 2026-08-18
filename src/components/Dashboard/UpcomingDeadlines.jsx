import {
  CalendarClock,
  CircleAlert,
  Clock3,
  FileUp,
} from "lucide-react";

const UpcomingDeadlines = ({ deadlines = [] }) => {
  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <CalendarClock size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-red-500">
              Important dates
            </p>

            <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
              Upcoming deadlines
            </h2>

            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              Stay ahead of important dates
            </p>
          </div>
        </div>
      </div>

      {/* Deadlines */}
      {deadlines.length > 0 ? (
        <div className="divide-y divide-slate-100 px-5 sm:px-6">
          {deadlines.map((deadline, index) => {
            const deadlineDate = deadline.date
              ? new Date(deadline.date)
              : null;

            const validDate =
              deadlineDate &&
              !Number.isNaN(deadlineDate.getTime());

            const formattedDate = validDate
              ? deadlineDate.toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )
              : "No date";

            const formattedTime = validDate
              ? deadlineDate.toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "";

            return (
              <article
                key={
                  deadline.id ||
                  deadline._id ||
                  index
                }
                className="group py-5"
              >
                <div className="flex gap-3.5 sm:gap-4">
                  {/* Icon */}
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-transform
                      duration-200
                      sm:group-hover:scale-105

                      ${
                        deadline.urgent
                          ? "bg-red-50 text-red-600"
                          : "bg-blue-50 text-[#1769c2]"
                      }
                    `}
                  >
                    <FileUp size={18} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="break-words text-sm font-black leading-5 text-slate-900">
                        {deadline.title ||
                          "Submission deadline"}
                      </h3>

                      <span
                        className={`
                          w-fit
                          shrink-0
                          rounded-full
                          px-2.5
                          py-1
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.07em]
                          sm:text-[10px]

                          ${
                            deadline.urgent
                              ? "bg-red-50 text-red-600"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >
                        {deadline.remaining ||
                          "Upcoming"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs font-medium text-slate-400">
                      {deadline.event ||
                        "Hackathon"}
                    </p>

                    {/* Date + time */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-600 sm:text-xs">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock
                          size={13}
                          className="text-slate-400"
                        />

                        {formattedDate}
                      </span>

                      {formattedTime && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-slate-300" />

                          <span className="inline-flex items-center gap-1.5">
                            <Clock3
                              size={13}
                              className="text-slate-400"
                            />

                            {formattedTime}
                          </span>
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
        /* Empty state */
        <div className="px-5 py-10 text-center sm:px-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <CalendarClock size={20} />
          </div>

          <h3 className="mt-4 text-base font-black text-slate-900">
            No upcoming deadlines
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Tumhare registered hackathons ke
            future deadlines yahan dikhenge.
          </p>
        </div>
      )}

      {/* Notice */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="flex items-start gap-3 rounded-[20px] border border-amber-100 bg-amber-50/80 p-4 text-amber-800">
          <CircleAlert
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="text-xs font-black">
              Submission tip
            </p>

            <p className="mt-1 text-xs font-semibold leading-5">
              Complete submissions at least one
              hour before the deadline to avoid
              last-minute issues.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDeadlines;