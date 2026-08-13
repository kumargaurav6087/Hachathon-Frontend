"use client";

import Link from "next/link";
import { useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
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

      console.log(
        "REGISTER HACKATHON ID:",
        opportunity.id
      );

      const token = localStorage.getItem(
        "hackon_token"
      );

      if (!token) {
        setMessage("Pehle login karo.");
        setMessageType("error");
        return;
      }

      // Current user ki team
      const teamResponse = await getMyTeam();

      if (!teamResponse.team) {
        setMessage(
          "Hackathon register karne se pehle team create ya join karo."
        );

        setMessageType("error");
        return;
      }

      const team = teamResponse.team;

      console.log(
        "TEAM ID:",
        team._id
      );

      const currentUser = JSON.parse(
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

      // Only leader can register
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

      const response =
        await registerTeamInHackathon(
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

  const formattedDeadline =
    opportunity.deadline
      ? new Date(
          opportunity.deadline
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "No deadline";

  const statusClass =
    opportunity.status === "ongoing"
      ? "bg-emerald-50 text-emerald-700"
      : opportunity.status ===
          "completed"
      ? "bg-slate-100 text-slate-600"
      : "bg-blue-50 text-blue-700";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top */}
      <div className="relative h-44 overflow-hidden bg-[linear-gradient(135deg,#eef8ff,#f8fbff,#ecfdff)]">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#1769c2] shadow-sm">
            {opportunity.mode ||
              "Online"}
          </span>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${statusClass}`}
          >
            {opportunity.status ||
              "upcoming"}
          </span>
        </div>

        <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1769c2] text-lg font-black text-white shadow-md">
          H
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#1769c2]">
          {opportunity.category ||
            "Hackathon"}
        </p>

        <h2 className="mt-2 min-h-12 text-lg font-extrabold leading-6 text-slate-950">
          {opportunity.title}
        </h2>

        <p className="mt-3 line-clamp-3 min-h-18 text-sm leading-6 text-slate-500">
          {opportunity.description}
        </p>

        {/* Details */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <MetaItem
            icon={CalendarDays}
            label="Deadline"
            value={formattedDeadline}
          />

          <MetaItem
            icon={Users}
            label="Teams"
            value={`${
              opportunity.participants ||
              0
            } registered`}
          />

          <MetaItem
            icon={Users}
            label="Team size"
            value={`Max ${
              opportunity.maxTeamSize ||
              4
            }`}
          />

          <MetaItem
            icon={MapPin}
            label="Location"
            value={
              opportunity.location ||
              "Online"
            }
          />
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 rounded-xl px-3 py-2.5 text-xs font-semibold ${
              messageType === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href={`/events/${opportunity.id}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
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
              opportunity.status ===
                "completed"
            }
            className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition ${
              registered
                ? "bg-emerald-600 text-white"
                : "bg-[#1769c2] text-white hover:bg-[#125aa7]"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {registering ? (
              "Registering..."
            ) : registered ? (
              <>
                <CheckCircle2
                  size={16}
                />
                Registered
              </>
            ) : opportunity.status ===
              "completed" ? (
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
    <div className="rounded-2xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={14} />

        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 truncate text-xs font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
};

export default ExploreCard;