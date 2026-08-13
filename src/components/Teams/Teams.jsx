"use client";

import { useEffect, useState } from "react";

import {
  Copy,
  Crown,
  LoaderCircle,
  LogIn,
  Plus,
  RefreshCcw,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import {
  createTeam,
  getMyTeam,
  joinTeam,
} from "@/lib/teamApi";

const Teams = () => {
  const [team, setTeam] = useState(null);

  const [teamName, setTeamName] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);

  const [teamCode, setTeamCode] = useState("");

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadTeam = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyTeam();

      setTeam(response.team || null);
    } catch (error) {
      setError(
        error.message ||
          "Team details load nahi hui."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleCreateTeam = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      if (!teamName.trim()) {
        setError("Team name required hai.");
        return;
      }

      const response = await createTeam({
        teamName: teamName.trim(),
        maxMembers: Number(maxMembers),
      });

      setTeam(response.team);

      setSuccess(
        response.message ||
          "Team successfully create ho gayi."
      );

      setTeamName("");
    } catch (error) {
      setError(
        error.message ||
          "Team create nahi hui."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleJoinTeam = async (event) => {
    event.preventDefault();

    try {
      setActionLoading(true);
      setError("");
      setSuccess("");

      if (!teamCode.trim()) {
        setError("Team code required hai.");
        return;
      }

      const response = await joinTeam(
        teamCode.trim()
      );

      setTeam(response.team);

      setSuccess(
        response.message ||
          "Team successfully join ho gayi."
      );

      setTeamCode("");
    } catch (error) {
      setError(
        error.message ||
          "Team join nahi hui."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const copyTeamCode = async () => {
    if (!team?.teamCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        team.teamCode
      );

      setSuccess(
        "Team code copied."
      );

      setError("");
    } catch {
      setError(
        "Team code copy nahi hua."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Sidebar />

        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <LoaderCircle
                size={38}
                className="mx-auto animate-spin text-[#1769c2]"
              />

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading team...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="mx-auto max-w-[1200px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eef8ff] px-3.5 py-2 text-xs font-bold text-[#1769c2]">
                <Users size={15} />
                Team workspace
              </div>

              <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Team Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Create a team, join using a team code,
                manage your members and register for
                hackathons together.
              </p>
            </div>

            <button
              type="button"
              onClick={loadTeam}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
              {success}
            </div>
          )}

          {team ? (
            <MyTeam
              team={team}
              copyTeamCode={copyTeamCode}
            />
          ) : (
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Create Team */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1769c2]">
                  <Plus size={22} />
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-950">
                  Create a new team
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create your own team and invite participants
                  using the generated team code.
                </p>

                <form
                  onSubmit={handleCreateTeam}
                  className="mt-7 space-y-5"
                >
                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Team Name
                    </label>

                    <input
                      type="text"
                      value={teamName}
                      onChange={(event) =>
                        setTeamName(
                          event.target.value
                        )
                      }
                      placeholder="e.g. CodeCrafters"
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">
                      Maximum Members
                    </label>

                    <select
                      value={maxMembers}
                      onChange={(event) =>
                        setMaxMembers(
                          event.target.value
                        )
                      }
                      className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    >
                      <option value={2}>
                        2 members
                      </option>

                      <option value={3}>
                        3 members
                      </option>

                      <option value={4}>
                        4 members
                      </option>

                      <option value={5}>
                        5 members
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-5 text-sm font-bold text-white transition hover:bg-[#125aa7] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading ? (
                      <>
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus size={17} />
                        Create Team
                      </>
                    )}
                  </button>
                </form>
              </section>

              {/* Join Team */}
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                  <UserPlus size={22} />
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-950">
                  Join an existing team
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ask the team leader for their unique team
                  code and enter it below.
                </p>

                <form
                  onSubmit={handleJoinTeam}
                  className="mt-7"
                >
                  <label className="text-sm font-bold text-slate-700">
                    Team Code
                  </label>

                  <input
                    type="text"
                    value={teamCode}
                    onChange={(event) =>
                      setTeamCode(
                        event.target.value
                          .toUpperCase()
                      )
                    }
                    maxLength={6}
                    placeholder="ABC123"
                    className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-lg font-black uppercase tracking-[0.2em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
                  />

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading ? (
                      <>
                        <LoaderCircle
                          size={17}
                          className="animate-spin"
                        />
                        Joining...
                      </>
                    ) : (
                      <>
                        <LogIn size={17} />
                        Join Team
                      </>
                    )}
                  </button>
                </form>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

const MyTeam = ({
  team,
  copyTeamCode,
}) => {
  const leaderId =
    typeof team.leader === "object"
      ? team.leader?._id
      : team.leader;

  return (
    <div className="mt-8 space-y-6">
      {/* Team hero */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative overflow-hidden bg-[linear-gradient(135deg,#eef8ff,#ffffff,#ecfdff)] p-6 sm:p-8">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-200/30 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-[#1769c2]">
                <ShieldCheck size={14} />
                Active Team
              </div>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] text-slate-950">
                {team.teamName}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {team.members?.length || 0} /{" "}
                {team.maxMembers || 4} members
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Team Code
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl font-black tracking-[0.15em] text-slate-950">
                  {team.teamCode}
                </span>

                <button
                  type="button"
                  onClick={copyTeamCode}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#1769c2] transition hover:bg-blue-100"
                  aria-label="Copy team code"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
          <h3 className="text-lg font-black text-slate-950">
            Team Members
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Participants currently in your team.
          </p>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          {(team.members || []).map(
            (member) => {
              const isLeader =
                member._id === leaderId;

              const initials =
                member.name
                  ?.split(" ")
                  .filter(Boolean)
                  .map((word) =>
                    word.charAt(0)
                  )
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "U";

              return (
                <article
                  key={member._id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1769c2] text-xs font-black text-white">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="truncate text-sm font-black text-slate-900">
                          {member.name}
                        </h4>

                        {isLeader && (
                          <Crown
                            size={15}
                            className="shrink-0 text-amber-500"
                          />
                        )}
                      </div>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                        isLeader
                          ? "bg-amber-50 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {isLeader
                        ? "Leader"
                        : "Member"}
                    </span>

                    <span className="max-w-28 truncate text-xs font-semibold text-slate-400">
                      {member.college ||
                        "Participant"}
                    </span>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </section>

      {/* Registration notice */}
      <section className="rounded-3xl border border-[#d9effb] bg-[#f4fbff] p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1769c2] shadow-sm">
            <Users size={19} />
          </div>

          <div>
            <h3 className="text-base font-black text-slate-950">
              Ready for a hackathon?
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Team leader can now go to Explore
              and register this team in an
              available hackathon.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Teams;