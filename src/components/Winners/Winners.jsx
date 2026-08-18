"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Crown,
  Loader2,
  Medal,
  RefreshCw,
  Trophy,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import {
  getAllHackathons,
} from "@/lib/hackathonApi";

import {
  getWinners,
} from "@/lib/submissionApi";

const Winners = () => {
  const [hackathons, setHackathons] =
    useState([]);

  const [
    selectedHackathon,
    setSelectedHackathon,
  ] = useState("");

  const [winners, setWinners] =
    useState([]);

  const [
    loadingHackathons,
    setLoadingHackathons,
  ] = useState(true);

  const [
    loadingWinners,
    setLoadingWinners,
  ] = useState(false);

  const [error, setError] =
    useState("");

  // =========================================
  // LOAD HACKATHONS
  // =========================================

  useEffect(() => {
    const loadHackathons =
      async () => {
        try {
          setLoadingHackathons(
            true
          );

          setError("");

          const response =
            await getAllHackathons();

          const allHackathons =
            response?.hackathons ||
            response?.data ||
            (Array.isArray(response)
              ? response
              : []);

          setHackathons(
            allHackathons
          );

          if (
            allHackathons.length >
            0
          ) {
            const firstHackathonId =
              allHackathons[0]
                ?._id ||
              allHackathons[0]
                ?.id;

            setSelectedHackathon(
              firstHackathonId ||
                ""
            );
          }
        } catch (error) {
          setError(
            error?.message ||
              "Hackathons load nahi hue."
          );
        } finally {
          setLoadingHackathons(
            false
          );
        }
      };

    loadHackathons();
  }, []);

  // =========================================
  // LOAD WINNERS
  // =========================================

  const loadWinners =
    async () => {
      if (
        !selectedHackathon
      ) {
        return;
      }

      try {
        setLoadingWinners(
          true
        );

        setError("");

        const response =
          await getWinners(
            selectedHackathon
          );

        setWinners(
          response?.winners ||
            []
        );
      } catch (error) {
        const message =
          error?.message
            ?.toLowerCase() ||
          "";

        if (
          message.includes(
            "no approved submissions"
          )
        ) {
          setWinners([]);
          setError("");
        } else {
          setError(
            error?.message ||
              "Winners load nahi hue."
          );
        }
      } finally {
        setLoadingWinners(
          false
        );
      }
    };

  useEffect(() => {
    if (
      selectedHackathon
    ) {
      loadWinners();
    }
  }, [selectedHackathon]);

  // =========================================
  // CURRENT HACKATHON
  // =========================================

  const currentHackathon =
    useMemo(() => {
      return hackathons.find(
        (hackathon) => {
          const id =
            hackathon?._id ||
            hackathon?.id;

          return (
            id?.toString() ===
            selectedHackathon?.toString()
          );
        }
      );
    }, [
      hackathons,
      selectedHackathon,
    ]);

  // =========================================
  // LOADING PAGE
  // =========================================

  if (loadingHackathons) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-100 bg-white shadow-sm">
                <Loader2
                  size={30}
                  className="animate-spin text-amber-600"
                />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-500">
                Loading winners...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // PAGE
  // =========================================

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* HERO */}

          <WinnersHero />

          {/* HACKATHON SELECT */}

          <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0 flex-1">
                <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 sm:text-xs">
                  Select Hackathon
                </label>

                <select
                  value={
                    selectedHackathon
                  }
                  onChange={(
                    event
                  ) =>
                    setSelectedHackathon(
                      event.target
                        .value
                    )
                  }
                  disabled={
                    hackathons.length ===
                    0
                  }
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-800 outline-none transition focus:border-[#1769c2] focus:bg-white focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60 lg:max-w-md"
                >
                  {hackathons.length ===
                  0 ? (
                    <option value="">
                      No hackathons
                      available
                    </option>
                  ) : (
                    hackathons.map(
                      (
                        hackathon
                      ) => {
                        const id =
                          hackathon?._id ||
                          hackathon?.id;

                        return (
                          <option
                            key={id}
                            value={
                              id
                            }
                          >
                            {
                              hackathon.title
                            }
                          </option>
                        );
                      }
                    )
                  )}
                </select>

                {currentHackathon && (
                  <p className="mt-2 text-xs text-slate-400">
                    Showing results
                    for{" "}
                    <span className="font-bold text-slate-700">
                      {
                        currentHackathon.title
                      }
                    </span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={
                  loadWinners
                }
                disabled={
                  loadingWinners ||
                  !selectedHackathon
                }
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-all active:scale-[0.97] hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
          </section>

          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-[20px] border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 sm:px-5 sm:py-4">
              {error}
            </div>
          )}

          {/* WINNERS LOADING */}

          {loadingWinners && (
            <section className="mt-6 flex min-h-[280px] items-center justify-center rounded-[26px] border border-slate-200 bg-white shadow-sm">
              <div className="text-center">
                <Loader2
                  size={30}
                  className="mx-auto animate-spin text-[#1769c2]"
                />

                <p className="mt-4 text-sm font-bold text-slate-500">
                  Loading top
                  winners...
                </p>
              </div>
            </section>
          )}

          {/* WINNERS */}

          {!loadingWinners &&
            !error &&
            winners.length > 0 && (
              <section className="mt-6">
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {winners.map(
                    (
                      winner,
                      index
                    ) => (
                      <WinnerCard
                        key={
                          winner?._id ||
                          winner?.id ||
                          winner?.rank ||
                          index
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
              <EmptyWinners />
            )}
        </section>
      </div>
    </main>
  );
};

// =========================================
// HERO
// =========================================

const WinnersHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-amber-200 sm:text-xs">
          <Crown size={15} />
          HackOn Winners
        </div>

        <h1 className="mt-4 text-[32px] font-black leading-[1.05] tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
          Top Winners
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          View the top teams based on
          approved project scores for
          each hackathon.
        </p>
      </div>
    </section>
  );
};

// =========================================
// WINNER CARD
// =========================================

const WinnerCard = ({
  winner,
}) => {
  const rank =
    Number(winner?.rank) ||
    0;

  const teamName =
    winner?.team?.teamName ||
    "Unknown Team";

  const hackathonTitle =
    winner?.hackathon
      ?.title ||
    "Hackathon";

  const projectTitle =
    winner?.projectTitle ||
    "Untitled Project";

  const score =
    winner?.score ?? 0;

  const rankConfig = {
    1: {
      label: "Winner",
      icon: Trophy,

      iconBox:
        "bg-amber-100 text-amber-700",

      badge:
        "bg-amber-100 text-amber-700",

      card:
        "border-amber-200",

      accent:
        "bg-amber-400",
    },

    2: {
      label:
        "First Runner-up",
      icon: Medal,

      iconBox:
        "bg-slate-100 text-slate-600",

      badge:
        "bg-slate-100 text-slate-600",

      card:
        "border-slate-200",

      accent:
        "bg-slate-300",
    },

    3: {
      label:
        "Second Runner-up",
      icon: Medal,

      iconBox:
        "bg-orange-100 text-orange-700",

      badge:
        "bg-orange-100 text-orange-700",

      card:
        "border-orange-200",

      accent:
        "bg-orange-300",
    },
  };

  const config =
    rankConfig[rank] ||
    rankConfig[3];

  const Icon =
    config.icon;

  return (
    <article
      className={`group relative overflow-hidden rounded-[26px] border bg-white shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 active:scale-[0.995] lg:hover:-translate-y-1 lg:hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)] ${config.card}`}
    >
      {/* ACCENT */}

      <div
        className={`h-1.5 w-full ${config.accent}`}
      />

      {/* HEADER */}

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${config.iconBox}`}
          >
            <Icon size={21} />
          </div>

          <span
            className={`rounded-full px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${config.badge}`}
          >
            {config.label}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2]">
            Rank #{rank}
          </p>

          <h2 className="mt-2 break-words text-xl font-black leading-7 tracking-[-0.025em] text-slate-950">
            {teamName}
          </h2>

          <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
            {projectTitle}
          </p>
        </div>

        {/* HACKATHON */}

        <div className="mt-5 rounded-[18px] border border-slate-100 bg-slate-50/80 p-4">
          <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
            Hackathon
          </p>

          <p className="mt-1.5 break-words text-sm font-bold leading-5 text-slate-900">
            {hackathonTitle}
          </p>
        </div>

        {/* SCORE */}

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
              Position
            </p>

            <p className="mt-1 text-2xl font-black tracking-[-0.03em] text-slate-950">
              #{rank}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
              Score
            </p>

            <div className="mt-1">
              <span className="text-3xl font-black tracking-[-0.04em] text-slate-950">
                {score}
              </span>

              <span className="ml-1 text-xs font-bold text-slate-400">
                /100
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

// =========================================
// EMPTY
// =========================================

const EmptyWinners = () => {
  return (
    <section className="mt-6 rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
        <Trophy size={23} />
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
        Winners not announced yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Approved submissions will
        appear here once judges finish
        evaluating the projects.
      </p>
    </section>
  );
};

export default Winners;