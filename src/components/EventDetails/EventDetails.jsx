"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  Copy,
  Edit3,
  Globe2,
  LoaderCircle,
  Save,
  Share2,
  Trophy,
  Users,
  X,
  Clock3,
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

  const [currentUser, setCurrentUser] =
    useState(null);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] =
    useState(false);

  const [error, setError] = useState("");

  const [registerMessage, setRegisterMessage] =
    useState("");

  const [registerType, setRegisterType] =
    useState("");

  // Edit
  const [editOpen, setEditOpen] =
    useState(false);

  const [editLoading, setEditLoading] =
    useState(false);

  const [editError, setEditError] =
    useState("");

  const [editSuccess, setEditSuccess] =
    useState("");

  const [editForm, setEditForm] =
    useState({
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
          localStorage.getItem(
            "hackon_token"
          );

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
        await navigator.share(
          shareData
        );
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

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "hackon_user"
          ) || "{}"
        );

      const leaderId =
        typeof team.leader === "object"
          ? team.leader?._id
          : team.leader;

      const currentUserId =
        currentUser._id ||
        currentUser.id;

      if (
        leaderId !== currentUserId
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

      setEvent(
        response.hackathon
      );
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
      <main className="min-h-screen bg-[#f6f8fb]">
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
      <main className="min-h-screen bg-[#f6f8fb]">
        <Sidebar />

        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />

          <div className="mx-auto max-w-3xl px-5 py-16">
            <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-black text-slate-950">
                Hackathon load nahi hua
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {error}
              </p>

              <Link
                href="/explore"
                className="mt-6 inline-flex rounded-xl bg-[#1769c2] px-5 py-3 text-sm font-bold text-white"
              >
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

  const statusClass =
    event.status === "ongoing"
      ? "bg-emerald-100 text-emerald-700"
      : event.status ===
        "completed"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-100 text-blue-700";

  const isAdmin =
    currentUser?.role ===
    "admin";

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="relative">
          {/* Banner */}
          <div className="relative h-[340px] overflow-hidden bg-[linear-gradient(110deg,#071f4a,#0d46a0,#127cab)] sm:h-[390px]">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

            <div className="mx-auto max-w-[1120px] px-5 pt-9 sm:px-7 lg:px-10">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <ArrowLeft
                  size={17}
                />
                Back
              </Link>
            </div>
          </div>

          {/* Main Card */}
          <div className="relative z-10 mx-auto -mt-24 max-w-[980px] px-5 pb-20 sm:px-7">
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
              <div className="grid gap-0 lg:grid-cols-[1fr_320px]">

                {/* LEFT */}

                <div className="p-6 sm:p-9 lg:p-11">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-2xl font-black text-[#1769c2] shadow-sm">
                      H
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1769c2]">
                            HackOn
                          </p>

                          <h1 className="mt-2 max-w-[570px] text-3xl font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-4xl">
                            {
                              event.title
                            }
                          </h1>
                        </div>

                        {isAdmin && (
                          <button
                            type="button"
                            onClick={
                              openEditModal
                            }
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                          >
                            <Edit3
                              size={
                                16
                              }
                            />
                            Edit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Badges */}

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    <span className="rounded-full bg-[#1769c2] px-4 py-2 text-xs font-semibold text-white">
                      Hackathon
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                      <Globe2
                        size={14}
                      />
                      {eventMode}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
                      Team Registration
                    </span>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold capitalize ${statusClass}`}
                    >
                      {event.status ||
                        "upcoming"}
                    </span>
                  </div>

                  {/* Description */}

                  <div className="mt-10">
                    <h2 className="text-xl font-extrabold text-slate-950">
                      About this opportunity
                    </h2>

                    <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-slate-500">
                      {
                        event.description
                      }
                    </p>
                  </div>

                  {/* Dates */}

                  <div className="mt-9">
                    <h3 className="text-sm font-bold text-slate-800">
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

                  {team && (
                    <div className="mt-9 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                      <p className="text-xs font-black uppercase tracking-wider text-[#1769c2]">
                        Your Team
                      </p>

                      <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="font-black text-slate-950">
                            {
                              team.teamName
                            }
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            {team
                              .members
                              ?.length ||
                              0}{" "}
                            /{" "}
                            {team.maxMembers ||
                              4}{" "}
                            members
                          </p>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600">
                          Code:{" "}
                          {
                            team.teamCode
                          }
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT */}

                <aside className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:border-l lg:border-t-0">

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
                          event.status ===
                            "completed"
                        }
                        className="flex min-h-13 w-full items-center justify-center rounded-xl bg-[#1769c2] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#1058aa] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {registering
                          ? "Registering..."
                          : isRegistered
                          ? "✓ Team Registered"
                          : event.status ===
                            "completed"
                          ? "Hackathon Completed"
                          : "Register Team"}
                      </button>

                      {registerMessage && (
                        <div
                          className={`mt-4 rounded-xl px-3 py-3 text-xs font-semibold ${
                            registerType ===
                            "success"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {
                            registerMessage
                          }
                        </div>
                      )}

                      {!team && (
                        <Link
                          href="/teams"
                          className="mt-3 flex w-full items-center justify-center rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-bold text-[#1769c2]"
                        >
                          Create / Join Team
                        </Link>
                      )}
                    </>
                  )}

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={
                        openEditModal
                      }
                      className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      <Edit3
                        size={17}
                      />
                      Edit Hackathon
                    </button>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSaved(
                          (current) =>
                            !current
                        )
                      }
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        saved
                          ? "border-[#1769c2] bg-blue-50 text-[#1769c2]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
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
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
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

                  <div className="mt-8 space-y-6">
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
                        event.status ||
                        "upcoming"
                      }
                      iconClass="bg-violet-50 text-violet-600"
                    />
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* EDIT MODAL */}

      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() =>
              setEditOpen(false)
            }
            className="absolute inset-0"
            aria-label="Close"
          />

          <section className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Edit Hackathon
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Admin only
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={
                handleUpdate
              }
              className="space-y-5 p-6"
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
                  rows={4}
                  value={
                    editForm.description
                  }
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description:
                        e.target.value,
                    })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none focus:border-blue-400 focus:bg-white"
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
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      status:
                        e.target.value,
                    })
                  }
                  className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-400"
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
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                  {editError}
                </div>
              )}

              {editSuccess && (
                <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                  {
                    editSuccess
                  }
                </div>
              )}

              <button
                type="submit"
                disabled={
                  editLoading
                }
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
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

const formatForInput = (
  date
) => {
  if (!date) {
    return "";
  }

  const parsed =
    new Date(date);

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
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
      />
    </div>
  );
};

const InfoBox = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-900">
        {value}
      </p>
    </div>
  );
};

const DetailItem = ({
  icon: Icon,
  label,
  value,
  iconClass,
}) => {
  return (
    <div className="flex gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        <Icon size={18} />
      </span>

      <div>
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold capitalize text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

export default EventDetails;