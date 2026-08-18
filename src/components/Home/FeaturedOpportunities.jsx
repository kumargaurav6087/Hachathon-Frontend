import { Target } from "lucide-react";
import OpportunityCard from "./OpportunityCard";

export const featuredOpportunities = [
  {
    href: "/hackathons/adobe-university-hackathon-2026",
    company: "Adobe",
    title: "Adobe University Hackathon 2026",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
    skills: ["AI", "Creative Tech", "APIs"],
    deadline: "8/31/2026",
    participants: "4,821",
    prize: "₹5,00,000",
  },
  {
    href: "/hackathons/amazon-ml-challenge-2026",
    company: "Amazon",
    title: "Amazon ML Challenge 2026",
    mode: "online",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    skills: ["Machine Learning", "Data Science", "AWS"],
    deadline: "9/10/2026",
    participants: "12,430",
    prize: "₹3,00,000",
  },
  {
    href: "/hackathons/flipkart-grid-7",
    company: "Flipkart",
    title: "Flipkart Grid 7.0",
    mode: "hybrid",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
    skills: ["Engineering", "E-commerce", "Problem Solving"],
    deadline: "8/20/2026",
    participants: "35,000",
    prize: "₹2,50,000",
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="overflow-hidden">
      {/* Heading */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#bf613f]">
            <Target size={22} strokeWidth={2} />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#bf613f] sm:text-sm">
              Handpicked
            </p>

            <h2 className="mt-1 text-[28px] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl lg:text-[34px]">
              Featured Opportunities
            </h2>
          </div>
        </div>

        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:ml-14 sm:text-base">
          Explore selected challenges, competitions and hackathons with exciting
          rewards and opportunities.
        </p>
      </div>

      {/* Mobile swipe */}
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide md:hidden">
        {featuredOpportunities.map((opportunity) => (
          <div
            key={opportunity.title}
            className="w-[88%] min-w-[290px] max-w-[360px] shrink-0 snap-start"
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
        <span className="h-1.5 w-6 rounded-full bg-[#1769c2]" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
      </div>
    </section>
  );
};

export default FeaturedOpportunities;