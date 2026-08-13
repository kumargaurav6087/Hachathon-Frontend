"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import ExploreFilters from "./ExploreFilters";
import ExploreCard from "./ExploreCard";

import { getAllHackathons } from "@/lib/hackathonApi";

const Explore = () => {
  const [hackathons, setHackathons] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [mode, setMode] = useState("All Modes");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllHackathons();

        const formattedHackathons = response.hackathons.map(
          (hackathon) => ({
            id: hackathon._id,
            title: hackathon.title,
            description: hackathon.description,
            category: "Hackathon",
            mode:
              hackathon.location?.toLowerCase() === "online"
                ? "Online"
                : hackathon.location || "Online",
            status: hackathon.status,
            deadline: hackathon.registrationDeadline,
            startDate: hackathon.startDate,
            endDate: hackathon.endDate,
            participants:
              hackathon.registeredTeams?.length || 0,
            maxTeamSize: hackathon.maxTeamSize || 4,
            location: hackathon.location || "Online",
            createdBy: hackathon.createdBy,
            registeredTeams:
              hackathon.registeredTeams || [],
          })
        );

        setHackathons(formattedHackathons);
      } catch (error) {
        setError(
          error.message ||
            "Hackathons load nahi hue."
        );
      } finally {
        setLoading(false);
      }
    };

    loadHackathons();
  }, []);

  const filteredOpportunities = useMemo(() => {
    return hackathons.filter((opportunity) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
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
        category === "All Categories" ||
        opportunity.category === category;

      const matchesMode =
        mode === "All Modes" ||
        opportunity.mode === mode;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMode
      );
    });
  }, [
    hackathons,
    search,
    category,
    mode,
  ]);

  return (
    <main className="min-h-screen bg-[#f8fafc]">
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
                  Discover hackathons available on HackOn.
                </p>
              </div>

              {loading && (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center">
                  <p className="text-sm font-bold text-slate-500">
                    Loading hackathons...
                  </p>
                </div>
              )}

              {!loading && error && (
                <div className="rounded-3xl border border-red-100 bg-red-50 p-10 text-center">
                  <h2 className="text-xl font-black text-slate-950">
                    Hackathons load nahi hue
                  </h2>

                  <p className="mt-2 text-sm text-red-600">
                    {error}
                  </p>
                </div>
              )}

              {!loading && !error && (
                <>
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-slate-500">
                      Showing{" "}
                      {filteredOpportunities.length} results
                    </p>

                    <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                      {hackathons.length} total
                    </span>
                  </div>

                  {filteredOpportunities.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                      {filteredOpportunities.map(
                        (opportunity) => (
                          <ExploreCard
                            key={opportunity.id}
                            opportunity={opportunity}
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
                      <h2 className="text-xl font-black text-slate-950">
                        No opportunities found
                      </h2>

                      <p className="mt-2 text-slate-500">
                        Search ya filters change karke try karo.
                      </p>
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