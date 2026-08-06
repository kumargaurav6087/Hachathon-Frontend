"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Globe2,
  Share2,
  Trophy,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const events = {
  1: {
    id: 1,
    company: "Adobe",
    companyLetter: "A",
    title: "Adobe University Hackathon 2026",
    type: "Hackathon",
    mode: "Online",
    registration: "Free Registration",
    featured: true,
    description:
      "Build the next generation of creative tools using Adobe APIs. Cash prizes, mentorship, certificates, and internship opportunities await the best teams.",
    skills: ["AI", "Creative Tech", "APIs"],
    prize: "₹5,00,000",
    deadline: "Mon, Aug 31, 2026",
    participants: "4,821 Participants",
    banner:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
  },

  2: {
    id: 2,
    company: "Amazon",
    companyLetter: "A",
    title: "Amazon ML Challenge 2026",
    type: "Competition",
    mode: "Online",
    registration: "Free Registration",
    featured: true,
    description:
      "Solve challenging machine-learning problems using real-world datasets and build scalable AI solutions.",
    skills: ["Machine Learning", "Data Science", "AWS"],
    prize: "₹3,00,000",
    deadline: "Thu, Sep 10, 2026",
    participants: "12,430 Participants",
    banner:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85",
  },

  3: {
    id: 3,
    company: "Flipkart",
    companyLetter: "F",
    title: "Flipkart Grid 7.0",
    type: "Competition",
    mode: "Hybrid",
    registration: "Free Registration",
    featured: true,
    description:
      "Create innovative engineering and e-commerce solutions for real-world business problems.",
    skills: ["Engineering", "E-commerce", "Problem Solving"],
    prize: "₹2,50,000",
    deadline: "Thu, Aug 20, 2026",
    participants: "35,000 Participants",
    banner:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=85",
  },
};

const EventDetails = ({ eventId }) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const event = events[eventId] || events[1];

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.log("Share cancelled:", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="relative">
          <div
            className="relative h-[340px] bg-cover bg-center sm:h-[390px]"
            style={{
              backgroundImage: `
                linear-gradient(
                  110deg,
                  rgba(7, 31, 74, 0.94),
                  rgba(13, 70, 160, 0.78),
                  rgba(18, 124, 171, 0.4)
                ),
                url("${event.banner}")
              `,
            }}
          >
            <div className="mx-auto max-w-[1120px] px-5 pt-9 sm:px-7 lg:px-10">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <ArrowLeft size={17} />
                Back
              </Link>
            </div>
          </div>

          <div className="relative z-10 mx-auto -mt-24 max-w-[930px] px-5 pb-20 sm:px-7">
            <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.16)]">
              <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
                <div className="p-6 sm:p-9 lg:p-11">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-2xl font-black text-[#1769c2] shadow-sm">
                      {event.companyLetter}
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1769c2]">
                        {event.company}
                      </p>

                      <h1 className="mt-2 max-w-[570px] text-3xl font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-4xl">
                        {event.title}
                      </h1>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    <span className="rounded-full bg-[#1769c2] px-4 py-2 text-xs font-semibold text-white">
                      {event.type}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                      <Globe2 size={14} />
                      {event.mode}
                    </span>

                    <span className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700">
                      {event.registration}
                    </span>

                    {event.featured && (
                      <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold text-orange-700">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="mt-10">
                    <h2 className="text-xl font-extrabold text-slate-950">
                      About this opportunity
                    </h2>

                    <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-slate-500">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-9">
                    <h3 className="text-sm font-bold text-slate-800">
                      Skills & Tags
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {event.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="border-t border-slate-200 bg-slate-50/80 p-6 sm:p-8 lg:border-l lg:border-t-0">
                  <Link
                    href={`/submit?event=${event.id}`}
                    className="flex h-13 w-full items-center justify-center rounded-xl bg-[#1769c2] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#1058aa]"
                  >
                    Register Now
                  </Link>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSaved((current) => !current)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        saved
                          ? "border-[#1769c2] bg-blue-50 text-[#1769c2]"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {saved ? (
                        <Check size={16} />
                      ) : (
                        <Bookmark size={16} />
                      )}

                      {saved ? "Saved" : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300"
                    >
                      {copied ? <Copy size={16} /> : <Share2 size={16} />}

                      {copied ? "Copied" : "Share"}
                    </button>
                  </div>

                  <div className="mt-8 space-y-6">
                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#1769c2]">
                        <Trophy size={18} />
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Prizes & Rewards
                        </p>

                        <p className="mt-1 font-extrabold text-slate-900">
                          {event.prize}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <Clock3 size={18} />
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Registration Deadline
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {event.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                        <Users size={18} />
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Registered
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {event.participants}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                        <CalendarDays size={18} />
                      </span>

                      <div>
                        <p className="text-xs font-medium text-slate-400">
                          Event Mode
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-900">
                          {event.mode}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventDetails;