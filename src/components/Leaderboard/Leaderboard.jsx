"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Medal,
  Users,
  Loader2,
  RefreshCw,
} from "lucide-react";

import { getLeaderboard } from "@/lib/submissionApi";


const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getLeaderboard();

      console.log("Leaderboard API:", data);

      /*
        Backend response agar:
        {
          success: true,
          leaderboard: [...]
        }

        ya direct array aaye, dono handle ho jayega.
      */

      const leaderboardData =
        data?.leaderboard ||
        data?.submissions ||
        (Array.isArray(data) ? data : []);

      console.log("Normalized leaderboard:", leaderboardData);
      setLeaderboard(leaderboardData);

    } catch (err) {
      console.error(
        "Leaderboard fetch error:",
        err
      );

      setError(
        err.message ||
          "Leaderboard load nahi hua."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLeaderboard();
  }, []);


  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2
            size={32}
            className="mx-auto animate-spin text-blue-700"
          />

          <p className="mt-4 text-sm font-semibold text-slate-500">
            Loading leaderboard...
          </p>
        </div>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              <Trophy size={15} />
              HackOn Rankings
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Leaderboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              See how teams are performing based on
              their evaluated project scores.
            </p>
          </div>


          <button
            onClick={fetchLeaderboard}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>


        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}


        {/* Top 3 */}
        {!error && leaderboard.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {leaderboard
              .slice(0, 3)
              .map((item, index) => (
                <TopTeamCard
                  key={
                    item._id ||
                    item.id ||
                    index
                  }
                  item={item}
                  rank={index + 1}
                />
              ))}

          </div>
        )}


        {/* Leaderboard Table */}
        {!error && leaderboard.length > 0 ? (
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
              <h2 className="text-lg font-black text-slate-950">
                Team Rankings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Rankings based on evaluation score.
              </p>
            </div>


            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-left">

                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Rank
                    </th>

                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Team
                    </th>

                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Project
                    </th>

                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-400">
                      Hackathon
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-400">
                      Score
                    </th>

                  </tr>
                </thead>


                <tbody>
                  {leaderboard.map(
                    (item, index) => {

                      const teamName =
                        item.team?.teamName ||
                        item.teamName ||
                        "Unknown Team";

                      const projectTitle =
                        item?.projectTitle?.trim() ||
                        "Untitled Project";

                      const hackathonTitle =
                        item.hackathon?.title ||
                        item.hackathonTitle ||
                        "Hackathon";

                      const score =
                        item.score ?? 0;


                      return (
                        <tr
                          key={
                            item._id ||
                            item.id ||
                            index
                          }
                          className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50"
                        >

                          <td className="px-6 py-5">
                            <RankBadge
                              rank={index + 1}
                            />
                          </td>


                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <Users size={18} />
                              </div>

                              <div>
                                <p className="font-extrabold text-slate-900">
                                  {teamName}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  Team
                                </p>
                              </div>

                            </div>
                          </td>


                          <td className="px-6 py-5">
                            <p className="text-sm font-semibold text-slate-700">
                              {projectTitle}
                            </p>
                          </td>


                          <td className="px-6 py-5">
                            <p className="text-sm text-slate-500">
                              {hackathonTitle}
                            </p>
                          </td>


                          <td className="px-6 py-5 text-right">
                            <span className="text-xl font-black text-slate-950">
                              {score}
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
        ) : (
          !error && (
            <EmptyLeaderboard />
          )
        )}

      </div>
    </main>
  );
};



const TopTeamCard = ({
  item,
  rank,
}) => {

  const teamName =
    item.team?.teamName ||
    item.teamName ||
    "Unknown Team";

  const projectTitle =
    item?.projectTitle?.trim() ||
    "Untitled Project";

  const score =
    item.score ?? 0;


  const rankStyle = {
    1: {
      box: "bg-amber-50 text-amber-600",
      badge: "bg-amber-50 text-amber-700",
      label: "1st Place",
    },

    2: {
      box: "bg-slate-100 text-slate-600",
      badge: "bg-slate-100 text-slate-600",
      label: "2nd Place",
    },

    3: {
      box: "bg-orange-50 text-orange-700",
      badge: "bg-orange-50 text-orange-700",
      label: "3rd Place",
    },
  };


  const style =
    rankStyle[rank] ||
    rankStyle[3];


  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.box}`}
        >
          {rank === 1 ? (
            <Trophy size={22} />
          ) : (
            <Medal size={22} />
          )}
        </div>


        <span
          className={`rounded-full px-3 py-1 text-xs font-black ${style.badge}`}
        >
          {style.label}
        </span>

      </div>


      <h3 className="mt-6 text-xl font-black text-slate-950">
        {teamName}
      </h3>


      <p className="mt-1 truncate text-sm text-slate-500">
        {projectTitle}
      </p>


      <div className="mt-6 flex items-end justify-between">

        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Score
        </p>


        <div>
          <span className="text-3xl font-black text-slate-950">
            {score}
          </span>

          <span className="ml-1 text-sm font-bold text-slate-400">
            /100
          </span>
        </div>

      </div>

    </article>
  );
};



const RankBadge = ({ rank }) => {

  if (rank === 1) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 font-black text-amber-600">
        1
      </div>
    );
  }


  if (rank === 2) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-600">
        2
      </div>
    );
  }


  if (rank === 3) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 font-black text-orange-700">
        3
      </div>
    );
  }


  return (
    <div className="flex h-9 w-9 items-center justify-center font-black text-slate-500">
      {rank}
    </div>
  );
};



const EmptyLeaderboard = () => {
  return (
    <div className="mt-10 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        <Trophy size={24} />
      </div>


      <h2 className="mt-5 text-lg font-black text-slate-950">
        Leaderboard is empty
      </h2>


      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Evaluated submissions will appear here
        once judges start scoring projects.
      </p>

    </div>
  );
};


export default Leaderboard;