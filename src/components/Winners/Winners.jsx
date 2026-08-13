"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Crown,
  Loader2,
  Medal,
  RefreshCw,
  Trophy,
} from "lucide-react";

import { getAllHackathons } from "@/lib/hackathonApi";
import { getWinners } from "@/lib/submissionApi";

const Winners = () => {
  const [hackathons, setHackathons] = useState([]);
  const [selectedHackathon, setSelectedHackathon] =
    useState("");

  const [winners, setWinners] = useState([]);

  const [loadingHackathons, setLoadingHackathons] =
    useState(true);

  const [loadingWinners, setLoadingWinners] =
    useState(false);

  const [error, setError] = useState("");

  // =========================================
  // LOAD HACKATHONS
  // =========================================

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setLoadingHackathons(true);
        setError("");

        const response =
          await getAllHackathons();

        const allHackathons =
          response.hackathons ||
          response.data ||
          (Array.isArray(response)
            ? response
            : []);

        setHackathons(allHackathons);

        if (allHackathons.length > 0) {
          const firstHackathonId =
            allHackathons[0]._id ||
            allHackathons[0].id;

          setSelectedHackathon(
            firstHackathonId
          );
        }
      } catch (error) {
        setError(
          error.message ||
            "Hackathons load nahi hue."
        );
      } finally {
        setLoadingHackathons(false);
      }
    };

    loadHackathons();
  }, []);

  // =========================================
  // LOAD WINNERS
  // =========================================

  const loadWinners = async () => {
    if (!selectedHackathon) {
      return;
    }

    try {
      setLoadingWinners(true);
      setError("");

      const response =
        await getWinners(
          selectedHackathon
        );

      setWinners(
        response.winners || []
      );
    } catch (error) {
      // Backend no winners case me 404 bhej raha hai
      if (
        error.message
          ?.toLowerCase()
          .includes(
            "no approved submissions"
          )
      ) {
        setWinners([]);
        setError("");
      } else {
        setError(
          error.message ||
            "Winners load nahi hue."
        );
      }
    } finally {
      setLoadingWinners(false);
    }
  };

  useEffect(() => {
    if (selectedHackathon) {
      loadWinners();
    }
  }, [selectedHackathon]);

  // =========================================
  // CURRENT HACKATHON
  // =========================================

  const currentHackathon =
    useMemo(() => {
      return hackathons.find(
        (hackathon) =>
          (
            hackathon._id ||
            hackathon.id
          )?.toString() ===
          selectedHackathon?.toString()
      );
    }, [
      hackathons,
      selectedHackathon,
    ]);

  // =========================================
  // LOADING
  // =========================================

  if (loadingHackathons) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <Loader2
              size={34}
              className="mx-auto animate-spin text-blue-700"
            />

            <p className="mt-4 text-sm font-semibold text-slate-500">
              Loading winners...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-7 lg:px-10">

        {/* HEADER */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
              <Crown size={16} />
              HackOn Winners
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Top Winners
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              View the top three teams
              based on approved project
              scores.
            </p>
          </div>

          <button
            type="button"
            onClick={loadWinners}
            disabled={
              loadingWinners ||
              !selectedHackathon
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={
                loadingWinners
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>
        </div>

        {/* HACKATHON SELECT */}

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="mb-2 block text-xs font-black uppercase tracking-wider text-slate-400">
            Select Hackathon
          </label>

          <select
            value={
              selectedHackathon
            }
            onChange={(event) =>
              setSelectedHackathon(
                event.target.value
              )
            }
            className="h-12 w-full max-w-md rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          >
            {hackathons.map(
              (hackathon) => {
                const id =
                  hackathon._id ||
                  hackathon.id;

                return (
                  <option
                    key={id}
                    value={id}
                  >
                    {hackathon.title}
                  </option>
                );
              }
            )}
          </select>

          {currentHackathon && (
            <p className="mt-3 text-xs text-slate-400">
              Showing winners for{" "}
              <span className="font-bold text-slate-700">
                {
                  currentHackathon.title
                }
              </span>
            </p>
          )}
        </section>

        {/* ERROR */}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* LOADING WINNERS */}

        {loadingWinners && (
          <div className="mt-8 flex min-h-[280px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-center">
              <Loader2
                size={32}
                className="mx-auto animate-spin text-blue-700"
              />

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading top winners...
              </p>
            </div>
          </div>
        )}

        {/* WINNERS */}

        {!loadingWinners &&
          !error &&
          winners.length > 0 && (
            <section className="mt-8">
              <div className="grid gap-6 lg:grid-cols-3">

                {winners.map(
                  (winner) => (
                    <WinnerCard
                      key={
                        winner.rank
                      }
                      winner={
                        winner
                      }
                    />
                  )
                )}

              </div>
            </section>
          )}

        {/* EMPTY */}

        {!loadingWinners &&
          !error &&
          winners.length === 0 && (
            <section className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Trophy
                  size={24}
                />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-950">
                Winners not announced yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Approved submissions
                will appear here once
                judges finish evaluating
                projects.
              </p>
            </section>
          )}

      </div>
    </main>
  );
};

// =========================================
// WINNER CARD
// =========================================

const WinnerCard = ({
  winner,
}) => {
  const rank = winner.rank;

  const teamName =
    winner.team?.teamName ||
    "Unknown Team";

  const hackathonTitle =
    winner.hackathon?.title ||
    "Hackathon";

  const projectTitle =
    winner.projectTitle ||
    "Untitled Project";

  const score =
    winner.score ?? 0;

  const rankConfig = {
    1: {
      label: "Winner",
      icon: Trophy,
      iconBox:
        "bg-amber-50 text-amber-600",
      badge:
        "bg-amber-50 text-amber-700",
    },

    2: {
      label: "First Runner-up",
      icon: Medal,
      iconBox:
        "bg-slate-100 text-slate-600",
      badge:
        "bg-slate-100 text-slate-600",
    },

    3: {
      label: "Second Runner-up",
      icon: Medal,
      iconBox:
        "bg-orange-50 text-orange-700",
      badge:
        "bg-orange-50 text-orange-700",
    },
  };

  const config =
    rankConfig[rank] ||
    rankConfig[3];

  const Icon =
    config.icon;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-100 p-6">
        <div className="flex items-start justify-between gap-4">

          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.iconBox}`}
          >
            <Icon size={22} />
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${config.badge}`}
          >
            {config.label}
          </span>

        </div>

        <h2 className="mt-6 text-xl font-black text-slate-950">
          {teamName}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {projectTitle}
        </p>
      </div>

      <div className="p-6">
        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Hackathon
          </p>

          <p className="mt-2 text-sm font-bold text-slate-900">
            {hackathonTitle}
          </p>

        </div>

        <div className="mt-5 flex items-end justify-between">

          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Rank
            </p>

            <p className="mt-1 text-2xl font-black text-slate-950">
              #{rank}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Score
            </p>

            <div className="mt-1">
              <span className="text-3xl font-black text-slate-950">
                {score}
              </span>

              <span className="ml-1 text-sm font-bold text-slate-400">
                /100
              </span>
            </div>
          </div>

        </div>
      </div>

    </article>
  );
};

export default Winners;