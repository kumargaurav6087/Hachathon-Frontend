import {
  BriefcaseBusiness,
  Building2,
  Trophy,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "850.0k+",
    label: "Active Users",
  },
  {
    icon: Trophy,
    value: "12",
    label: "Competitions",
  },
  {
    icon: Building2,
    value: "500",
    label: "Hiring Partners",
  },
  {
    icon: BriefcaseBusiness,
    value: "12",
    label: "Opportunities",
  },
];

const PlatformStats = () => {
  return (
    <section className="pb-16 pt-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-4xl">
          The Platform for Winners
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500 sm:text-lg">
          Join a thriving community of builders, problem solvers, and future
          leaders.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`flex min-h-[175px] flex-col items-center justify-center p-7 text-center transition hover:bg-slate-50 ${
                index !== stats.length - 1
                  ? "border-b border-slate-200 sm:border-r lg:border-b-0"
                  : ""
              }`}
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eaf3fb] text-[#1769c2]">
                <Icon size={23} />
              </span>

              <strong className="text-3xl font-black tracking-[-0.04em] text-slate-950">
                {stat.value}
              </strong>

              <span className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PlatformStats;