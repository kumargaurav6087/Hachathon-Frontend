import {
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";

const RecentActivity = ({ activities = [] }) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
        <h2 className="text-lg font-black tracking-tight text-slate-950">
          Recent activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest updates from your workspace
        </p>
      </div>

      {activities.length > 0 ? (
        <div className="px-6 py-2 sm:px-7">
          {activities.map((activity, index) => {
            const isLast =
              index === activities.length - 1;

            const {
              icon: Icon,
              iconBox,
            } = getActivityStyle(
              activity.status
            );

            return (
              <article
                key={activity.id}
                className="relative flex gap-4 py-5"
              >
                {!isLast && (
                  <div className="absolute left-5 top-14 h-[calc(100%-28px)] w-px bg-slate-200" />
                )}

                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBox}`}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      {activity.title}
                    </h3>

                    <span className="shrink-0 text-xs font-medium text-slate-400">
                      {formatActivityTime(
                        activity.time
                      )}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {activity.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="px-6 py-12 text-center sm:px-7">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <Clock3 size={20} />
          </div>

          <h3 className="mt-4 text-sm font-black text-slate-900">
            No recent activity
          </h3>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Tumhare submissions aur project updates
            yahan show honge.
          </p>
        </div>
      )}
    </section>
  );
};

const getActivityStyle = (status) => {
  switch (status) {
    case "approved":
      return {
        icon: CheckCircle2,
        iconBox:
          "bg-emerald-50 text-emerald-600",
      };

    case "rejected":
      return {
        icon: XCircle,
        iconBox:
          "bg-red-50 text-red-600",
      };

    case "under-review":
      return {
        icon: Clock3,
        iconBox:
          "bg-amber-50 text-amber-600",
      };

    case "submitted":
      return {
        icon: FileText,
        iconBox:
          "bg-blue-50 text-blue-600",
      };

    default:
      return {
        icon: FileText,
        iconBox:
          "bg-slate-100 text-slate-600",
      };
  }
};

const formatActivityTime = (date) => {
  if (!date) {
    return "";
  }

  const activityDate = new Date(date);

  const now = new Date();

  const difference =
    now.getTime() -
    activityDate.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  const hours = Math.floor(
    difference / (1000 * 60 * 60)
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