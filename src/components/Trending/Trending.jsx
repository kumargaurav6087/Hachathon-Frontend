"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const trendingData = [
  {
    id: 1,
    title: "Google Solution Challenge 2026",
    company: "Google",
    category: "Hackathon",
    mode: "Online",
    participants: 7230,
    deadline: "15 Sep 2026",
    prize: "₹4,00,000",
    trendingScore: 98,
    skills: ["Cloud", "AI", "Social Impact"],
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Microsoft Imagine Cup",
    company: "Microsoft",
    category: "Competition",
    mode: "Online",
    participants: 22100,
    deadline: "01 Oct 2026",
    prize: "$3,000",
    trendingScore: 95,
    skills: ["Azure", "Innovation", "Startups"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Amazon ML Challenge 2026",
    company: "Amazon",
    category: "Competition",
    mode: "Online",
    participants: 12430,
    deadline: "10 Sep 2026",
    prize: "₹3,00,000",
    trendingScore: 93,
    skills: ["Machine Learning", "AWS", "Data Science"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Flipkart Grid 7.0",
    company: "Flipkart",
    category: "Competition",
    mode: "Hybrid",
    participants: 35000,
    deadline: "20 Aug 2026",
    prize: "₹2,50,000",
    trendingScore: 91,
    skills: ["Engineering", "E-commerce", "Problem Solving"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Adobe University Hackathon 2026",
    company: "Adobe",
    category: "Hackathon",
    mode: "Online",
    participants: 4821,
    deadline: "31 Aug 2026",
    prize: "₹5,00,000",
    trendingScore: 89,
    skills: ["AI", "Creative Tech", "APIs"],
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "boAt Code Wave Challenge",
    company: "boAt",
    category: "Hackathon",
    mode: "Hybrid",
    participants: 5600,
    deadline: "25 Aug 2026",
    prize: "₹1,50,000",
    trendingScore: 86,
    skills: ["IoT", "Mobile", "Consumer Tech"],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
  },
];

const Trending = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredData = useMemo(() => {
    return trendingData.filter((item) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.company.toLowerCase().includes(searchValue) ||
        item.skills.some((skill) =>
          skill.toLowerCase().includes(searchValue),
        );

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-19">
        <Header />

        <section className="mx-auto max-w-350 px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-9 sm:py-10">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-orange-200">
                Trending opportunities
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.045em] sm:text-5xl">
                Popular right now
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Discover the most viewed and fastest-growing hackathons and
                competitions on the platform.
              </p>
            </div>
          </div>

          <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search trending opportunities..."
                className="h-12.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-50 lg:max-w-md"
              />

              <div className="flex gap-2 overflow-x-auto">
                {["All", "Hackathon", "Competition"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-xl px-4 py-3 text-xs font-bold transition ${
                      category === item
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredData.map((item, index) => (
              <TrendingCard
                key={item.id}
                item={item}
                rank={index + 1}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

const TrendingCard = ({ item, rank }) => {
  return (
    <Link
      href={`/events/${item.id}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.05), rgba(15,23,42,0.5)), url("${item.image}")`,
        }}
      >
        <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-black text-slate-950 shadow">
          #{rank}
        </span>

        <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
          {item.trendingScore}% hot
        </span>

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur">
            {item.mode}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-700">
          {item.company}
        </p>

        <h2 className="mt-2 text-lg font-black leading-6 text-slate-950 group-hover:text-blue-700">
          {item.title}
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Participants
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {item.participants.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Prize
            </p>

            <p className="mt-1 text-sm font-black text-slate-900">
              {item.prize}
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs font-semibold text-slate-400">
          Deadline: {item.deadline}
        </p>
      </div>
    </Link>
  );
};

export default Trending;