import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Trophy,
  Users,
} from "lucide-react";

import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Hackathons",
    events: "3 Events",
    href: "/hackathons",
    icon: Code2,
    iconColor: "text-[#1769c2]",
    iconBackground: "bg-[#e7f1fb]",
    cardBackground: "bg-[#f6fbff]",
  },
  {
    title: "Competitions",
    events: "5 Events",
    href: "/competitions",
    icon: Trophy,
    iconColor: "text-[#c64e38]",
    iconBackground: "bg-[#fff0ec]",
    cardBackground: "bg-[#fff8f6]",
  },
  {
    title: "Internships",
    events: "2 Events",
    href: "/internships",
    icon: BriefcaseBusiness,
    iconColor: "text-[#168a69]",
    iconBackground: "bg-[#e9f8f1]",
    cardBackground: "bg-[#f5fcf8]",
  },
  {
    title: "Courses",
    events: "1 Event",
    href: "/courses",
    icon: GraduationCap,
    iconColor: "text-[#6653bd]",
    iconBackground: "bg-[#f0edff]",
    cardBackground: "bg-[#faf9ff]",
  },
  {
    title: "Mentorships",
    events: "1 Event",
    href: "/mentorships",
    icon: Users,
    iconColor: "text-[#b55262]",
    iconBackground: "bg-[#fcecef]",
    cardBackground: "bg-[#fff8f9]",
  },
];

const Categories = () => {
  return (
    <section className="overflow-hidden">
      {/* Heading */}
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#1769c2] sm:text-sm">
            Explore
          </p>

          <h2 className="text-[28px] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl lg:text-[34px]">
            Browse by Category
          </h2>
        </div>

        <span className="hidden text-sm font-medium text-slate-400 sm:block">
          Find what fits you
        </span>
      </div>

      {/* Mobile horizontal slider */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 scrollbar-hide sm:hidden">
        {categories.map((category) => (
          <div
            key={category.title}
            className="w-[78%] min-w-[250px] max-w-[290px] shrink-0 snap-start"
          >
            <CategoryCard {...category} />
          </div>
        ))}
      </div>

      {/* Tablet / Desktop grid */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            {...category}
          />
        ))}
      </div>

      {/* Mobile swipe indicator */}
      <div className="mt-3 flex items-center justify-center gap-1.5 sm:hidden">
        <span className="h-1.5 w-6 rounded-full bg-[#1769c2]" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
      </div>
    </section>
  );
};

export default Categories;