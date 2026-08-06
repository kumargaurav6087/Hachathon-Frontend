"use client";

import { useMemo, useState } from "react";
import { Zap } from "lucide-react";
import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import UpcomingFilters from "./UpcomingFilters";
import UpcomingCard from "./UpcomingCard";

const hackathons = [
  {
    id: 1,
    title: "HackOn Monsoon 2026",
    subtitle: "Build for Climate & Sustainability",
    mode: "Online",
    category: "Multi-Track",
    status: "Registrations Open",
    date: "Aug 1, 2026 — Aug 3, 2026",
    expected: "2,400+ expected",
    organizer: "HackOn Platform",
    skills: ["Climate Tech", "AI / ML", "IoT", "Web Dev"],
    registered: 1240,
    maxTeams: 1500,
    daysLeft: "12 days left",
    prize: "₹5,00,000",
  },
  {
    id: 2,
    title: "Google DevFest Hack 2026",
    subtitle: "Build powerful products with Google technologies",
    mode: "Hybrid",
    category: "Cloud",
    status: "Opens Soon",
    date: "Sep 10, 2026 — Sep 12, 2026",
    expected: "3,200+ expected",
    organizer: "Google Developers",
    skills: ["Google Cloud", "Firebase", "Flutter", "AI"],
    registered: 820,
    maxTeams: 1800,
    daysLeft: "28 days left",
    prize: "₹3,00,000",
  },
  {
    id: 3,
    title: "FinTech Innovation Sprint",
    subtitle: "Create the future of digital payments",
    mode: "Offline",
    category: "FinTech",
    status: "Registrations Open",
    date: "Oct 5, 2026 — Oct 7, 2026",
    expected: "1,800+ expected",
    organizer: "Innovation Labs",
    skills: ["FinTech", "Blockchain", "Security", "APIs"],
    registered: 640,
    maxTeams: 1200,
    daysLeft: "45 days left",
    prize: "₹2,00,000",
  },
];

const Upcoming = () => {
  const [mode, setMode] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const matchesMode =
        mode === "All" || hackathon.mode === mode;

      const matchesCategory =
        category === "All" || hackathon.category === category;

      return matchesMode && matchesCategory;
    });
  }, [mode, category]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="mx-auto max-w-[1050px] px-5 py-12 sm:px-7 lg:px-10">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#1769c2]">
              <Zap size={17} fill="currentColor" />
              Upcoming Events
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Upcoming Hackathons
            </h1>

            <p className="mt-2 text-base text-slate-500">
              Mark your calendars — these events are coming up soon.
            </p>
          </div>

          <UpcomingFilters
            mode={mode}
            setMode={setMode}
            category={category}
            setCategory={setCategory}
          />

          <div className="mt-8 space-y-5">
            {filteredHackathons.map((hackathon) => (
              <UpcomingCard
                key={hackathon.id}
                hackathon={hackathon}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Upcoming;