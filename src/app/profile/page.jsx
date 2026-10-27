"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Calendar,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  HeartHandshake,
  Layers,
  LoaderCircle,
  Lock,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  Trophy,
  User,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import { getUserProfile } from "@/lib/authApi";
import { getMyTeam } from "@/lib/teamApi";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("hackon_token");
        const storedUser = localStorage.getItem("hackon_user");

        if (!token) {
          router.replace("/auth");
          return;
        }

        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            // Ignore parse error
          }
        }

        try {
          const profileRes = await getUserProfile(token);
          if (profileRes?.user) {
            setUser(profileRes.user);
            localStorage.setItem("hackon_user", JSON.stringify(profileRes.user));
          }
        } catch (apiErr) {
          console.warn("Could not refresh profile from server, using cached user:", apiErr.message);
        }

        try {
          const teamRes = await getMyTeam();
          if (teamRes?.team) {
            setTeam(teamRes.team);
          }
        } catch (teamErr) {
          console.warn("Team info skipped:", teamErr.message);
        }
      } catch (err) {
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("hackon_token");
    localStorage.removeItem("hackon_user");
    router.replace("/auth");
  };

  const copyTeamCode = () => {
    if (!team?.teamCode) return;
    navigator.clipboard.writeText(team.teamCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        <Sidebar />
        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <LoaderCircle size={36} className="mx-auto animate-spin text-violet-600" />
              <p className="mt-4 text-sm font-semibold text-slate-500">Loading your profile...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Sidebar />
      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          {/* Header Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-3xl font-black text-white shadow-inner backdrop-blur-md">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                      {user?.name || "Participant"}
                    </h1>
                    <BadgeCheck size={22} className="text-violet-300" />
                  </div>
                  <p className="text-sm text-violet-200">{user?.email}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    <ShieldCheck size={13} />
                    {user?.role || "user"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Left 2 Cols: Personal & Account Details */}
            <div className="space-y-6 md:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <h2 className="text-lg font-black text-slate-900">Personal Information</h2>
                <p className="text-xs text-slate-500">Your registered platform details</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <User size={14} /> Full Name
                    </div>
                    <p className="mt-1 font-bold text-slate-900">{user?.name || "Not provided"}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <Mail size={14} /> Email Address
                    </div>
                    <p className="mt-1 font-bold text-slate-900 break-all">{user?.email || "Not provided"}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <GraduationCap size={14} /> College / Institution
                    </div>
                    <p className="mt-1 font-bold text-slate-900">{user?.college || "NexKripa Community Innovation"}</p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <Phone size={14} /> Contact Number
                    </div>
                    <p className="mt-1 font-bold text-slate-900">{user?.phone || "+91 (Verified)"}</p>
                  </div>
                </div>
              </div>

              {/* Social Innovation Role & Impact Card */}
              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/70 to-purple-50/40 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md">
                    <HeartHandshake size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900">Community Social Innovator</h3>
                    <p className="text-xs text-slate-500">NexKripa Hackathon Network Member</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  You are registered to report community challenges, collaborate with multidisciplinary teams,
                  and submit technology-driven solutions for social impact.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/problems/new"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700"
                  >
                    Raise a Social Problem
                  </Link>
                  <Link
                    href="/explore"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3.5 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-50"
                  >
                    Explore Challenges
                  </Link>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Team & Quick Actions */}
            <div className="space-y-6">
              {/* Team Status Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-slate-900">My Team</h3>
                  <Users size={18} className="text-violet-600" />
                </div>

                {team ? (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-violet-50 p-3.5">
                      <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">Team Name</p>
                      <p className="mt-0.5 text-base font-black text-slate-900">{team.teamName}</p>
                      <p className="text-xs text-slate-500">{team.members?.length || 1} / {team.maxMembers || 4} Members</p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Code</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="font-mono text-base font-black text-violet-700">{team.teamCode}</span>
                        <button
                          type="button"
                          onClick={copyTeamCode}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm transition hover:text-violet-700"
                          title="Copy Code"
                        >
                          {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <Link
                      href="/teams"
                      className="block text-center rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700"
                    >
                      Manage Team
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4 text-center">
                    <p className="text-xs text-slate-500">You haven&apos;t created or joined a team yet.</p>
                    <Link
                      href="/teams"
                      className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700"
                    >
                      Create or Join Team
                    </Link>
                  </div>
                )}
              </div>

              {/* Navigation Shortcuts */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-black text-slate-900">Quick Navigation</h3>
                <div className="mt-3 space-y-1.5 text-sm font-semibold">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-violet-700"
                  >
                    <span>Dashboard</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </Link>
                  <Link
                    href="/submit"
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-violet-700"
                  >
                    <span>Submit Solution</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </Link>
                  <Link
                    href="/certificates"
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-violet-700"
                  >
                    <span>My Certificates</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </Link>
                  <Link
                    href="/leaderboard"
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-slate-600 transition hover:bg-slate-50 hover:text-violet-700"
                  >
                    <span>Leaderboard</span>
                    <ExternalLink size={14} className="text-slate-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;