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
      iconBox:
        "bg-blue-50 text-blue-700",
    },
    {
      title: "Active projects",
      value: stats?.activeProjects ?? 0,
      change: "In progress",
      icon: CheckCircle2,
      iconBox:
        "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Team members",
      value: stats?.teamMembers ?? 0,
      change: "Across your teams",
      icon: Users,
      iconBox:
        "bg-violet-50 text-violet-700",
    },
    {
      title: "Total points",
      value: stats?.totalPoints ?? 0,
      change: "Submission score",
      icon: Award,
      iconBox:
        "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="
              group
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-slate-200/80
              bg-white
              p-4
              shadow-[0_6px_22px_rgba(15,23,42,0.045)]
              transition-all
              duration-300

              active:scale-[0.98]

              sm:rounded-[24px]
              sm:p-5

              xl:hover:-translate-y-1
              xl:hover:border-blue-200
              xl:hover:shadow-[0_15px_35px_rgba(15,23,42,0.09)]
            "
          >
            {/* Decorative glow */}
            <div
              className={`
                pointer-events-none
                absolute
                -right-8
                -top-8
                h-20
                w-20
                rounded-full
                opacity-40
                blur-2xl
                ${stat.iconBox}
              `}
            />

            {/* Top */}
            <div className="relative flex items-start justify-between gap-2">
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
                  duration-300

                  sm:h-11
                  sm:w-11

                  xl:group-hover:scale-105

                  ${stat.iconBox}
                `}
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                />
              </div>

              <span className="hidden rounded-full bg-slate-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 sm:block">
                Overview
              </span>
            </div>

            {/* Value */}
            <h2 className="relative mt-5 text-[28px] font-black leading-none tracking-[-0.045em] text-slate-950 sm:text-3xl">
              {stat.value}
            </h2>

            {/* Title */}
            <p className="relative mt-2 text-[12px] font-bold leading-5 text-slate-700 sm:text-sm">
              {stat.title}
            </p>

            {/* Extra text */}
            <p className="relative mt-1 hidden text-xs font-medium text-slate-400 sm:block">
              {stat.change}
            </p>
          </article>
        );
      })}
    </section>
  );
};

export default DashboardStats;