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
    <section className="pb-20">
      <h2 className="mb-8 text-3xl font-extrabold tracking-[-0.035em] text-slate-950">
        Browse by Category
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.title} {...category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;