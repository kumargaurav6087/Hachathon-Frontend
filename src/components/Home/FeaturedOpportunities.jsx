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
    <section className="pb-20">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Target size={29} className="text-[#bf613f]" />

          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-slate-950">
            Featured Opportunities
          </h2>
        </div>

        <p className="mt-2 text-base text-slate-500">
          Handpicked challenges with massive prize pools
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredOpportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.title} {...opportunity} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedOpportunities;