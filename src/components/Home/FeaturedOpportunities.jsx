"use client";

import { Target, ArrowRight, HeartHandshake } from "lucide-react";
import OpportunityCard from "./OpportunityCard";
import Link from "next/link";

export const featuredOpportunities = [
  {
    href: "/explore?category=Waste%20Management",
    company: "Urban Civic Body",
    title: "AI & IoT Waste Segregation for Dense Municipal Wards",
    mode: "hybrid",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    skills: ["Computer Vision", "IoT Sensors", "Civic Dashboard"],
    deadline: "11/15/2026",
    participants: "38 Teams",
    prize: "₹2,50,000 Grant",
  },
  {
    href: "/explore?category=Accessibility",
    company: "Disability Rights Alliance",
    title: "Audio-Haptic Navigation Aid for Visually Impaired Commuters",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=80",
    skills: ["Assistive Tech", "Mobile App", "Audio Feedback"],
    deadline: "11/20/2026",
    participants: "52 Teams",
    prize: "₹3,00,000 Grant",
  },
  {
    href: "/explore?category=Water%20Conservation",
    company: "Rural Water Mission",
    title: "Low-Cost Groundwater Contamination Alert for Panchayats",
    mode: "hybrid",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    skills: ["Embedded IoT", "Water Testing", "SMS Gateway"],
    deadline: "11/30/2026",
    participants: "44 Teams",
    prize: "₹2,00,000 Grant",
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="overflow-hidden">
      {/* Heading */}
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <Target size={20} strokeWidth={2.2} />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-violet-700 sm:text-sm">
                Priority Challenges
              </p>

              <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Featured Social Innovation Sprints
              </h2>
            </div>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500 sm:ml-12 sm:text-sm sm:leading-6">
            Handpicked grassroots challenges submitted by local communities ready for multidisciplinary student teams.
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

      {/* Mobile swipe */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none md:hidden">
        {featuredOpportunities.map((opportunity) => (
          <div
            key={opportunity.title}
            className="w-[88%] min-w-[280px] max-w-[340px] shrink-0 snap-start"
          >
            <OpportunityCard {...opportunity} />
          </div>
        ))}
      </div>

      {/* Tablet / Desktop */}
      <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {featuredOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.title}
            {...opportunity}
          />
        ))}
      </div>

      {/* Mobile swipe hint */}
      <div className="mt-2 flex items-center justify-center gap-1.5 md:hidden">
        <span className="h-1.5 w-6 rounded-full bg-violet-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
      </div>
    </section>
  );
};

export default FeaturedOpportunities;