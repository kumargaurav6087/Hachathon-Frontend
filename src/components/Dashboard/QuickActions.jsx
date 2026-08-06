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
    description: "Invite or remove members",
    href: "/teams",
    icon: UserPlus,
    iconBox: "bg-violet-50 text-violet-700",
  },
  {
    id: 3,
    title: "Submit project",
    description: "Complete submission",
    href: "/submit",
    icon: FileUp,
    iconBox: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 4,
    title: "Account settings",
    description: "Update preferences",
    href: "/settings",
    icon: Settings,
    iconBox: "bg-slate-100 text-slate-700",
  },
];

const QuickActions = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-black tracking-tight text-slate-950">
          Quick actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Common workspace actions
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.id}
              href={action.href}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconBox}`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {action.title}
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="text-slate-300 transition group-hover:text-blue-700"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;