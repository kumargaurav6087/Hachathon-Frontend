"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Edit3,
  Globe2,
  LoaderCircle,
  Save,
  Share2,
  Trophy,
  Users,
  X,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import {
  getSingleHackathon,
  registerTeamInHackathon,
  updateHackathon,
} from "@/lib/hackathonApi";

import { getMyTeam } from "@/lib/teamApi";

const EventDetails = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [team, setTeam] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  const [error, setError] = useState("");

  const [registerMessage, setRegisterMessage] =
    useState("");

  const [registerType, setRegisterType] =
    useState("");

  // ==========================================
  // EDIT STATE
  // ==========================================

  const [editOpen, setEditOpen] = useState(false);

  const [editLoading, setEditLoading] =
    useState(false);

  const [editError, setEditError] = useState("");
  const [editSuccess, setEditSuccess] =
    useState("");

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    location: "",
    maxTeamSize: 4,
    status: "upcoming",
  });

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const hackathonResponse =
          await getSingleHackathon(eventId);

        const hackathon =
          hackathonResponse.hackathon;

        setEvent(hackathon);

        const userString =
          localStorage.getItem("hackon_user");

        if (userString) {
          try {
            setCurrentUser(
              JSON.parse(userString)
            );
          } catch {
            setCurrentUser(null);
          }
        }

        const token =
          localStorage.getItem("hackon_token");

        if (token) {
          try {
            const teamResponse =
              await getMyTeam();

            setTeam(
              teamResponse.team || null
            );
          } catch (teamError) {
            console.log(
              "Team load skipped:",
              teamError.message
            );
          }
        }
      } catch (error) {
        setError(
          error.message ||
            "Hackathon details load nahi hui."
        );
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      loadData();
    }
  }, [eventId]);

  // ==========================================
  // BODY SCROLL WHEN EDIT MODAL OPEN
  // ==========================================

  useEffect(() => {
    if (!editOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [editOpen]);

  // ==========================================
  // SHARE
  // ==========================================

  const handleShare = async () => {
    if (!event) return;

    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.log(
        "Share cancelled:",
        error
      );
    }
  };

  // ==========================================
  // REGISTER TEAM
  // ==========================================

  const handleRegister = async () => {
    try {
      setRegistering(true);
      setRegisterMessage("");
      setRegisterType("");

      const token =
        localStorage.getItem(
          "hackon_token"
        );

      if (!token) {
        setRegisterMessage(
          "Pehle login karo."
        );

        setRegisterType("error");
        return;
      }

      if (!team) {
        setRegisterMessage(
          "Hackathon register karne se pehle team create ya join karo."
        );

        setRegisterType("error");
        return;
      }

      const storedUser = JSON.parse(
        localStorage.getItem(
          "hackon_user"
        ) || "{}"
      );

      const leaderId =
        typeof team.leader === "object"
          ? team.leader?._id
          : team.leader;

      const currentUserId =
        storedUser._id ||
        storedUser.id;

      /*
        IMPORTANT:
        MongoDB IDs ko string me compare karna
      */
      if (
        leaderId?.toString() !==
        currentUserId?.toString()
      ) {
        setRegisterMessage(
          "Sirf team leader hackathon me team register kar sakta hai."
        );

        setRegisterType("error");
        return;
      }

      const response =
        await registerTeamInHackathon(
          event._id,
          team._id
        );

      setRegisterMessage(
        response.message ||
          "Team successfully registered."
      );

      setRegisterType("success");

      if (response.hackathon) {
        setEvent(response.hackathon);
      }
    } catch (error) {
      setRegisterMessage(
        error.message ||
          "Registration failed."
      );

      setRegisterType("error");
    } finally {
      setRegistering(false);
    }
  };

  // ==========================================
  // OPEN EDIT
  // ==========================================

  const openEditModal = () => {
    setEditError("");
    setEditSuccess("");

    setEditForm({
      title: event.title || "",
      description:
        event.description || "",

      startDate:
        formatForInput(
          event.startDate
        ),

      endDate:
        formatForInput(
          event.endDate
        ),

      registrationDeadline:
        formatForInput(
          event.registrationDeadline
        ),

      location:
        event.location || "",

      maxTeamSize:
        event.maxTeamSize || 4,

      status:
        event.status ||
        "upcoming",
    });

    setEditOpen(true);
  };

  // ==========================================
  // UPDATE
  // ==========================================

  const handleUpdate = async (
    eventObject
  ) => {
    eventObject.preventDefault();

    try {
      setEditLoading(true);
      setEditError("");
      setEditSuccess("");

      const response =
        await updateHackathon(
          event._id,
          {
            title:
              editForm.title.trim(),

            description:
              editForm.description.trim(),

            startDate:
              editForm.startDate,

            endDate:
              editForm.endDate,

            registrationDeadline:
              editForm.registrationDeadline,

            location:
              editForm.location.trim(),

            maxTeamSize:
              Number(
                editForm.maxTeamSize
              ),

            status:
              editForm.status,
          }
        );

      setEvent(
        response.hackathon
      );

      setEditSuccess(
        response.message ||
          "Hackathon updated successfully."
      );

      setTimeout(() => {
        setEditOpen(false);
      }, 700);
    } catch (error) {
      setEditError(
        error.message ||
          "Hackathon update nahi hua."
      );
    } finally {
      setEditLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb]">
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
                Loading hackathon...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !event) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="rounded-[24px] border border-red-100 bg-white p-6 text-center shadow-sm sm:p-8">
              <h2 className="text-xl font-black text-slate-950">
                Hackathon load nahi hua
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-600">
                {error ||
                  "Hackathon not found."}
              </p>

              <Link
                href="/explore"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1769c2] px-5 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-[#125aa7]"
              >
                <ArrowLeft size={16} />
                Back to Explore
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // DERIVED VALUES
  // ==========================================

  const formattedDeadline =
    event.registrationDeadline
      ? new Date(
          event.registrationDeadline
        ).toLocaleDateString(
          "en-IN",
          {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "No deadline";

  const formattedStartDate =
    event.startDate
      ? new Date(
          event.startDate
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "-";

  const formattedEndDate =
    event.endDate
      ? new Date(
          event.endDate
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "-";

  const isRegistered =
    team &&
    event.registeredTeams?.some(
      (registeredTeam) => {
        const id =
          typeof registeredTeam ===
          "object"
            ? registeredTeam._id
            : registeredTeam;

        return (
          id?.toString() ===
          team._id?.toString()
        );
      }
    );

  const eventMode =
    event.location || "Online";

  const normalizedStatus =
    event.status?.toLowerCase() ||
    "upcoming";

  const statusClass =
    normalizedStatus === "ongoing"
      ? "bg-emerald-100 text-emerald-700"
      : normalizedStatus ===
          "completed"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-100 text-blue-700";

  const isCompleted =
    normalizedStatus === "completed";

  const isAdmin =
    currentUser?.role === "admin";

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="relative">
          {/* ==================================
              HERO BANNER
          =================================== */}

          <div className="relative h-[240px] overflow-hidden bg-[linear-gradient(110deg,#071f4a,#0d46a0,#127cab)] sm:h-[320px] lg:h-[390px]">
            {/* Background effects */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo-300/15 blur-3xl" />

            {/* Back */}
            <div className="mx-auto w-full max-w-[1120px] px-4 pt-6 sm:px-6 sm:pt-8 lg:px-10 lg:pt-9">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md transition active:scale-95 hover:bg-white/20 sm:px-4 sm:text-sm"
              >
                <ArrowLeft size={16} />
                Back to Explore
              </Link>
            </div>
          </div>

          {/* ==================================
              MAIN EVENT CARD
          =================================== */}

          <div className="relative z-10 mx-auto -mt-16 max-w-[1040px] px-4 pb-16 sm:-mt-20 sm:px-6 sm:pb-20 lg:-mt-24 lg:px-7">
            <div className="overflow-hidden rounded-[24px] border border-white/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.13)] sm:rounded-[30px] lg:shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
              <div className="grid lg:grid-cols-[minmax(0,1fr)_320px]">
                {/* ==================================
                    LEFT CONTENT
                =================================== */}

                <div className="min-w-0 p-5 sm:p-8 lg:p-10">
                  {/* Event heading */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-xl font-black text-[#1769c2] shadow-sm sm:h-16 sm:w-16 sm:text-2xl">
                      H
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="min-w-0">
                          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#1769c2] sm:text-xs">
                            HackOn
                          </p>

                          <h1 className="mt-2 max-w-[570px] break-words text-[28px] font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-[42px]">
                            {event.title}
                          </h1>
                        </div>

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={
                              openEditModal
                            }
                            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-slate-950 px-4 text-sm font-bold text-white shadow-sm transition active:scale-95 hover:bg-[#1769c2]"
                          >
                            <Edit3
                              size={16}
                            />
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ==================================
                      BADGES
                  =================================== */}

                  <div className="mt-6 flex flex-wrap gap-2 sm:mt-7">
                    <span className="rounded-full bg-[#1769c2] px-3 py-1.5 text-[10px] font-bold text-white sm:px-4 sm:py-2 sm:text-xs">
                      Hackathon
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-700 sm:px-4 sm:py-2 sm:text-xs">
                      <Globe2
                        size={13}
                      />
                      {eventMode}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold text-emerald-700 sm:px-4 sm:py-2 sm:text-xs">
                      Team Registration
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10px] font-bold capitalize sm:px-4 sm:py-2 sm:text-xs ${statusClass}`}
                    >
                      {normalizedStatus}
                    </span>
                  </div>

                  {/* ==================================
                      DESCRIPTION
                  =================================== */}

                  <div className="mt-8 sm:mt-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#1769c2] sm:text-xs">
                      Overview
                    </p>

                    <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950 sm:text-2xl">
                      About this opportunity
                    </h2>

                    <p className="mt-3 max-w-[640px] whitespace-pre-line break-words text-sm leading-7 text-slate-500 sm:text-[15px]">
                      {event.description ||
                        "No description available for this hackathon."}
                    </p>
                  </div>

                  {/* ==================================
                      EVENT SCHEDULE
                  =================================== */}

                  <div className="mt-8 sm:mt-9">
                    <h3 className="text-sm font-black text-slate-800">
                      Event Schedule
                    </h3>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <InfoBox
                        label="Starts"
                        value={
                          formattedStartDate
                        }
                      />

                      <InfoBox
                        label="Ends"
                        value={
                          formattedEndDate
                        }
                      />
                    </div>
                  </div>

                  {/* ==================================
                      TEAM
                  =================================== */}

                  {team && (
                    <div className="mt-8 overflow-hidden rounded-[22px] border border-blue-100 bg-gradient-to-br from-blue-50/80 to-cyan-50/50 p-4 sm:mt-9 sm:p-5">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1769c2] sm:text-xs">
                          Your Team
                        </p>

                        {isRegistered && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-700">
                            <Check size={11} />
                            Registered
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="min-w-0">
                          <h3 className="truncate font-black text-slate-950">
                            {team.teamName}
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {team.members?.length ||
                              0}{" "}
                            /{" "}
                            {team.maxMembers ||
                              4}{" "}
                            members
                          </p>
                        </div>

                        {team.teamCode && (
                          <span className="self-start rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 sm:self-auto">
                            Code:{" "}
                            <span className="text-[#1769c2]">
                              {team.teamCode}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* ==================================
                    RIGHT SIDEBAR
                =================================== */}

                <aside className="border-t border-slate-200 bg-slate-50/80 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                  <div className="lg:sticky lg:top-[100px]">
                    {/* Participant register */}
                    {!isAdmin && (
                      <>
                        <button
                          type="button"
                          onClick={
                            handleRegister
                          }
                          disabled={
                            registering ||
                            isRegistered ||
                            isCompleted
                          }
                          className={`
                            flex
                            min-h-[52px]
                            w-full
                            items-center
                            justify-center
                            rounded-2xl
                            px-5
                            py-4
                            text-sm
                            font-bold
                            text-white
                            shadow-[0_8px_22px_rgba(23,105,194,0.24)]
                            transition-all
                            active:scale-[0.97]
                            disabled:cursor-not-allowed
                            disabled:opacity-70

                            ${
                              isRegistered
                                ? "bg-emerald-600"
                                : isCompleted
                                ? "bg-slate-500"
                                : "bg-[#1769c2] hover:-translate-y-0.5 hover:bg-[#1058aa]"
                            }
                          `}
                        >
                          {registering ? (
                            <span className="flex items-center gap-2">
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />

                              Registering...
                            </span>
                          ) : isRegistered ? (
                            <span className="flex items-center gap-2">
                              <Check
                                size={17}
                              />

                              Team Registered
                            </span>
                          ) : isCompleted ? (
                            "Hackathon Completed"
                          ) : (
                            "Register Team"
                          )}
                        </button>

                        {registerMessage && (
                          <div
                            className={`mt-4 rounded-2xl border px-3.5 py-3 text-xs font-semibold leading-5 ${
                              registerType ===
                              "success"
                                ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                                : "border-red-100 bg-red-50 text-red-600"
                            }`}
                          >
                            {registerMessage}
                          </div>
                        )}

                        {!team && (
                          <Link
                            href="/teams"
                            className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-bold text-[#1769c2] transition active:scale-[0.97] hover:bg-blue-100"
                          >
                            Create / Join Team
                          </Link>
                        )}
                      </>
                    )}

                    {/* Admin */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={
                          openEditModal
                        }
                        className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-sm transition active:scale-[0.97] hover:bg-[#1769c2]"
                      >
                        <Edit3
                          size={17}
                        />
                        Edit Hackathon
                      </button>
                    )}

                    {/* ==================================
                        SAVE + SHARE
                    =================================== */}

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setSaved(
                            (current) =>
                              !current
                          )
                        }
                        className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition-all active:scale-95 ${
                          saved
                            ? "border-[#1769c2] bg-[#1769c2] text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
                        }`}
                      >
                        {saved ? (
                          <Check
                            size={16}
                          />
                        ) : (
                          <Bookmark
                            size={16}
                          />
                        )}

                        {saved
                          ? "Saved"
                          : "Save"}
                      </button>

                      <button
                        type="button"
                        onClick={
                          handleShare
                        }
                        className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-600 transition-all active:scale-95 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
                      >
                        {copied ? (
                          <Copy
                            size={16}
                          />
                        ) : (
                          <Share2
                            size={16}
                          />
                        )}

                        {copied
                          ? "Copied"
                          : "Share"}
                      </button>
                    </div>

                    {/* ==================================
                        DETAILS
                    =================================== */}

                    <div className="mt-7 rounded-[22px] border border-slate-200 bg-white p-4 sm:mt-8 sm:p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                        Opportunity Details
                      </p>

                      <div className="mt-5 space-y-5">
                        <DetailItem
                          icon={Clock3}
                          label="Registration Deadline"
                          value={
                            formattedDeadline
                          }
                          iconClass="bg-red-50 text-red-500"
                        />

                        <DetailItem
                          icon={Users}
                          label="Registered Teams"
                          value={`${
                            event
                              .registeredTeams
                              ?.length ||
                            0
                          } teams`}
                          iconClass="bg-emerald-50 text-emerald-600"
                        />

                        <DetailItem
                          icon={Users}
                          label="Maximum Team Size"
                          value={`${
                            event.maxTeamSize ||
                            4
                          } members`}
                          iconClass="bg-blue-50 text-blue-600"
                        />

                        <DetailItem
                          icon={
                            CalendarDays
                          }
                          label="Event Mode"
                          value={
                            eventMode
                          }
                          iconClass="bg-orange-50 text-orange-600"
                        />

                        <DetailItem
                          icon={Trophy}
                          label="Status"
                          value={
                            normalizedStatus
                          }
                          iconClass="bg-violet-50 text-violet-600"
                        />
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ==========================================
          EDIT MODAL
      ========================================== */}

      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          {/* Overlay close */}
          <button
            type="button"
            onClick={() =>
              setEditOpen(false)
            }
            className="absolute inset-0"
            aria-label="Close edit modal"
          />

          <section className="relative z-10 mt-auto max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:my-auto sm:rounded-[28px]">
            {/* Mobile handle */}
            <div className="flex justify-center pt-3 sm:hidden">
              <span className="h-1.5 w-12 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-6 sm:py-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1769c2]">
                  Admin Control
                </p>

                <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-slate-950">
                  Edit Hackathon
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition active:scale-90 hover:bg-red-50 hover:text-red-600"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={
                handleUpdate
              }
              className="space-y-5 p-5 pb-8 sm:p-6"
            >
              <InputField
                label="Title"
                value={
                  editForm.title
                }
                onChange={(value) =>
                  setEditForm({
                    ...editForm,
                    title: value,
                  })
                }
              />

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Description
                </label>

                <textarea
                  rows={5}
                  value={
                    editForm.description
                  }
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      description:
                        event.target.value,
                    })
                  }
                  className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Start Date"
                  type="date"
                  value={
                    editForm.startDate
                  }
                  onChange={(value) =>
                    setEditForm({
                      ...editForm,
                      startDate:
                        value,
                    })
                  }
                />

                <InputField
                  label="End Date"
                  type="date"
                  value={
                    editForm.endDate
                  }
                  onChange={(value) =>
                    setEditForm({
                      ...editForm,
                      endDate: value,
                    })
                  }
                />
              </div>

              <InputField
                label="Registration Deadline"
                type="date"
                value={
                  editForm.registrationDeadline
                }
                onChange={(value) =>
                  setEditForm({
                    ...editForm,
                    registrationDeadline:
                      value,
                  })
                }
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  label="Location"
                  value={
                    editForm.location
                  }
                  onChange={(value) =>
                    setEditForm({
                      ...editForm,
                      location:
                        value,
                    })
                  }
                />

                <InputField
                  label="Max Team Size"
                  type="number"
                  min="1"
                  value={
                    editForm.maxTeamSize
                  }
                  onChange={(value) =>
                    setEditForm({
                      ...editForm,
                      maxTeamSize:
                        value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700">
                  Status
                </label>

                <select
                  value={
                    editForm.status
                  }
                  onChange={(event) =>
                    setEditForm({
                      ...editForm,
                      status:
                        event.target.value,
                    })
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="upcoming">
                    Upcoming
                  </option>

                  <option value="ongoing">
                    Ongoing
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </div>

              {editError && (
                <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {editError}
                </div>
              )}

              {editSuccess && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {editSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  editLoading
                }
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-bold text-white shadow-sm transition active:scale-[0.98] hover:bg-[#1769c2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {editLoading ? (
                  <>
                    <LoaderCircle
                      size={17}
                      className="animate-spin"
                    />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save
                      size={17}
                    />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

// ==========================================
// HELPERS
// ==========================================

const formatForInput = (date) => {
  if (!date) {
    return "";
  }

  const parsed = new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  return parsed
    .toISOString()
    .split("T")[0];
};

// ==========================================
// INPUT FIELD
// ==========================================

const InputField = ({
  label,
  value,
  onChange,
  type = "text",
  min,
}) => {
  return (
    <div>
      <label className="text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        min={min}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="mt-2 h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </div>
  );
};

// ==========================================
// INFO BOX
// ==========================================

const InfoBox = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50/80 p-4 transition hover:border-blue-100 hover:bg-blue-50/40">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 sm:text-xs">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-black text-slate-900">
        {value}
      </p>
    </div>
  );
};

// ==========================================
// DETAIL ITEM
// ==========================================

const DetailItem = ({
  icon: Icon,
  label,
  value,
  iconClass,
}) => {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        <Icon
          size={17}
          strokeWidth={2}
        />
      </span>

      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-xs">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold capitalize text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;