"use client";

import {
  Accessibility,
  Bus,
  Droplets,
  GraduationCap,
  HeartPulse,
  Recycle,
  ShieldAlert,
  Sprout,
  TreePine,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

export const SOCIAL_INNOVATION_CATEGORIES = [
  {
    title: "Environment",
    events: "Climate & Ecosystem",
    href: "/explore?category=Environment",
    icon: TreePine,
    iconColor: "text-emerald-700",
    iconBackground: "bg-emerald-100",
    cardBackground: "bg-emerald-50/40",
  },
  {
    title: "Waste Management",
    events: "Civic Segregation & Recycling",
    href: "/explore?category=Waste Management",
    icon: Recycle,
    iconColor: "text-teal-700",
    iconBackground: "bg-teal-100",
    cardBackground: "bg-teal-50/40",
  },
  {
    title: "Education",
    events: "Schools & Digital Literacy",
    href: "/explore?category=Education",
    icon: GraduationCap,
    iconColor: "text-blue-700",
    iconBackground: "bg-blue-100",
    cardBackground: "bg-blue-50/40",
  },
  {
    title: "Healthcare",
    events: "Primary Care & Diagnostics",
    href: "/explore?category=Healthcare",
    icon: HeartPulse,
    iconColor: "text-rose-700",
    iconBackground: "bg-rose-100",
    cardBackground: "bg-rose-50/40",
  },
  {
    title: "Transportation",
    events: "Transit & Traffic Safety",
    href: "/explore?category=Transportation",
    icon: Bus,
    iconColor: "text-amber-700",
    iconBackground: "bg-amber-100",
    cardBackground: "bg-amber-50/40",
  },
  {
    title: "Accessibility",
    events: "Assistive Tech & Inclusion",
    href: "/explore?category=Accessibility",
    icon: Accessibility,
    iconColor: "text-violet-700",
    iconBackground: "bg-violet-100",
    cardBackground: "bg-violet-50/40",
  },
  {
    title: "Public Safety",
    events: "Emergency & Women Safety",
    href: "/explore?category=Public Safety",
    icon: ShieldAlert,
    iconColor: "text-orange-700",
    iconBackground: "bg-orange-100",
    cardBackground: "bg-orange-50/40",
  },
  {
    title: "Water Conservation",
    events: "Clean Water & Rain Harvesting",
    href: "/explore?category=Water Conservation",
    icon: Droplets,
    iconColor: "text-cyan-700",
    iconBackground: "bg-cyan-100",
    cardBackground: "bg-cyan-50/40",
  },
  {
    title: "Rural Development",
    events: "Agri-Tech & Village Infrastructure",
    href: "/explore?category=Rural Development",
    icon: Sprout,
    iconColor: "text-lime-700",
    iconBackground: "bg-lime-100",
    cardBackground: "bg-lime-50/40",
  },
];

const Categories = () => {
  return (
    <section className="overflow-hidden">
      {/* Heading */}
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p className="mb-1.5 text-xs font-black uppercase tracking-wider text-violet-600 sm:text-sm">
            Focus Areas
          </p>

          <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            9 Social Innovation Domains
          </h2>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Explore grassroots challenges categorized by community impact areas.
          </p>
        </div>

        <Link
          href="/explore"
          className="group hidden items-center gap-1.5 text-xs font-bold text-violet-700 transition hover:text-violet-900 sm:flex"
        >
          View All Challenges
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Mobile horizontal slider */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 scrollbar-none sm:hidden">
        {SOCIAL_INNOVATION_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="w-[72%] min-w-[220px] max-w-[260px] shrink-0 snap-start"
          >
            <CategoryCard {...category} />
          </div>
        ))}
      </div>

      {/* Tablet / Desktop grid (3 cols on tablet, 3-4 cols on desktop) */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {SOCIAL_INNOVATION_CATEGORIES.map((category) => (
          <CategoryCard
            key={category.title}
            {...category}
          />
        ))}
      </div>

      {/* Mobile swipe indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
        <span className="h-1.5 w-6 rounded-full bg-violet-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
      </div>
    </section>
  );
};

export default Categories;