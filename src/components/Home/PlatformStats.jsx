import {
  BriefcaseBusiness,
  Building2,
  Trophy,
  Users,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "850K+",
    label: "Active Users",
  },
  {
    icon: Trophy,
    value: "12+",
    label: "Competitions",
  },
  {
    icon: Building2,
    value: "500+",
    label: "Hiring Partners",
  },
  {
    icon: BriefcaseBusiness,
    value: "12+",
    label: "Opportunities",
  },
];

const PlatformStats = () => {
  return (
    <section className="pb-10 sm:pb-14 lg:pb-16">
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200/80
          bg-gradient-to-br
          from-[#f8fbff]
          via-white
          to-[#f5fbff]
          px-4
          py-8
          shadow-[0_15px_50px_rgba(15,23,42,0.06)]

          sm:px-6
          sm:py-10

          lg:px-10
          lg:py-12
        "
      >
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1769c2] sm:text-sm">
            HackOn Community
          </p>

          <h2 className="mt-3 text-[30px] font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[42px]">
            The Platform for Winners
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Join a growing community of builders, problem solvers and future
            leaders discovering their next big opportunity.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group
                  flex
                  min-h-[150px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[22px]
                  border
                  border-slate-200/70
                  bg-white
                  p-4
                  text-center
                  shadow-[0_6px_20px_rgba(15,23,42,0.04)]
                  transition
                  duration-300

                  active:scale-[0.98]

                  sm:min-h-[165px]
                  sm:p-6

                  lg:hover:-translate-y-1
                  lg:hover:border-blue-200
                  lg:hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]
                "
              >
                {/* Icon */}
                <span
                  className="
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-50
                    text-[#1769c2]
                    transition
                    duration-300

                    sm:h-12
                    sm:w-12

                    lg:group-hover:scale-105
                    lg:group-hover:bg-[#1769c2]
                    lg:group-hover:text-white
                  "
                >
                  <Icon size={21} strokeWidth={2} />
                </span>

                {/* Value */}
                <strong className="text-[27px] font-black tracking-[-0.045em] text-slate-950 sm:text-3xl">
                  {stat.value}
                </strong>

                {/* Label */}
                <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-xs">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;