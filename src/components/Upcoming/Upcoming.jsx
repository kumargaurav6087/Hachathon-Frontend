"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  CalendarDays,
  Zap,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import UpcomingFilters from "./UpcomingFilters";
import UpcomingCard from "./UpcomingCard";

const hackathons = [
  {
    id: 2,
    title: "Google DevFest Hack 2026",
    subtitle:
      "Build powerful products with Google technologies",
    mode: "Hybrid",
    category: "Cloud",
    status: "Opens Soon",
    date: "Sep 10, 2026 — Sep 12, 2026",
    expected: "3,200+ expected",
    organizer: "Google Developers",
    skills: [
      "Google Cloud",
      "Firebase",
      "Flutter",
      "AI",
    ],
    registered: 820,
    maxTeams: 1800,
    daysLeft: "28 days left",
    prize: "₹3,00,000",
  },
  {
    id: 3,
    title: "FinTech Innovation Sprint",
    subtitle:
      "Create the future of digital payments",
    mode: "Offline",
    category: "FinTech",
    status: "Registrations Open",
    date: "Oct 5, 2026 — Oct 7, 2026",
    expected: "1,800+ expected",
    organizer: "Innovation Labs",
    skills: [
      "FinTech",
      "Blockchain",
      "Security",
      "APIs",
    ],
    registered: 640,
    maxTeams: 1200,
    daysLeft: "45 days left",
    prize: "₹2,00,000",
  },
];

const Upcoming = () => {
  const [mode, setMode] =
    useState("All");

  const [category, setCategory] =
    useState("All");

  const filteredHackathons =
    useMemo(() => {
      return hackathons.filter(
        (hackathon) => {
          const matchesMode =
            mode === "All" ||
            hackathon.mode ===
              mode;

          const matchesCategory =
            category === "All" ||
            hackathon.category ===
              category;

          return (
            matchesMode &&
            matchesCategory
          );
        }
      );
    }, [mode, category]);

  const hasFilters =
    mode !== "All" ||
    category !== "All";

  const clearFilters = () => {
    setMode("All");
    setCategory("All");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* =========================
              PAGE HEADER
          ========================== */}

          <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white px-5 py-7 shadow-[0_8px_30px_rgba(15,23,42,0.045)] sm:px-8 sm:py-9">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/80 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eef8ff] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2] sm:text-xs">
                <Zap
                  size={15}
                  fill="currentColor"
                />

                Upcoming Events
              </div>

              <h1 className="mt-4 text-[32px] font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[44px]">
                Upcoming Hackathons
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                Discover hackathons and
                competitions that are
                opening or starting soon.
              </p>
            </div>
          </div>

          {/* =========================
              FILTERS
          ========================== */}

          <div className="mt-6">
            <UpcomingFilters
              mode={mode}
              setMode={setMode}
              category={
                category
              }
              setCategory={
                setCategory
              }
            />
          </div>

          {/* =========================
              RESULTS HEADER
          ========================== */}

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={16}
                className="text-[#1769c2]"
              />

              <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                <span className="font-black text-slate-950">
                  {
                    filteredHackathons.length
                  }
                </span>{" "}
                upcoming event
                {filteredHackathons.length ===
                1
                  ? ""
                  : "s"}
              </p>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="text-xs font-bold text-[#1769c2] transition active:scale-95"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* =========================
              EVENTS
          ========================== */}

          {filteredHackathons.length >
          0 ? (
            <div className="mt-5 space-y-4 sm:space-y-5">
              {filteredHackathons.map(
                (
                  hackathon
                ) => (
                  <UpcomingCard
                    key={
                      hackathon.id
                    }
                    hackathon={
                      hackathon
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptyUpcoming
              onClear={
                clearFilters
              }
            />
          )}
        </section>
      </div>
    </main>
  );
};

// ========================================
// EMPTY STATE
// ========================================

const EmptyUpcoming = ({
  onClear,
}) => {
  return (
    <section className="mt-5 rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1769c2]">
        <CalendarDays
          size={22}
        />
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
        No upcoming events found
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Mode ya category filter
        change karke dobara try
        karo.
      </p>

      <button
        type="button"
        onClick={
          onClear
        }
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-all active:scale-[0.97] hover:bg-[#1769c2]"
      >
        Clear filters
      </button>
    </section>
  );
};

export default Upcoming;