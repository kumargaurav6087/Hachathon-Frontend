import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
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
    <section className="py-20">
      <div className="mb-8 flex items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <TrendingUp size={29} className="text-[#1769c2]" />

            <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950">
              Trending Now
            </h2>
          </div>

          <p className="mt-2 text-base text-slate-500">
            Latest competitions gaining momentum
          </p>
        </div>

        <Link
          href="/trending"
          className="hidden items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-[#1769c2] sm:flex"
        >
          View All
          <ArrowRight size={17} />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {trendingOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.title} {...opportunity} />
        ))}
      </div>
    </section>
  );
};

export default TrendingOpportunities;