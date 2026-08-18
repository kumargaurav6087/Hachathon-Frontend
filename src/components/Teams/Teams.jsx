"use client";

import { useEffect, useState } from "react";

import {
  Check,
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
  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [copied, setCopied] = useState(false);

  // ==========================================
  // LOAD TEAM
  // ==========================================

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

  // ==========================================
  // CREATE TEAM
  // ==========================================

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

  // ==========================================
  // JOIN TEAM
  // ==========================================

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

  // ==========================================
  // COPY TEAM CODE
  // ==========================================

  const copyTeamCode = async () => {
    if (!team?.teamCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        team.teamCode
      );

      setCopied(true);

      setSuccess("Team code copied.");
      setError("");

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setError(
        "Team code copy nahi hua."
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-[#1769c2]"
                />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-500">
                Loading team...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* ==================================
              PAGE HEADER
          =================================== */}

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eef8ff] px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#1769c2] sm:text-xs">
                <Users size={15} />
                Team Workspace
              </div>

              <h1 className="mt-4 text-[32px] font-black leading-tight tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[42px]">
                Team Management
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                Create a team, join using a team code,
                manage your members and register for
                hackathons together.
              </p>
            </div>

            <button
              type="button"
              onClick={loadTeam}
              className="
                inline-flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                font-bold
                text-slate-700
                shadow-sm
                transition-all
                active:scale-[0.97]
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-[#1769c2]

                sm:w-auto
              "
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
          </div>

          {/* ==================================
              ALERTS
          =================================== */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-semibold leading-6 text-red-600 sm:px-5 sm:py-4">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3.5 text-sm font-semibold text-emerald-700 sm:px-5 sm:py-4">
              <Check
                size={18}
                className="mt-0.5 shrink-0"
              />

              <span>{success}</span>
            </div>
          )}

          {/* ==================================
              HAS TEAM
          =================================== */}

          {team ? (
            <MyTeam
              team={team}
              copyTeamCode={copyTeamCode}
              copied={copied}
            />
          ) : (
            /* ==================================
                NO TEAM
            =================================== */

            <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
              {/* ==============================
                  CREATE TEAM
              =============================== */}

              <section
                className="
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]

                  sm:p-7
                "
              >
                {/* decoration */}
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-blue-100/70 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#1769c2]">
                    <Plus size={22} />
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-[#1769c2]">
                    Start your squad
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
                    Create a new team
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create your own team and invite
                    participants using the generated
                    team code.
                  </p>

                  <form
                    onSubmit={handleCreateTeam}
                    className="mt-7 space-y-5"
                  >
                    {/* Team name */}
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
                        className="
                          mt-2
                          h-12
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          text-sm
                          font-medium
                          text-slate-900
                          outline-none
                          transition
                          placeholder:font-normal
                          placeholder:text-slate-400
                          focus:border-blue-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-50
                        "
                      />
                    </div>

                    {/* Members */}
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
                        className="
                          mt-2
                          h-12
                          w-full
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50
                          px-4
                          text-sm
                          font-medium
                          text-slate-900
                          outline-none
                          transition
                          focus:border-blue-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-blue-50
                        "
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
                      className="
                        inline-flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-[#1769c2]
                        px-5
                        text-sm
                        font-bold
                        text-white
                        shadow-[0_7px_20px_rgba(23,105,194,0.24)]
                        transition-all
                        active:scale-[0.97]
                        hover:bg-[#125aa7]
                        hover:shadow-lg
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
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
                </div>
              </section>

              {/* ==============================
                  JOIN TEAM
              =============================== */}

              <section
                className="
                  relative
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-slate-200
                  bg-white
                  p-5
                  shadow-[0_8px_30px_rgba(15,23,42,0.05)]

                  sm:p-7
                "
              >
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-violet-100/70 blur-3xl" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                    <UserPlus size={22} />
                  </div>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.14em] text-violet-600">
                    Join friends
                  </p>

                  <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
                    Join an existing team
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Ask the team leader for their
                    unique team code and enter it
                    below.
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
                      className="
                        mt-2
                        h-12
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        text-center
                        text-lg
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-slate-900
                        outline-none
                        transition
                        placeholder:text-slate-300
                        focus:border-violet-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-violet-50
                      "
                    />

                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="
                        mt-5
                        inline-flex
                        h-12
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-slate-950
                        px-5
                        text-sm
                        font-bold
                        text-white
                        shadow-sm
                        transition-all
                        active:scale-[0.97]
                        hover:bg-violet-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
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
                </div>
              </section>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

// ==========================================
// MY TEAM
// ==========================================

const MyTeam = ({
  team,
  copyTeamCode,
  copied,
}) => {
  const leaderId =
    typeof team.leader === "object"
      ? team.leader?._id
      : team.leader;

  return (
    <div className="mt-8 space-y-5 sm:space-y-6">
      {/* ==================================
          TEAM HERO
      =================================== */}

      <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#eef8ff] via-white to-[#ecfdff] p-5 sm:p-8">
          {/* Decoration */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-200/40 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#1769c2] shadow-sm sm:text-xs">
                <ShieldCheck size={14} />
                Active Team
              </div>

              <h2 className="mt-4 break-words text-[28px] font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-3xl lg:text-4xl">
                {team.teamName}
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {team.members?.length || 0} /{" "}
                {team.maxMembers || 4} members
              </p>
            </div>

            {/* Team Code */}
            <div className="w-full rounded-[20px] border border-slate-200 bg-white/95 p-4 shadow-sm lg:w-auto lg:min-w-[220px]">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 sm:text-xs">
                Team Code
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="truncate text-lg font-black tracking-[0.14em] text-slate-950 sm:text-xl">
                  {team.teamCode}
                </span>

                <button
                  type="button"
                  onClick={copyTeamCode}
                  className={`
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    active:scale-90

                    ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-blue-50 text-[#1769c2] hover:bg-[#1769c2] hover:text-white"
                    }
                  `}
                  aria-label="Copy team code"
                >
                  {copied ? (
                    <Check size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-[10px] leading-4 text-slate-400">
                Share this code to invite members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================
          MEMBERS
      =================================== */}

      <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2]">
              <Users size={18} />
            </span>

            <div>
              <h3 className="text-lg font-black text-slate-950">
                Team Members
              </h3>

              <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                Participants currently in your team.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6 lg:grid-cols-3">
          {(team.members || []).map(
            (member) => {
              const memberId =
                member?._id?.toString();

              const normalizedLeaderId =
                leaderId?.toString();

              const isLeader =
                memberId ===
                normalizedLeaderId;

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
                  className={`
                    relative
                    overflow-hidden
                    rounded-[20px]
                    border
                    p-4
                    transition-all
                    duration-200
                    active:scale-[0.99]

                    ${
                      isLeader
                        ? "border-amber-200 bg-amber-50/40"
                        : "border-slate-200 bg-slate-50/60"
                    }

                    sm:hover:-translate-y-1
                    sm:hover:shadow-md
                  `}
                >
                  {isLeader && (
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <Crown size={14} />
                    </span>
                  )}

                  <div className="flex items-center gap-3 pr-7">
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-xs
                        font-black
                        text-white

                        ${
                          isLeader
                            ? "bg-amber-500"
                            : "bg-[#1769c2]"
                        }
                      `}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-black text-slate-900">
                        {member.name ||
                          "Participant"}
                      </h4>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {member.email ||
                          "No email"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200/70 pt-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider sm:text-[10px] ${
                        isLeader
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {isLeader
                        ? "Leader"
                        : "Member"}
                    </span>

                    <span className="max-w-[120px] truncate text-[10px] font-semibold text-slate-400 sm:text-xs">
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

      {/* ==================================
          READY NOTICE
      =================================== */}

      <section className="rounded-[24px] border border-[#d9effb] bg-gradient-to-br from-[#f4fbff] to-white p-5 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1769c2] shadow-sm">
            <Users size={19} />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2]">
              Next Step
            </p>

            <h3 className="mt-1 text-base font-black text-slate-950 sm:text-lg">
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