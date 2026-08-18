"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";

import { getMyTeam } from "@/lib/teamApi";
import { registerTeamInHackathon } from "@/lib/hackathonApi";

const ExploreCard = ({ opportunity }) => {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async () => {
    try {
      setRegistering(true);
      setMessage("");
      setMessageType("");

      const token = localStorage.getItem("hackon_token");

      if (!token) {
        setMessage("Pehle login karo.");
        setMessageType("error");
        return;
      }

      const teamResponse = await getMyTeam();

      if (!teamResponse.team) {
        setMessage(
          "Hackathon register karne se pehle team create ya join karo."
        );
        setMessageType("error");
        return;
      }

      const team = teamResponse.team;

      const currentUser = JSON.parse(
        localStorage.getItem("hackon_user") || "{}"
      );

      const leaderId =
        typeof team.leader === "object"
          ? team.leader?._id
          : team.leader;

      const currentUserId =
        currentUser._id || currentUser.id;

      if (
        leaderId?.toString() !==
        currentUserId?.toString()
      ) {
        setMessage(
          "Sirf team leader hackathon me team register kar sakta hai."
        );
        setMessageType("error");
        return;
      }

      const response = await registerTeamInHackathon(
        opportunity.id,
        team._id
      );

      setMessage(
        response.message ||
          "Team successfully registered."
      );

      setMessageType("success");
      setRegistered(true);
    } catch (error) {
      setMessage(
        error.message ||
          "Hackathon registration failed."
      );

      setMessageType("error");
    } finally {
      setRegistering(false);
    }
  };

  const formattedDeadline = opportunity.deadline
    ? new Date(opportunity.deadline).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "No deadline";

  const normalizedStatus =
    opportunity.status?.toLowerCase() || "upcoming";

  const statusClass =
    normalizedStatus === "ongoing"
      ? "bg-emerald-50 text-emerald-700"
      : normalizedStatus === "completed"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-50 text-blue-700";

  const isCompleted =
    normalizedStatus === "completed";

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        shadow-[0_8px_28px_rgba(15,23,42,0.05)]
        transition-all
        duration-300

        active:scale-[0.995]

        md:hover:-translate-y-1
        md:hover:border-blue-200
        md:hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]
      "
    >
      {/* Top visual */}
      <div className="relative h-[155px] overflow-hidden bg-gradient-to-br from-[#eef8ff] via-[#f8fbff] to-[#ecfdff] sm:h-[170px]">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-200/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-blue-200/40 blur-3xl" />

        {/* Brand mark */}
        <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1769c2] text-base font-black text-white shadow-[0_7px_18px_rgba(23,105,194,0.25)]">
          H
        </div>

        {/* Badges */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-black capitalize text-[#1769c2] shadow-sm backdrop-blur sm:text-xs">
            {opportunity.mode || "Online"}
          </span>

          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-black capitalize sm:text-xs ${statusClass}`}
          >
            {normalizedStatus}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1769c2] sm:text-xs">
          {opportunity.category || "Hackathon"}
        </p>

        <h2 className="mt-2 line-clamp-2 text-[18px] font-black leading-[1.35] tracking-[-0.025em] text-slate-950 transition md:group-hover:text-[#1769c2]">
          {opportunity.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {opportunity.description ||
            "Explore this hackathon and register your team to participate."}
        </p>

        {/* Details */}
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
          <MetaItem
            icon={CalendarDays}
            label="Deadline"
            value={formattedDeadline}
          />

          <MetaItem
            icon={Users}
            label="Teams"
            value={`${opportunity.participants || 0} registered`}
          />

          <MetaItem
            icon={Users}
            label="Team size"
            value={`Max ${opportunity.maxTeamSize || 4}`}
          />

          <MetaItem
            icon={MapPin}
            label="Location"
            value={opportunity.location || "Online"}
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`
              mt-4
              rounded-2xl
              border
              px-3.5
              py-3
              text-xs
              font-semibold
              leading-5

              ${
                messageType === "success"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-red-100 bg-red-50 text-red-600"
              }
            `}
          >
            {message}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto grid grid-cols-1 gap-2.5 pt-5 sm:grid-cols-2 sm:gap-3">
          <Link
            href={`/events/${opportunity.id}`}
            className="
              inline-flex
              h-11
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
              transition-all

              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#1769c2]

              active:scale-[0.97]
            "
          >
            View Details

            <ArrowUpRight size={16} />
          </Link>

          <button
            type="button"
            onClick={handleRegister}
            disabled={
              registering ||
              registered ||
              isCompleted
            }
            className={`
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              text-sm
              font-bold
              text-white
              shadow-sm
              transition-all

              active:scale-[0.97]

              ${
                registered
                  ? "bg-emerald-600"
                  : isCompleted
                  ? "bg-slate-400"
                  : "bg-[#1769c2] hover:bg-[#125aa7] hover:shadow-md"
              }

              disabled:cursor-not-allowed
              disabled:opacity-80
            `}
          >
            {registering ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Registering
              </>
            ) : registered ? (
              <>
                <CheckCircle2 size={16} />
                Registered
              </>
            ) : isCompleted ? (
              "Completed"
            ) : (
              "Register Team"
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

const MetaItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Icon
          size={14}
          className="shrink-0"
        />

        <span className="truncate text-[9px] font-black uppercase tracking-[0.1em] sm:text-[10px]">
          {label}
        </span>
      </div>

      <p
        className="mt-2 truncate text-[11px] font-bold text-slate-800 sm:text-xs"
        title={value}
      >
        {value}
      </p>
    </div>
  );
};

export default ExploreCard;