import {
  Award,
  CheckCircle2,
  Trophy,
  Users,
} from "lucide-react";

const DashboardStats = ({ stats }) => {
  const dashboardStats = [
    {
      title: "Hackathons joined",
      value: stats?.hackathonsJoined ?? 0,
      change: "Registered events",
      icon: Trophy,
      iconBox: "bg-blue-50 text-blue-700",
    },
    {
      title: "Active projects",
      value: stats?.activeProjects ?? 0,
      change: "In progress",
      icon: CheckCircle2,
      iconBox: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Team members",
      value: stats?.teamMembers ?? 0,
      change: "Across your teams",
      icon: Users,
      iconBox: "bg-violet-50 text-violet-700",
    },
    {
      title: "Total points",
      value: stats?.totalPoints ?? 0,
      change: "Submission score",
      icon: Award,
      iconBox: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBox}`}
              >
                <Icon size={20} />
              </div>

              <span className="rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Overview
              </span>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">
              {stat.title}
            </p>

            <div className="mt-2 flex items-end justify-between gap-3">
              <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950">
                {stat.value}
              </h2>

              <p className="mb-1 text-xs font-semibold text-slate-400">
                {stat.change}
              </p>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default DashboardStats;