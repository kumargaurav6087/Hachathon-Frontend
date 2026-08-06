import {
  CheckCircle2,
  Clock3,
  FileText,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Project repository added",
    description:
      "GitHub repository was connected to AI Health Project.",
    time: "12 minutes ago",
    icon: CheckCircle2,
    iconBox: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 2,
    title: "New member joined",
    description:
      "Aditya joined your team as a frontend developer.",
    time: "2 hours ago",
    icon: UserPlus,
    iconBox: "bg-blue-50 text-blue-600",
  },
  {
    id: 3,
    title: "Submission draft updated",
    description:
      "Project presentation and demo link were updated.",
    time: "Yesterday",
    icon: FileText,
    iconBox: "bg-violet-50 text-violet-600",
  },
  {
    id: 4,
    title: "Mentor session scheduled",
    description:
      "Mentor review has been scheduled for 30 July.",
    time: "2 days ago",
    icon: Clock3,
    iconBox: "bg-amber-50 text-amber-600",
  },
];

const RecentActivity = () => {
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

      <div className="px-6 py-2 sm:px-7">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          const isLast = index === activities.length - 1;

          return (
            <article
              key={activity.id}
              className="relative flex gap-4 py-5"
            >
              {!isLast && (
                <div className="absolute left-5 top-14 h-[calc(100%-28px)] w-px bg-slate-200" />
              )}

              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.iconBox}`}
              >
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {activity.title}
                  </h3>

                  <span className="shrink-0 text-xs font-medium text-slate-400">
                    {activity.time}
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
    </section>
  );
};

export default RecentActivity;