"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  HeartHandshake,
  Layers,
  PlusCircle,
  SearchX,
  Sparkles,
  Trophy,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import ExploreFilters from "./ExploreFilters";
import ExploreCard from "./ExploreCard";
import CommunityProblemCard from "./CommunityProblemCard";

import { getAllHackathons } from "@/lib/hackathonApi";
import { getAllProblems } from "@/lib/problemApi";

const ExploreContent = () => {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState("community"); // "community" | "hackathons"
  const [hackathons, setHackathons] = useState([]);
  const [problems, setProblems] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [mode, setMode] = useState("All Modes");
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const tabParam = searchParams.get("tab");

    if (categoryParam) {
      setCategory(categoryParam);
    }
    if (searchParam) {
      setSearch(searchParam);
    }
    if (tabParam === "hackathons") {
      setActiveTab("hackathons");
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [hackathonRes, problemRes] = await Promise.allSettled([
          getAllHackathons(),
          getAllProblems(),
        ]);

        if (!isMounted) return;

        if (hackathonRes.status === "fulfilled") {
          const rawHackathons = hackathonRes.value?.hackathons || [];
          const formatted = rawHackathons.map((h) => ({
            id: h._id,
            title: h.title || "Untitled Hackathon",
            description: h.description || "",
            category: "Hackathon",
            mode:
              h.location?.toLowerCase().trim() === "online"
                ? "Online"
                : h.location || "Online",
            status: h.status,
            deadline: h.registrationDeadline,
            startDate: h.startDate,
            endDate: h.endDate,
            participants: h.registeredTeams?.length || 0,
            maxTeamSize: h.maxTeamSize || 4,
            location: h.location || "Online",
            createdBy: h.createdBy,
            registeredTeams: h.registeredTeams || [],
          }));
          setHackathons(formatted);
        }

        if (problemRes.status === "fulfilled") {
          setProblems(problemRes.value?.problems || []);
        } else {
          console.warn("Problems fetch skipped/empty:", problemRes.reason?.message);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load challenges.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered Community Problems
  const filteredProblems = useMemo(() => {
    const s = search.trim().toLowerCase();

    return problems.filter((prob) => {
      const matchesSearch =
        !s ||
        prob.title?.toLowerCase().includes(s) ||
        prob.description?.toLowerCase().includes(s) ||
        prob.location?.toLowerCase().includes(s) ||
        prob.impactArea?.toLowerCase().includes(s);

      const matchesCat =
        category === "All Categories" ||
        prob.category?.toLowerCase() === category.toLowerCase();

      const matchesStatus =
        status === "all" ||
        prob.status?.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [problems, search, category, status]);

  // Filtered Hackathons
  const filteredHackathons = useMemo(() => {
    const s = search.trim().toLowerCase();

    return hackathons.filter((opp) => {
      const matchesSearch =
        !s ||
        opp.title?.toLowerCase().includes(s) ||
        opp.description?.toLowerCase().includes(s) ||
        opp.location?.toLowerCase().includes(s);

      const matchesCat =
        category === "All Categories" ||
        category === "Hackathon" ||
        opp.category === category;

      const matchesMode =
        mode === "All Modes" ||
        opp.mode?.toLowerCase() === mode.toLowerCase();

      return matchesSearch && matchesCat && matchesMode;
    });
  }, [hackathons, search, category, mode]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All Categories");
    setMode("All Modes");
    setStatus("all");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All Categories" ||
    mode !== "All Modes" ||
    status !== "all";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-900">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <div className="flex min-h-[calc(100vh-68px)] sm:min-h-[calc(100vh-76px)]">
          <ExploreFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            mode={mode}
            setMode={setMode}
            status={status}
            setStatus={setStatus}
          />

          <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1240px]">
              {/* Header Title & Raise CTA */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-violet-700 sm:text-xs">
                    <Sparkles size={14} />
                    Social Innovation Challenges
                  </div>

                  <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">
                    Explore Challenges & Hackathons
                  </h1>

                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500 sm:text-sm">
                    Discover grassroots community problems reported by citizens, and active hackathon tracks across
                    environment, waste management, education, healthcare, and rural development.
                  </p>
                </div>

                <Link
                  href="/problems/new"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-xs font-black text-white shadow-md shadow-violet-500/25 transition hover:from-violet-700 hover:to-purple-700 active:scale-95"
                >
                  <PlusCircle size={16} />
                  Report a Community Problem
                </Link>
              </div>

              {/* View Switcher Tabs */}
              <div className="mb-6 flex items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("community")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${
                    activeTab === "community"
                      ? "bg-violet-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <HeartHandshake size={15} />
                  Community Challenges ({filteredProblems.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("hackathons")}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition ${
                    activeTab === "hackathons"
                      ? "bg-violet-600 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Trophy size={15} />
                  Hackathon Sprints ({filteredHackathons.length})
                </button>
              </div>

              {/* Loading */}
              {loading && (
                <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-64 animate-pulse rounded-3xl border border-slate-200 bg-white"
                    />
                  ))}
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
                  <SearchX size={32} className="mx-auto text-red-500" />
                  <h2 className="mt-4 text-lg font-black text-slate-900">Failed to load challenges</h2>
                  <p className="mt-1 text-xs text-red-500">{error}</p>
                </div>
              )}

              {/* Content Grid */}
              {!loading && !error && (
                <>
                  {/* Results Count Bar */}
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm sm:px-5">
                    <p className="text-xs font-bold text-slate-700">
                      {activeTab === "community"
                        ? `${filteredProblems.length} community challenges found`
                        : `${filteredHackathons.length} hackathon opportunities found`}
                    </p>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  {/* Community Challenges Tab */}
                  {activeTab === "community" && (
                    filteredProblems.length > 0 ? (
                      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredProblems.map((prob) => (
                          <CommunityProblemCard key={prob._id} problem={prob} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <Compass size={36} className="mx-auto text-violet-500" />
                        <h3 className="mt-4 text-base font-black text-slate-900">No Community Challenges Found</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Try searching for a different keyword or be the first to report an issue in this category!
                        </p>
                        <Link
                          href="/problems/new"
                          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700"
                        >
                          <PlusCircle size={14} />
                          Report Community Problem
                        </Link>
                      </div>
                    )
                  )}

                  {/* Hackathon Sprints Tab */}
                  {activeTab === "hackathons" && (
                    filteredHackathons.length > 0 ? (
                      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {filteredHackathons.map((opp) => (
                          <ExploreCard key={opp.id} opportunity={opp} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                        <Trophy size={36} className="mx-auto text-amber-500" />
                        <h3 className="mt-4 text-base font-black text-slate-900">No Hackathons Found</h3>
                        <p className="mt-1 text-xs text-slate-500">
                          Check back soon for upcoming innovation sprints.
                        </p>
                      </div>
                    )
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

const Explore = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-bold text-slate-500">Loading challenges...</div>}>
      <ExploreContent />
    </Suspense>
  );
};

export default Explore;