"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Flame,
  Search,
  Trophy,
  Users,
  X,
} from "lucide-react";

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
    skills: [
      "Cloud",
      "AI",
      "Social Impact",
    ],
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
    skills: [
      "Azure",
      "Innovation",
      "Startups",
    ],
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
    skills: [
      "Machine Learning",
      "AWS",
      "Data Science",
    ],
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
    skills: [
      "Engineering",
      "E-commerce",
      "Problem Solving",
    ],
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
    skills: [
      "AI",
      "Creative Tech",
      "APIs",
    ],
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
    skills: [
      "IoT",
      "Mobile",
      "Consumer Tech",
    ],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = [
  "All",
  "Hackathon",
  "Competition",
];

const Trending = () => {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const filteredData =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return trendingData.filter(
        (item) => {
          const matchesSearch =
            !searchValue ||
            item.title
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            item.company
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            item.category
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            item.mode
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            item.skills.some(
              (skill) =>
                skill
                  .toLowerCase()
                  .includes(
                    searchValue
                  )
            );

          const matchesCategory =
            category === "All" ||
            item.category ===
              category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [search, category]);

  const hasFilters =
    search.trim() ||
    category !== "All";

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* =========================
              HERO
          ========================== */}

          <TrendingHero />

          {/* =========================
              FILTER TOOLBAR
          ========================== */}

          <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:mt-7 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(
                    event
                  ) =>
                    setSearch(
                      event.target
                        .value
                    )
                  }
                  placeholder="Search trending opportunities..."
                  className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-12
                    pr-10
                    text-sm
                    font-medium
                    text-slate-800
                    outline-none
                    transition
                    placeholder:font-normal
                    placeholder:text-slate-400
                    focus:border-[#1769c2]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition active:scale-90 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {categories.map(
                  (item) => {
                    const active =
                      category ===
                      item;

                    return (
                      <button
                        key={
                          item
                        }
                        type="button"
                        onClick={() =>
                          setCategory(
                            item
                          )
                        }
                        className={`
                          shrink-0
                          rounded-xl
                          border
                          px-4
                          py-2.5
                          text-xs
                          font-bold
                          transition-all
                          active:scale-95

                          ${
                            active
                              ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
                          }
                        `}
                      >
                        {item}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          </section>

          {/* =========================
              RESULTS
          ========================== */}

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold text-slate-500 sm:text-sm">
              <span className="font-black text-slate-950">
                {
                  filteredData.length
                }
              </span>{" "}
              trending opportunit
              {filteredData.length ===
              1
                ? "y"
                : "ies"}
            </p>

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
              CARDS
          ========================== */}

          {filteredData.length >
          0 ? (
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              {filteredData.map(
                (
                  item,
                  index
                ) => (
                  <TrendingCard
                    key={
                      item.id
                    }
                    item={
                      item
                    }
                    rank={
                      index +
                      1
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptyTrending
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

// ==========================================
// HERO
// ==========================================

const TrendingHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-500/25 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-orange-200 backdrop-blur sm:text-xs">
            <Flame size={15} />
            Trending Opportunities
          </div>

          <h1 className="mt-4 text-[32px] font-black leading-[1.05] tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
            Popular right now
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Discover the most viewed and
            fastest-growing hackathons and
            competitions on the platform.
          </p>
        </div>

        {/* Small visual stat */}
        <div className="grid grid-cols-2 gap-3 sm:w-fit">
          <HeroStat
            icon={Flame}
            label="Trending now"
            value={
              trendingData.length
            }
          />

          <HeroStat
            icon={Users}
            label="Total entries"
            value={formatCompactNumber(
              trendingData.reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  item.participants,
                0
              )
            )}
          />
        </div>
      </div>
    </section>
  );
};

const HeroStat = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-[20px] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur sm:min-w-[145px] sm:px-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-orange-200">
        <Icon size={15} />
      </div>

      <p className="mt-3 text-[10px] font-semibold text-slate-300 sm:text-xs">
        {label}
      </p>

      <p className="mt-1 text-xl font-black sm:text-2xl">
        {value}
      </p>
    </div>
  );
};

// ==========================================
// TRENDING CARD
// ==========================================

const TrendingCard = ({
  item,
  rank,
}) => {
  return (
    <Link
      href={`/events/${item.id}`}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200
        bg-white
        shadow-[0_8px_28px_rgba(15,23,42,0.05)]
        transition-all
        duration-300

        active:scale-[0.99]

        md:hover:-translate-y-1
        md:hover:border-blue-200
        md:hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
      "
    >
      {/* Image */}
      <div
        className="relative h-[175px] overflow-hidden bg-cover bg-center sm:h-48"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.05), rgba(15,23,42,0.62)), url("${item.image}")`,
        }}
      >
        {/* Rank */}
        <span
          className={`
            absolute
            left-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-xs
            font-black
            shadow-lg

            ${
              rank === 1
                ? "bg-amber-400 text-slate-950"
                : rank ===
                  2
                ? "bg-slate-200 text-slate-800"
                : rank ===
                  3
                ? "bg-orange-300 text-slate-900"
                : "bg-white text-slate-950"
            }
          `}
        >
          #{rank}
        </span>

        {/* Trending badge */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.08em] text-white shadow-sm sm:text-[10px]">
          <Flame
            size={11}
          />

          {
            item.trendingScore
          }
          % hot
        </span>

        {/* Bottom badges */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-slate-700 backdrop-blur sm:text-xs">
            {item.mode}
          </span>

          <span className="rounded-full bg-slate-950/70 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur sm:text-xs">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1769c2] sm:text-xs">
          {item.company}
        </p>

        <h2 className="mt-2 line-clamp-2 text-lg font-black leading-6 tracking-[-0.02em] text-slate-950 transition group-hover:text-[#1769c2] sm:text-xl">
          {item.title}
        </h2>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {item.skills
            .slice(0, 3)
            .map(
              (skill) => (
                <span
                  key={
                    skill
                  }
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600 sm:text-[10px]"
                >
                  {skill}
                </span>
              )
            )}
        </div>

        {/* Details */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <StatBox
            icon={Users}
            label="Participants"
            value={item.participants.toLocaleString(
              "en-IN"
            )}
          />

          <StatBox
            icon={Trophy}
            label="Prize Pool"
            value={item.prize}
          />
        </div>

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <p className="text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
              Deadline
            </p>

            <p className="mt-1 truncate text-xs font-bold text-slate-700">
              {item.deadline}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2] transition-all group-hover:bg-[#1769c2] group-hover:text-white">
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

// ==========================================
// STAT BOX
// ==========================================

const StatBox = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-[18px] border border-slate-100 bg-slate-50/80 p-3">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Icon
          size={13}
          className="shrink-0"
        />

        <p className="truncate text-[9px] font-black uppercase tracking-[0.07em]">
          {label}
        </p>
      </div>

      <p
        className="mt-2 truncate text-xs font-black text-slate-900 sm:text-sm"
        title={value}
      >
        {value}
      </p>
    </div>
  );
};

// ==========================================
// EMPTY STATE
// ==========================================

const EmptyTrending = ({
  onClear,
}) => {
  return (
    <section className="mt-5 rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
        <Flame size={22} />
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
        No trending opportunities
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Search ya category filter
        change karke dobara try karo.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-[#1769c2]"
      >
        Clear filters
      </button>
    </section>
  );
};

// ==========================================
// HELPERS
// ==========================================

const formatCompactNumber = (
  value
) => {
  if (value >= 1000000) {
    return `${(
      value / 1000000
    ).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(
      value / 1000
    ).toFixed(1)}K`;
  }

  return String(value);
};

export default Trending;