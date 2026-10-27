"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Code2,
  Compass,
  Cpu,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import { SOCIAL_INNOVATION_CATEGORIES } from "@/lib/problemApi";

const AboutPage = () => {
  const objectives = [
    {
      title: "Grassroots Problem Identification",
      desc: "Enable local citizens, NGOs, and rural communities to directly voice urgent challenges without bureaucratic hurdles.",
      icon: Compass,
    },
    {
      title: "Multidisciplinary Innovation",
      desc: "Bring together engineering students, domain experts, designers, and social workers to craft pragmatic, scalable solutions.",
      icon: Users,
    },
    {
      title: "End-to-End Implementation",
      desc: "Bridge the gap between weekend hackathon prototypes and real-world deployment with transparent judging and community feedback.",
      icon: Rocket,
    },
    {
      title: "Empowering Social Impact",
      desc: "Reward impactful contributions with recognized certificates, leaderboards, and mentorship connections for sustainable development.",
      icon: Award,
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Community Reports Problem",
      desc: "Citizens or NGOs report real-world issues across waste, water, healthcare, or rural needs.",
    },
    {
      step: "02",
      title: "Verification & Challenge Framing",
      desc: "Problems are moderated and published as community challenges for innovator teams to explore.",
    },
    {
      step: "03",
      title: "Team Formation & Problem Selection",
      desc: "Students and innovators form multidisciplinary teams and claim specific social challenges.",
    },
    {
      step: "04",
      title: "Solution Submission & Evaluation",
      desc: "Teams submit code, presentations, and demo videos reviewed by expert judges on social impact.",
    },
    {
      step: "05",
      title: "Prototype to Deployment",
      desc: "Top prototypes progress to pilot testing and community adoption with institutional backing.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Sidebar />
      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-950 p-8 text-white shadow-xl sm:p-12">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-violet-200 backdrop-blur-md">
                <Sparkles size={14} className="text-violet-300" />
                Team NexKripa Presentation
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Community-Based Hackathon for Social Innovation
              </h1>

              <p className="mt-4 text-base leading-relaxed text-violet-100 sm:text-lg">
                A purpose-built digital ecosystem empowering citizens to voice pressing community challenges,
                and enabling student innovators, developers, and NGOs to collaborate, prototype, and implement sustainable solutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/problems/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-black text-violet-900 shadow-lg transition hover:bg-violet-50 active:scale-95"
                >
                  Report a Community Problem
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
                >
                  Explore Social Challenges
                </Link>
              </div>
            </div>
          </div>

          {/* Core Objectives */}
          <section className="mt-14">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-violet-600">Our Vision</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-4xl">
                Core Project Objectives
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
                Traditional hackathons often focus on theoretical tech demos. NexKripa turns the paradigm around:
                real citizens define the problems, and student innovators deliver measurable social impact.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {objectives.map((obj) => {
                const Icon = obj.icon;
                return (
                  <div
                    key={obj.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-4 text-lg font-black text-slate-900">{obj.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{obj.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Social Innovation Categories */}
          <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-widest text-violet-600">Focus Domains</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                9 Key Social Innovation Categories
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Community problems and hackathon challenges are curated across these core impact areas:
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {SOCIAL_INNOVATION_CATEGORIES.map((cat, idx) => (
                <div
                  key={cat}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 transition hover:bg-violet-50 hover:text-violet-900"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-xs font-black text-white">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-800">{cat}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5-Stage Innovation Workflow */}
          <section className="mt-16">
            <div className="text-center">
              <p className="text-xs font-black uppercase tracking-widest text-violet-600">Process</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                From Community Need to Working Solution
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {workflowSteps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="font-mono text-2xl font-black text-violet-600/30">{item.step}</span>
                  <h3 className="mt-2 text-base font-black text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Solution, Limitations & Future Scope */}
          <section className="mt-16 grid gap-6 md:grid-cols-2">
            {/* The Solution */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xl font-black text-emerald-950">Our Solution</h3>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  Centralized platform connecting civic bodies, NGOs, citizens, and universities.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  Transparent team collaboration, file submission (ZIP, PPT, PDF), and judge scoring.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-emerald-600">✓</span>
                  Automated ranking leaderboards, winner podiums, and verifiable PDF certificates.
                </li>
              </ul>
            </div>

            {/* Limitations & Future Scope */}
            <div className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-xl font-black text-indigo-950">Limitations & Future Scope</h3>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">→</span>
                  <strong>AI Problem Classification:</strong> Automated NLP tagging of incoming citizen complaints.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">→</span>
                  <strong>Micro-Grant Funding:</strong> Integrate CSR and municipal grants directly to winning prototypes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600">→</span>
                  <strong>GIS & IoT Sensor Integration:</strong> Live telemetry for water scarcity and air pollution trackers.
                </li>
              </ul>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="mt-16 text-center">
            <p className="text-sm font-semibold text-slate-500">Ready to make an impact?</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/problems/new"
                className="rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-violet-700"
              >
                Raise a Community Problem
              </Link>
              <Link
                href="/explore"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50"
              >
                Explore Hackathon Challenges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
