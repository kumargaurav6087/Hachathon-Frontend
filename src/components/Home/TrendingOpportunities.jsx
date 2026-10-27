"use client";

import Link from "next/link";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

const trendingOpportunities = [
  {
    href: "/explore?category=Rural%20Development",
    company: "Farmers Collective",
    title: "Off-Grid Solar Cold Storage System for Perishable Crops",
    mode: "hybrid",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80",
    skills: ["Clean Energy", "Thermal Control", "Agri-Tech"],
    deadline: "11/25/2026",
    participants: "60 Teams",
    prize: "₹3,50,000 Grant",
  },
  {
    href: "/explore?category=Healthcare",
    company: "Community Health Initiative",
    title: "AI Symptom Triage for Frontline Rural Healthcare Workers",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    skills: ["AI Diagnostics", "Vernacular NLP", "Offline Mobile"],
    deadline: "12/05/2026",
    participants: "78 Teams",
    prize: "₹4,00,000 Grant",
  },
  {
    href: "/explore?category=Public%20Safety",
    company: "Civic Safety Taskforce",
    title: "Community Emergency SOS Network & Safe Transit Corridors",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80",
    skills: ["Geo-fencing", "Real-Time Alerts", "Mobile Security"],
    deadline: "12/12/2026",
    participants: "85 Teams",
    prize: "₹2,50,000 Grant",
  },
];

const TrendingOpportunities = () => {
  return (
    <section className="overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <TrendingUp size={20} strokeWidth={2.2} />
            </span>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-black uppercase tracking-wider text-amber-700 sm:text-sm">
                  Active Civic Problems
                </p>
                <Flame size={14} className="text-amber-500" fill="currentColor" />
              </div>

              <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
                Trending Community Submissions
              </h2>
            </div>
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500 sm:ml-12 sm:text-sm sm:leading-6">
            Civic challenges receiving the highest community upvotes and team interest this week.
          </p>
        </div>

        {/* Desktop View All */}
        <Link
          href="/explore"
          className="group hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 sm:flex"
        >
          View All Challenges
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Mobile slider */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-none md:hidden">
        {trendingOpportunities.map((opportunity) => (
          <div
            key={opportunity.title}
            className="w-[88%] min-w-[280px] max-w-[340px] shrink-0 snap-start"
          >
            <OpportunityCard {...opportunity} />
          </div>
        ))}
      </div>

      {/* Tablet / Desktop Grid */}
      <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {trendingOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.title}
            {...opportunity}
          />
        ))}
      </div>

      {/* Mobile footer */}
      <div className="mt-4 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-violet-600" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        </div>

        <Link
          href="/explore"
          className="flex items-center gap-1 text-xs font-bold text-violet-700"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default TrendingOpportunities;