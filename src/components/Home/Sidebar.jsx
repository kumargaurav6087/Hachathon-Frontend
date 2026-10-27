"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  CalendarDays,
  Code2,
  FileText,
  Flame,
  HelpCircle,
  Home,
  Info,
  Medal,
  PlusCircle,
  Search,
  Settings,
  ShieldCheck,
  Trophy,
  Upload,
  Users,
} from "lucide-react";

const sidebarItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Search,
    label: "Challenges",
    href: "/explore",
  },
  {
    icon: PlusCircle,
    label: "Raise Problem",
    href: "/problems/new",
  },
  {
    icon: Code2,
    label: "Hackathons",
    href: "/explore?tab=hackathons",
  },
  {
    icon: Users,
    label: "Teams",
    href: "/teams",
  },
  {
    icon: Upload,
    label: "Submissions",
    href: "/submit",
  },
  {
    icon: BarChart3,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Medal,
    label: "Certificates",
    href: "/certificates",
  },
  {
    icon: ShieldCheck,
    label: "Moderation",
    href: "/admin/moderation",
  },
  {
    icon: Info,
    label: "About Project",
    href: "/about",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isItemActive = (item) => {
    if (item.href === "/") {
      return pathname === "/";
    }

    if (item.label === "Challenges") {
      return pathname === "/explore";
    }

    if (item.label === "Hackathons") {
      return pathname.startsWith("/events") || pathname === "/explore?tab=hackathons";
    }

    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <aside className="fixed bottom-0 left-0 top-[70px] z-50 hidden w-19 border-r border-violet-100 bg-white/95 shadow-[4px_0_24px_rgba(124,58,237,0.03)] backdrop-blur-md md:flex md:flex-col md:items-center sm:top-20">
      <nav className="flex w-full flex-1 flex-col items-center gap-1.5 overflow-y-auto px-2 py-4 scrollbar-none">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-2 active:scale-90 ${
                active
                  ? "bg-gradient-to-tr from-violet-600 to-purple-600 text-white shadow-[0_6px_18px_rgba(124,58,237,0.3)]"
                  : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
              }`}
            >
              {/* Active left indicator */}
              {active && (
                <span className="absolute -left-[9px] top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-violet-600" />
              )}

              {/* Icon */}
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 2}
                className={`transition-all duration-200 ${
                  active ? "scale-105" : "group-hover:scale-110"
                }`}
              />

              {/* Small active dot */}
              {active && (
                <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-white" />
              )}

              {/* Tooltip */}
              <span className="pointer-events-none absolute left-[56px] top-1/2 z-[100] -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white opacity-0 shadow-xl transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                {item.label}
                <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-slate-900" />
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;