"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

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
  Trophy,
  Upload,
} from "lucide-react";

const sidebarItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Trophy,
    label: "Competitions",
    href: "/explore",
  },
  {
    icon: Code2,
    label: "Hackathons",
    href: "/explore?category=Hackathon",
  },
  {
    icon: CalendarDays,
    label: "Events",
    href: "/upcoming",
  },
  {
    icon: Upload,
    label: "Submissions",
    href: "/submit",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: Medal,
    label: "Certificates",
    href: "/certificates",
  },
  {
    icon: Flame,
    label: "Trending",
    href: "/trending",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: FileText,
    label: "Reports",
    href: "/reports",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    href: "/security",
  },
  {
    icon: HeartHandshake,
    label: "Support",
    href: "/support",
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/help",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");

  const isItemActive = (item) => {
    /*
      HOME
    */
    if (item.href === "/") {
      return pathname === "/";
    }

    /*
      HACKATHON FILTER
      /explore?category=Hackathon
    */
    if (item.label === "Hackathons") {
      return (
        pathname === "/explore" &&
        currentCategory?.toLowerCase() === "hackathon"
      );
    }

    /*
      COMPETITIONS
      Active only when /explore doesn't have Hackathon filter
    */
    if (item.label === "Competitions") {
      return (
        pathname === "/explore" &&
        currentCategory?.toLowerCase() !== "hackathon"
      );
    }

    /*
      ALL OTHER ROUTES
    */
    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`)
    );
  };

  return (
    <aside
      className="
        fixed
        bottom-0
        left-0
        top-19
        z-50
        hidden
        w-19
        border-r
        border-slate-200/80
        bg-white
        shadow-[4px_0_20px_rgba(15,23,42,0.025)]

        md:flex
        md:flex-col
        md:items-center
      "
    >
      <nav
        className="
          flex
          w-full
          flex-1
          flex-col
          items-center
          gap-1.5
          overflow-y-auto
          px-2
          py-4
        "
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={`
                group
                relative
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                outline-none
                transition-all
                duration-200

                focus-visible:ring-2
                focus-visible:ring-[#1769c2]/40
                focus-visible:ring-offset-2

                active:scale-90

                ${
                  active
                    ? `
                      bg-[#1769c2]
                      text-white
                      shadow-[0_7px_18px_rgba(23,105,194,0.28)]
                    `
                    : `
                      text-slate-500
                      hover:bg-blue-50
                      hover:text-[#1769c2]
                    `
                }
              `}
            >
              {/* Active left indicator */}
              {active && (
                <span
                  className="
                    absolute
                    -left-[10px]
                    top-1/2
                    h-7
                    w-1
                    -translate-y-1/2
                    rounded-r-full
                    bg-[#1769c2]
                  "
                />
              )}

              {/* Icon */}
              <Icon
                size={21}
                strokeWidth={active ? 2.5 : 2}
                className={`
                  transition-all
                  duration-200

                  ${
                    active
                      ? "scale-105"
                      : "group-hover:scale-110"
                  }
                `}
              />

              {/* Small active dot */}
              {active && (
                <span
                  className="
                    absolute
                    bottom-1
                    right-1
                    h-1.5
                    w-1.5
                    rounded-full
                    border
                    border-white
                    bg-white
                  "
                />
              )}

              {/* Tooltip */}
              <span
                className="
                  pointer-events-none
                  absolute
                  left-[58px]
                  top-1/2
                  z-[100]
                  -translate-y-1/2
                  translate-x-1
                  whitespace-nowrap
                  rounded-xl
                  bg-slate-950
                  px-3
                  py-2
                  text-xs
                  font-bold
                  text-white
                  opacity-0
                  shadow-xl
                  transition-all
                  duration-200

                  group-hover:translate-x-0
                  group-hover:opacity-100
                "
              >
                {item.label}

                {/* Tooltip arrow */}
                <span
                  className="
                    absolute
                    -left-1
                    top-1/2
                    h-2
                    w-2
                    -translate-y-1/2
                    rotate-45
                    bg-slate-950
                  "
                />
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;