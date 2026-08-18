import Link from "next/link";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

const trendingOpportunities = [
  {
    href: "/hackathons/google-solution-challenge",
    company: "Google",
    title: "Google Solution Challenge 2026",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
    skills: ["Cloud", "AI", "Social Impact"],
    deadline: "9/15/2026",
    participants: "7,230",
    prize: "₹4,00,000",
  },
  {
    href: "/competitions/microsoft-imagine-cup",
    company: "Microsoft",
    title: "Microsoft Imagine Cup",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
    skills: ["Azure", "Startups", "Innovation"],
    deadline: "10/1/2026",
    participants: "22,100",
    prize: "$3,000",
  },
  {
    href: "/hackathons/boat-code-wave",
    company: "boAt",
    title: "boAt Code Wave Challenge",
    mode: "hybrid",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
    skills: ["Mobile", "IoT", "Consumer Tech"],
    deadline: "8/25/2026",
    participants: "5,600",
    prize: "₹1,50,000",
  },
];

const TrendingOpportunities = () => {
  return (
    <section className="overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1769c2]">
              <TrendingUp size={22} strokeWidth={2.1} />
            </span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#1769c2] sm:text-sm">
                  Popular
                </p>

                <Flame
                  size={14}
                  className="text-orange-500"
                  fill="currentColor"
                />
              </div>

              <h2 className="mt-1 text-[28px] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl lg:text-[34px]">
                Trending Now
              </h2>
            </div>
          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:ml-14 sm:text-base">
            Discover competitions and challenges gaining the most attention
            right now.
          </p>
        </div>

        {/* Desktop View All */}
        <Link
          href="/trending"
          className="group hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2] sm:flex"
        >
          View All

          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Mobile slider */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:hidden">
        {trendingOpportunities.map((opportunity) => (
          <div
            key={opportunity.title}
            className="w-[88%] min-w-[290px] max-w-[360px] shrink-0 snap-start"
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
          <span className="h-1.5 w-6 rounded-full bg-[#1769c2]" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        </div>

        <Link
          href="/trending"
          className="flex items-center gap-1.5 text-sm font-bold text-[#1769c2]"
        >
          View All
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
};

export default TrendingOpportunities;