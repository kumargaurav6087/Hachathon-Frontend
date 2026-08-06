"use client";

import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  Code2,
  FileText,
  Flame,
  HeartHandshake,
  HelpCircle,
  Home,
  Medal,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  Upload,
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: Trophy, label: "Competitions", href: "/explore" },
  { icon: Code2, label: "Hackathons", href: "/explore?category=Hackathon" },
  { icon: CalendarDays, label: "Events", href: "/upcoming" },
  { icon: Upload, label: "Submissions", href: "/submit" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Medal, label: "Certificates", href: "/certificates" },
  { icon: Flame, label: "Trending", href: "/trending" },
  { icon: Star, label: "Saved", href: "/saved" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: ShieldCheck, label: "Security", href: "/security" },
  { icon: HeartHandshake, label: "Support", href: "/support" },
  { icon: HelpCircle, label: "Help", href: "/help" },
];

const Sidebar = () => {
  return (
    <aside className="fixed bottom-0 left-0 top-[76px] z-50 hidden w-[76px] border-r border-slate-200 bg-white md:flex md:flex-col md:items-center">
      <nav className="flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto py-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.label}
              className={`group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                item.active
                  ? "bg-[#e9f2fc] text-[#1769c2]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#1769c2]"
              }`}
            >
              <Icon size={20} strokeWidth={2} />

              <span className="pointer-events-none absolute left-[54px] z-50 whitespace-nowrap rounded-lg bg-slate-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;