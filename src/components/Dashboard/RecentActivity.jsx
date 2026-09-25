import {
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

const RecentActivity = ({ activities = [] }) => {
  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6 lg:px-7">
        <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1769c2]">
          Timeline
        </p>

        <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
          Recent activity
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          Latest updates from your workspace
        </p>
      </div>

      {activities.length > 0 ? (
        <div className="px-5 py-1 sm:px-6 lg:px-7">
          {activities.map((activity, index) => {
            const isLast =
              index === activities.length - 1;

            const {
              icon: Icon,
              iconBox,
              badgeClass,
              label,
            } = getActivityStyle(
              activity.status
            );

            return (
              <article
                key={
                  activity.id ||
                  activity._id ||
                  index
                }
                className="group relative flex gap-3.5 py-5 sm:gap-4"
              >
                {/* Timeline line */}
                {!isLast && (
                  <div className="absolute left-[19px] top-[55px] h-[calc(100%-22px)] w-px bg-slate-200 sm:left-[20px]" />
                )}

                {/* Icon */}
                <div
                  className={`
                    relative
                    z-10
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
                    ${iconBox}
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="break-words text-sm font-black leading-5 text-slate-900 sm:text-[15px]">
                          {activity.title ||
                            "Activity update"}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] ${badgeClass}`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>

                    <span className="shrink-0 text-[10px] font-semibold text-slate-400 sm:text-xs">
                      {formatActivityTime(
                        activity.time
                      )}
                    </span>
                  </div>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-500">
                    {activity.description ||
                      "Workspace activity updated."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="px-5 py-10 text-center sm:px-7 sm:py-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <Clock3 size={20} />
          </div>

          <h3 className="mt-4 text-base font-black text-slate-900">
            No recent activity
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
            Tumhare submissions aur project updates
            yahan show honge.
          </p>
        </div>
      )}
    </section>
  );
};

const getActivityStyle = (status) => {
  switch (
    status?.toLowerCase()
  ) {
    case "approved":
      return {
        icon: CheckCircle2,
        iconBox:
          "bg-emerald-50 text-emerald-600",
        badgeClass:
          "bg-emerald-50 text-emerald-700",
        label: "Approved",
      };

    case "rejected":
      return {
        icon: XCircle,
        iconBox:
          "bg-red-50 text-red-600",
        badgeClass:
          "bg-red-50 text-red-700",
        label: "Rejected",
      };

    case "under-review":
      return {
        icon: Clock3,
        iconBox:
          "bg-amber-50 text-amber-600",
        badgeClass:
          "bg-amber-50 text-amber-700",
        label: "Under review",
      };

    case "submitted":
      return {
        icon: FileText,
        iconBox:
          "bg-blue-50 text-blue-600",
        badgeClass:
          "bg-blue-50 text-blue-700",
        label: "Submitted",
      };

    default:
      return {
        icon: FileText,
        iconBox:
          "bg-slate-100 text-slate-600",
        badgeClass:
          "bg-slate-100 text-slate-600",
        label:
          status || "Update",
      };
  }
};

const formatActivityTime = (date) => {
  if (!date) {
    return "";
  }

  const activityDate = new Date(date);

  if (
    Number.isNaN(
      activityDate.getTime()
    )
  ) {
    return "";
  }

  const now = new Date();

  const difference =
    now.getTime() -
    activityDate.getTime();

  /*
    Future date aaye toh negative
    "ago" avoid karenge.
  */
  if (difference < 0) {
    return activityDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference /
      (1000 * 60 * 60)
  );

  const days = Math.floor(
    difference /
      (1000 * 60 * 60 * 24)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return activityDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

export default RecentActivity;