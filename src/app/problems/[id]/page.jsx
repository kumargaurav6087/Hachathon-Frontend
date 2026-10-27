"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Heart,
  HeartHandshake,
  Layers,
  Lightbulb,
  LoaderCircle,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import { getProblemById, toggleUpvoteProblem, selectProblem } from "@/lib/problemApi";
import { getMyTeam } from "@/lib/teamApi";

const ProblemDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const problemId = params?.id;

  const [problem, setProblem] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [upvoting, setUpvoting] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      if (!problemId) return;

      try {
        setLoading(true);
        setError("");

        const res = await getProblemById(problemId);
        const prob = res.problem;
        setProblem(prob);
        setUpvotesCount(prob.upvotes?.length || 0);

        const storedUser = localStorage.getItem("hackon_user");
        if (storedUser) {
          try {
            const u = JSON.parse(storedUser);
            const currentUserId = u._id || u.id;
            const alreadyUpvoted = prob.upvotes?.some(
              (up) => (up._id || up).toString() === currentUserId?.toString()
            );
            setHasUpvoted(Boolean(alreadyUpvoted));
          } catch {
            // Ignore parse error
          }
        }

        try {
          const teamRes = await getMyTeam();
          if (teamRes?.team) {
            setTeam(teamRes.team);
          }
        } catch {
          // Ignore team fetch error if not logged in
        }
      } catch (err) {
        setError(err.message || "Failed to load challenge details.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [problemId]);

  const handleUpvote = async () => {
    try {
      setUpvoting(true);
      const res = await toggleUpvoteProblem(problemId);
      setHasUpvoted(res.upvoted);
      setUpvotesCount(res.upvotesCount);
    } catch (err) {
      setActionMessage(err.message || "Please login to upvote.");
    } finally {
      setUpvoting(false);
    }
  };

  const handleClaimChallenge = async () => {
    if (!team) {
      router.push("/teams");
      return;
    }

    try {
      setClaiming(true);
      setActionMessage("");
      await selectProblem(problemId, team._id);
      setActionMessage("Challenge selected by your team! You can now submit your solution proposal.");

      const refreshed = await getProblemById(problemId);
      setProblem(refreshed.problem);
    } catch (err) {
      setActionMessage(err.message || "Could not select challenge. Verify you are team leader.");
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        <Sidebar />
        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <LoaderCircle size={38} className="mx-auto animate-spin text-violet-600" />
              <p className="mt-4 text-sm font-semibold text-slate-500">Loading challenge details...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !problem) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        <Sidebar />
        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />
          <div className="mx-auto max-w-2xl px-4 py-16 text-center">
            <div className="rounded-3xl border border-red-100 bg-white p-8 shadow-sm">
              <AlertCircle size={32} className="mx-auto text-red-500" />
              <h2 className="mt-4 text-xl font-black text-slate-900">Challenge Not Found</h2>
              <p className="mt-2 text-sm text-slate-500">{error || "The requested problem statement does not exist."}</p>
              <Link
                href="/explore"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700"
              >
                <ArrowLeft size={16} />
                Explore All Challenges
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const isTeamSelected =
    team &&
    problem.selectedTeams?.some(
      (t) => (t._id || t).toString() === team._id.toString()
    );

  const statusColorMap = {
    submitted: "bg-amber-100 text-amber-800 border-amber-200",
    "under-review": "bg-blue-100 text-blue-800 border-blue-200",
    approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
    prototype: "bg-purple-100 text-purple-800 border-purple-200",
    implemented: "bg-violet-100 text-violet-800 border-violet-200",
    rejected: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Sidebar />
      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-violet-600"
          >
            <ArrowLeft size={16} />
            Back to Challenges
          </Link>

          {/* Action Notification */}
          {actionMessage && (
            <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-xs font-bold text-violet-800">
              {actionMessage}
            </div>
          )}

          {/* Main Card */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Top Bar with Badges */}
            <div className="border-b border-slate-100 bg-gradient-to-r from-violet-50/70 via-purple-50/30 to-slate-50/50 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-600 px-3.5 py-1 text-xs font-black text-white shadow-sm">
                    {problem.category}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${
                      statusColorMap[problem.status] || "bg-slate-100 text-slate-700"
                    }`}
                  >
                    Status: {problem.status || "Submitted"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize text-slate-600">
                    Difficulty: {problem.difficulty || "Medium"}
                  </span>
                </div>

                {/* Upvote Button */}
                <button
                  type="button"
                  onClick={handleUpvote}
                  disabled={upvoting}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-black transition active:scale-95 ${
                    hasUpvoted
                      ? "border-rose-300 bg-rose-50 text-rose-600 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-rose-200 hover:bg-rose-50/40 hover:text-rose-600"
                  }`}
                >
                  <Heart size={15} fill={hasUpvoted ? "currentColor" : "none"} />
                  <span>{upvotesCount} {upvotesCount === 1 ? "Upvote" : "Upvotes"}</span>
                </button>
              </div>

              <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {problem.title}
              </h1>

              {/* Meta row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-violet-600" />
                  {problem.location || "Community Wide"}
                </span>

                <span className="flex items-center gap-1.5">
                  <Users size={14} className="text-violet-600" />
                  Target: {problem.impactArea || "Local Citizens"}
                </span>

                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-violet-600" />
                  Reported by: {problem.createdBy?.name || "Community Member"} ({problem.submittedByRole || "Citizen"})
                </span>
              </div>
            </div>

            {/* Description Body */}
            <div className="p-6 sm:p-8">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400">
                Problem Description & Root Cause
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700 sm:text-base">
                {problem.description}
              </p>

              {/* Hackathon Binding Badge */}
              {problem.hackathon && (
                <div className="mt-8 flex items-center justify-between rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                  <div className="flex items-center gap-3">
                    <Trophy size={20} className="text-violet-600" />
                    <div>
                      <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">Associated Hackathon</p>
                      <p className="font-bold text-slate-900">{problem.hackathon.title}</p>
                    </div>
                  </div>

                  <Link
                    href={`/events/${problem.hackathon._id || problem.hackathon}`}
                    className="rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-violet-700 shadow-sm transition hover:bg-violet-100"
                  >
                    View Hackathon Details
                  </Link>
                </div>
              )}

              {/* Selected Teams Section */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Innovator Teams Collaborating on this Challenge ({problem.selectedTeams?.length || 0})
                </h3>

                {problem.selectedTeams && problem.selectedTeams.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {problem.selectedTeams.map((t, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800"
                      >
                        <ShieldCheck size={14} className="text-violet-600" />
                        {t.teamName || "Innovator Team"}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">
                    No team has officially claimed this challenge yet. Be the first team to tackle it!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/submit?problemId=${problem._id}${
                    problem.hackathon ? `&hackathonId=${problem.hackathon._id || problem.hackathon}` : ""
                  }`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition hover:from-violet-700 hover:to-purple-700 active:scale-95"
                >
                  <Rocket size={17} />
                  Submit Solution Proposal
                </Link>

                <button
                  type="button"
                  onClick={handleClaimChallenge}
                  disabled={claiming || isTeamSelected}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border py-3.5 text-sm font-bold transition active:scale-95 ${
                    isTeamSelected
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : "border-slate-200 bg-white text-slate-800 hover:border-violet-300 hover:bg-violet-50"
                  }`}
                >
                  {isTeamSelected ? (
                    <>
                      <Check size={17} className="text-emerald-600" />
                      Claimed by Your Team
                    </>
                  ) : claiming ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Claiming Challenge...
                    </>
                  ) : (
                    <>
                      <Lightbulb size={17} className="text-violet-600" />
                      Claim Challenge for My Team
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProblemDetailsPage;
