"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import ExploreFilters from "./ExploreFilters";
import ExploreCard from "./ExploreCard";

const opportunities = [
  {
    id: 1,
    company: "Adobe",
    title: "Adobe University Hackathon 2026",
    category: "Hackathon",
    mode: "Online",
    featured: true,
    skills: ["AI", "Creative Tech", "APIs"],
    deadline: "8/31/2026",
    participants: "4,821",
    prize: "₹5,00,000",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    company: "Amazon",
    title: "Amazon ML Challenge 2026",
    category: "Competition",
    mode: "Online",
    featured: true,
    skills: ["Machine Learning", "Data Science", "AWS"],
    deadline: "9/10/2026",
    participants: "12,430",
    prize: "₹3,00,000",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    company: "Flipkart",
    title: "Flipkart Grid 7.0",
    category: "Competition",
    mode: "Hybrid",
    featured: true,
    skills: ["Engineering", "E-commerce", "Problem Solving"],
    deadline: "8/20/2026",
    participants: "35,000",
    prize: "₹2,50,000",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    company: "Google",
    title: "Google Developer Student Challenge",
    category: "Hackathon",
    mode: "Online",
    featured: true,
    skills: ["Cloud", "Flutter", "Firebase"],
    deadline: "9/15/2026",
    participants: "7,230",
    prize: "₹4,00,000",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    company: "Microsoft",
    title: "Microsoft Imagine Cup",
    category: "Competition",
    mode: "Online",
    featured: true,
    skills: ["Azure", "AI", "Startups"],
    deadline: "10/1/2026",
    participants: "22,100",
    prize: "$3,000",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    company: "Infosys",
    title: "Infosys Campus Innovation Program",
    category: "Internship",
    mode: "Offline",
    featured: false,
    skills: ["Java", "Cloud", "Problem Solving"],
    deadline: "8/25/2026",
    participants: "5,600",
    prize: "₹1,50,000",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
  },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [mode, setMode] = useState("All Modes");

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        opportunity.title.toLowerCase().includes(searchValue) ||
        opportunity.company.toLowerCase().includes(searchValue) ||
        opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(searchValue),
        );

      const matchesCategory =
        category === "All Categories" ||
        opportunity.category === category;

      const matchesMode =
        mode === "All Modes" || opportunity.mode === mode;

      return matchesSearch && matchesCategory && matchesMode;
    });
  }, [search, category, mode]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="flex min-h-[calc(100vh-76px)]">
          <ExploreFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            mode={mode}
            setMode={setMode}
          />

          <section className="min-w-0 flex-1 px-5 py-8 sm:px-7 lg:px-10">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-8">
                <h1 className="text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Explore Opportunities
                </h1>

                <p className="mt-2 text-base text-slate-500">
                  Showing {filteredOpportunities.length} results
                </p>
              </div>

              {filteredOpportunities.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredOpportunities.map((opportunity) => (
                    <ExploreCard
                      key={opportunity.id}
                      opportunity={opportunity}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
                  <h2 className="text-xl font-bold text-slate-950">
                    No opportunities found
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Search ya filters change karke try karo.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Explore;