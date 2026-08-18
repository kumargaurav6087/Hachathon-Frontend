"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Medal,
  RefreshCw,
  Trophy,
  Users,
  Loader2,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import {
  getLeaderboard,
} from "@/lib/submissionApi";

const Leaderboard = () => {
  const [
    leaderboard,
    setLeaderboard,
  ] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [error, setError] =
    useState("");

  // ========================================
  // LOAD LEADERBOARD
  // ========================================

  const fetchLeaderboard = async (
    isRefresh = false
  ) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data =
        await getLeaderboard();

      const leaderboardData =
        data?.leaderboard ||
        data?.submissions ||
        (Array.isArray(data)
          ? data
          : []);

      setLeaderboard(
        leaderboardData
      );
    } catch (err) {
      console.error(
        "Leaderboard fetch error:",
        err
      );

      setError(
        err?.message ||
          "Leaderboard load nahi hua."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm">
                <Loader2
                  size={30}
                  className="animate-spin text-[#1769c2]"
                />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-500">
                Loading leaderboard...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* =========================
              HERO
          ========================== */}

          <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-amber-500/15 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-100 sm:text-xs">
                  <Trophy size={15} />

                  HackOn Rankings
                </div>

                <h1 className="mt-4 text-[32px] font-black leading-[1.05] tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
                  Leaderboard
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                  See how teams are
                  performing based on
                  evaluated project
                  scores.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  fetchLeaderboard(
                    true
                  )
                }
                disabled={
                  refreshing
                }
                className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-900 transition-all active:scale-[0.97] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <RefreshCw
                  size={16}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />

                {refreshing
                  ? "Refreshing..."
                  : "Refresh"}
              </button>
            </div>
          </section>

          {/* =========================
              ERROR
          ========================== */}

          {error && (
            <div className="mt-5 rounded-[20px] border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 sm:px-5 sm:py-4">
              {error}
            </div>
          )}

          {/* =========================
              TOP 3
          ========================== */}

          {!error &&
            leaderboard.length >
              0 && (
              <section className="mt-6">
                <div className="grid gap-4 md:grid-cols-3 md:gap-5">
                  {leaderboard
                    .slice(0, 3)
                    .map(
                      (
                        item,
                        index
                      ) => (
                        <TopTeamCard
                          key={
                            item?._id ||
                            item?.id ||
                            index
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
              </section>
            )}

          {/* =========================
              FULL RANKING
          ========================== */}

          {!error &&
          leaderboard.length > 0 ? (
            <LeaderboardList
              leaderboard={
                leaderboard
              }
            />
          ) : (
            !error && (
              <EmptyLeaderboard />
            )
          )}
        </section>
      </div>
    </main>
  );
};

// ========================================
// TOP TEAM CARD
// ========================================

const TopTeamCard = ({
  item,
  rank,
}) => {
  const teamName =
    item?.team?.teamName ||
    item?.teamName ||
    "Unknown Team";

  const projectTitle =
    item?.projectTitle?.trim() ||
    "Untitled Project";

  const score =
    item?.score ?? 0;

  const rankStyle = {
    1: {
      icon:
        Trophy,

      box:
        "bg-amber-100 text-amber-700",

      badge:
        "bg-amber-100 text-amber-700",

      border:
        "border-amber-200",

      accent:
        "bg-amber-400",

      label:
        "1st Place",
    },

    2: {
      icon:
        Medal,

      box:
        "bg-slate-100 text-slate-600",

      badge:
        "bg-slate-100 text-slate-600",

      border:
        "border-slate-200",

      accent:
        "bg-slate-300",

      label:
        "2nd Place",
    },

    3: {
      icon:
        Medal,

      box:
        "bg-orange-100 text-orange-700",

      badge:
        "bg-orange-100 text-orange-700",

      border:
        "border-orange-200",

      accent:
        "bg-orange-300",

      label:
        "3rd Place",
    },
  };

  const style =
    rankStyle[rank] ||
    rankStyle[3];

  const Icon =
    style.icon;

  return (
    <article
      className={`group relative overflow-hidden rounded-[24px] border bg-white shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 active:scale-[0.99] md:hover:-translate-y-1 md:hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)] ${style.border}`}
    >
      <div
        className={`h-1.5 w-full ${style.accent}`}
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${style.box}`}
          >
            <Icon size={20} />
          </div>

          <span
            className={`rounded-full px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${style.badge}`}
          >
            {style.label}
          </span>
        </div>

        <h3 className="mt-5 truncate text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
          {teamName}
        </h3>

        <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
          {projectTitle}
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
              Rank
            </p>

            <p className="mt-1 text-xl font-black text-slate-950">
              #{rank}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400">
              Score
            </p>

            <div className="mt-1">
              <span className="text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl">
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

// ========================================
// LEADERBOARD LIST
// ========================================

const LeaderboardList = ({
  leaderboard,
}) => {
  return (
    <section className="mt-6 overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.045)]">
      <div className="border-b border-slate-100 px-4 py-5 sm:px-6">
        <h2 className="text-lg font-black tracking-[-0.02em] text-slate-950">
          Team Rankings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Rankings based on
          evaluation score.
        </p>
      </div>

      {/* MOBILE CARDS */}

      <div className="divide-y divide-slate-100 md:hidden">
        {leaderboard.map(
          (
            item,
            index
          ) => (
            <MobileRankingCard
              key={
                item?._id ||
                item?.id ||
                index
              }
              item={item}
              rank={
                index + 1
              }
            />
          )
        )}
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-left">
              <TableHead>
                Rank
              </TableHead>

              <TableHead>
                Team
              </TableHead>

              <TableHead>
                Project
              </TableHead>

              <TableHead>
                Hackathon
              </TableHead>

              <TableHead alignRight>
                Score
              </TableHead>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map(
              (
                item,
                index
              ) => {
                const teamName =
                  item?.team
                    ?.teamName ||
                  item?.teamName ||
                  "Unknown Team";

                const projectTitle =
                  item?.projectTitle?.trim() ||
                  "Untitled Project";

                const hackathonTitle =
                  item?.hackathon
                    ?.title ||
                  item?.hackathonTitle ||
                  "Hackathon";

                const score =
                  item?.score ??
                  0;

                return (
                  <tr
                    key={
                      item?._id ||
                      item?.id ||
                      index
                    }
                    className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <RankBadge
                        rank={
                          index +
                          1
                        }
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2]">
                          <Users
                            size={18}
                          />
                        </div>

                        <p className="max-w-[170px] truncate text-sm font-black text-slate-900">
                          {
                            teamName
                          }
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-[190px] truncate text-sm font-semibold text-slate-700">
                        {
                          projectTitle
                        }
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-[180px] truncate text-sm text-slate-500">
                        {
                          hackathonTitle
                        }
                      </p>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <span className="text-xl font-black text-slate-950">
                        {
                          score
                        }
                      </span>

                      <span className="ml-1 text-xs font-bold text-slate-400">
                        /100
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// ========================================
// MOBILE RANKING CARD
// ========================================

const MobileRankingCard = ({
  item,
  rank,
}) => {
  const teamName =
    item?.team?.teamName ||
    item?.teamName ||
    "Unknown Team";

  const projectTitle =
    item?.projectTitle?.trim() ||
    "Untitled Project";

  const hackathonTitle =
    item?.hackathon?.title ||
    item?.hackathonTitle ||
    "Hackathon";

  const score =
    item?.score ?? 0;

  return (
    <article className="p-4">
      <div className="flex items-start gap-3">
        <RankBadge rank={rank} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-black text-slate-900">
                {teamName}
              </p>

              <p className="mt-1 truncate text-xs text-slate-500">
                {projectTitle}
              </p>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-xl font-black text-slate-950">
                {score}
              </span>

              <span className="ml-0.5 text-[10px] font-bold text-slate-400">
                /100
              </span>
            </div>
          </div>

          <p className="mt-3 truncate text-[10px] font-semibold text-slate-400">
            {hackathonTitle}
          </p>
        </div>
      </div>
    </article>
  );
};

// ========================================
// TABLE HEAD
// ========================================

const TableHead = ({
  children,
  alignRight = false,
}) => {
  return (
    <th
      className={`px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 ${
        alignRight
          ? "text-right"
          : ""
      }`}
    >
      {children}
    </th>
  );
};

// ========================================
// RANK BADGE
// ========================================

const RankBadge = ({
  rank,
}) => {
  const styles = {
    1: "bg-amber-100 text-amber-700",
    2: "bg-slate-100 text-slate-600",
    3: "bg-orange-100 text-orange-700",
  };

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black ${
        styles[rank] ||
        "bg-slate-50 text-slate-500"
      }`}
    >
      {rank}
    </div>
  );
};

// ========================================
// EMPTY
// ========================================

const EmptyLeaderboard = () => {
  return (
    <section className="mt-6 rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#1769c2]">
        <Trophy size={23} />
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
        Leaderboard is empty
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Evaluated submissions will
        appear here once judges start
        scoring projects.
      </p>
    </section>
  );
};

export default Leaderboard;