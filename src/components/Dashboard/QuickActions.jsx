import Link from "next/link";

import {
  ArrowUpRight,
  FileUp,
  Search,
  Settings,
  UserPlus,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Explore hackathons",
    description: "Find a new challenge",
    href: "/explore",
    icon: Search,
    iconBox: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    title: "Manage team",
    description: "Invite or manage members",
    href: "/teams",
    icon: UserPlus,
    iconBox: "bg-violet-50 text-violet-700",
  },
  {
    id: 3,
    title: "Submit project",
    description: "Complete your submission",
    href: "/submit",
    icon: FileUp,
    iconBox: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 4,
    title: "Account settings",
    description: "Update your preferences",
    href: "/settings",
    icon: Settings,
    iconBox: "bg-slate-100 text-slate-700",
  },
];

const QuickActions = () => {
  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.05)] sm:p-6">
      {/* Header */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1769c2]">
          Shortcuts
        </p>

        <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
          Quick actions
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          Common workspace actions
        </p>
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.id}
              href={action.href}
              className="
                group
                relative
                flex
                min-w-0
                flex-col
                items-start
                gap-3
                overflow-hidden
                rounded-[20px]
                border
                border-slate-200
                bg-white
                p-4
                transition-all
                duration-200

                active:scale-[0.97]

                hover:border-blue-200
                hover:bg-blue-50/40
                hover:shadow-sm

                sm:min-h-[125px]

                xl:min-h-0
                xl:flex-row
                xl:items-center
                xl:gap-4
              "
            >
              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-100/0 blur-2xl transition group-hover:bg-blue-100/60" />

              {/* Icon */}
              <div
                className={`
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  transition-transform
                  duration-200

                  group-hover:scale-105

                  sm:h-11
                  sm:w-11

                  ${action.iconBox}
                `}
              >
                <Icon size={19} />
              </div>

              {/* Content */}
              <div className="relative min-w-0 flex-1">
                <h3 className="text-[13px] font-black leading-5 text-slate-900 sm:text-sm">
                  {action.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-400 sm:text-xs">
                  {action.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="relative mt-auto flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-300 transition-all group-hover:bg-[#1769c2] group-hover:text-white xl:mt-0">
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;