"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SearchX,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import ExploreFilters from "./ExploreFilters";
import ExploreCard from "./ExploreCard";

import { getAllHackathons } from "@/lib/hackathonApi";

const Explore = () => {
  const searchParams = useSearchParams();

  const [hackathons, setHackathons] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState("All Categories");
  const [mode, setMode] = useState("All Modes");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
    Read category/search from URL

    Example:
    /explore?category=Hackathon
    /explore?search=AI
  */
  useEffect(() => {
    const categoryParam =
      searchParams.get("category");

    const searchParam =
      searchParams.get("search");

    if (categoryParam) {
      setCategory(categoryParam);
    } else {
      setCategory("All Categories");
    }

    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParams]);

  /*
    Load hackathons
  */
  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAllHackathons();

        const formattedHackathons =
          (response?.hackathons || []).map(
            (hackathon) => ({
              id: hackathon._id,

              title:
                hackathon.title ||
                "Untitled Hackathon",

              description:
                hackathon.description || "",

              category: "Hackathon",

              mode:
                hackathon.location
                  ?.toLowerCase()
                  .trim() === "online"
                  ? "Online"
                  : hackathon.location ||
                    "Online",

              status: hackathon.status,

              deadline:
                hackathon.registrationDeadline,

              startDate:
                hackathon.startDate,

              endDate:
                hackathon.endDate,

              participants:
                hackathon.registeredTeams
                  ?.length || 0,

              maxTeamSize:
                hackathon.maxTeamSize || 4,

              location:
                hackathon.location ||
                "Online",

              createdBy:
                hackathon.createdBy,

              registeredTeams:
                hackathon.registeredTeams ||
                [],
            })
          );

        setHackathons(
          formattedHackathons
        );
      } catch (error) {
        setError(
          error?.message ||
            "Hackathons load nahi hue."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHackathons();
  }, []);

  /*
    Search + filters
  */
  const filteredOpportunities =
    useMemo(() => {
      const searchValue = search
        .trim()
        .toLowerCase();

      return hackathons.filter(
        (opportunity) => {
          const matchesSearch =
            !searchValue ||
            opportunity.title
              ?.toLowerCase()
              .includes(searchValue) ||
            opportunity.description
              ?.toLowerCase()
              .includes(searchValue) ||
            opportunity.location
              ?.toLowerCase()
              .includes(searchValue);

          const matchesCategory =
            category ===
              "All Categories" ||
            opportunity.category ===
              category;

          const matchesMode =
            mode === "All Modes" ||
            opportunity.mode
              ?.toLowerCase() ===
              mode.toLowerCase();

          return (
            matchesSearch &&
            matchesCategory &&
            matchesMode
          );
        }
      );
    }, [
      hackathons,
      search,
      category,
      mode,
    ]);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All Categories" ||
    mode !== "All Modes";

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setMode("All Modes");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <div className="flex min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-76px)]">
          {/* Filters */}
          <ExploreFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            mode={mode}
            setMode={setMode}
          />

          {/* Main Content */}
          <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1200px]">
              {/* Page Header */}
              <div className="mb-7 sm:mb-9">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-[#1769c2] sm:text-xs">
                  <Sparkles size={14} />
                  Discover
                </div>

                <h1 className="mt-4 text-[32px] font-black leading-[1.05] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[44px]">
                  Explore Opportunities
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                  Find hackathons, challenges and
                  opportunities that match your
                  interests and skills.
                </p>
              </div>

              {/* Loading */}
              {loading && (
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map(
                    (item) => (
                      <div
                        key={item}
                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white"
                      >
                        <div className="h-[170px] animate-pulse bg-slate-200" />

                        <div className="p-5">
                          <div className="h-3 w-20 animate-pulse rounded-full bg-slate-200" />

                          <div className="mt-4 h-5 w-[85%] animate-pulse rounded-lg bg-slate-200" />

                          <div className="mt-2 h-5 w-[60%] animate-pulse rounded-lg bg-slate-200" />

                          <div className="mt-5 flex gap-2">
                            <div className="h-7 w-16 animate-pulse rounded-lg bg-slate-100" />
                            <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-100" />
                          </div>

                          <div className="mt-6 h-12 animate-pulse rounded-xl bg-slate-100" />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="rounded-[24px] border border-red-100 bg-white p-6 text-center shadow-sm sm:p-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                    <SearchX size={22} />
                  </div>

                  <h2 className="mt-4 text-xl font-black text-slate-950">
                    Hackathons load nahi hue
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-500">
                    {error}
                  </p>
                </div>
              )}

              {!loading && !error && (
                <>
                  {/* Results Bar */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm sm:mb-6 sm:px-5">
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {filteredOpportunities.length}{" "}
                        {filteredOpportunities.length ===
                        1
                          ? "opportunity"
                          : "opportunities"}{" "}
                        found
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {hackathons.length} total
                        opportunities
                      </p>
                    </div>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="rounded-full bg-blue-50 px-3.5 py-2 text-xs font-bold text-[#1769c2] transition hover:bg-blue-100 active:scale-95"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  {/* Cards */}
                  {filteredOpportunities.length >
                  0 ? (
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                      {filteredOpportunities.map(
                        (opportunity) => (
                          <ExploreCard
                            key={
                              opportunity.id
                            }
                            opportunity={
                              opportunity
                            }
                          />
                        )
                      )}
                    </div>
                  ) : (
                    /* Empty state */
                    <div className="rounded-[28px] border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-10 sm:py-16">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <SearchX size={25} />
                      </div>

                      <h2 className="mt-5 text-xl font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
                        No opportunities found
                      </h2>

                      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Search ya filters ko change
                        karke dobara try karo.
                      </p>

                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-6 rounded-full bg-[#1769c2] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#125aa7] active:scale-95"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Explore;