"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  LoaderCircle,
  RefreshCcw,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import DashboardStats from "./DashboardStats";
import ActiveHackathons from "./ActiveHackathons";
import UpcomingDeadlines from "./UpcomingDeadlines";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

import { getUserDashboard } from "@/lib/dashboardApi";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getUserDashboard();

      setDashboardData(response?.dashboard || {});
    } catch (error) {
      setError(
        error?.message ||
          "Dashboard load nahi hua."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
            {/* Welcome skeleton */}
            <div className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="h-7 w-36 rounded-full bg-slate-200" />

              <div className="mt-5 h-9 w-[75%] max-w-md rounded-xl bg-slate-200" />

              <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-100" />

              <div className="mt-2 h-4 w-[70%] max-w-lg rounded bg-slate-100" />
            </div>

            {/* Stats skeleton */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[130px] animate-pulse rounded-[22px] border border-slate-200 bg-white"
                />
              ))}
            </div>

            {/* Content skeleton */}
            <div className="mt-7 grid gap-5 xl:grid-cols-[1.55fr_0.85fr]">
              <div className="h-[360px] animate-pulse rounded-[26px] border border-slate-200 bg-white" />

              <div className="h-[360px] animate-pulse rounded-[26px] border border-slate-200 bg-white" />
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
              <LoaderCircle
                size={18}
                className="animate-spin text-[#1769c2]"
              />
              Loading dashboard...
            </div>
          </section>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f8fafc]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="rounded-[28px] border border-red-100 bg-white p-6 text-center shadow-sm sm:p-9">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-600">
                !
              </div>

              <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950 sm:text-2xl">
                Dashboard load nahi hua
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-600">
                {error}
              </p>

              <button
                type="button"
                onClick={loadDashboard}
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-5 text-sm font-bold text-white shadow-sm transition-all active:scale-95 hover:bg-[#125aa7]"
              >
                <RefreshCcw size={16} />
                Try Again
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const dashboard = dashboardData || {};

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* Welcome */}
          <DashboardWelcome
            user={dashboard.user}
            activeHackathons={
              dashboard.activeHackathons || []
            }
            upcomingDeadlines={
              dashboard.upcomingDeadlines || []
            }
          />

          {/* Stats */}
          <div className="mt-5 sm:mt-6">
            <DashboardStats
              stats={dashboard.stats}
            />
          </div>

          {/* Main dashboard grid */}
          <div className="mt-6 grid gap-5 sm:mt-7 sm:gap-6 xl:grid-cols-[1.55fr_0.85fr] xl:gap-7">
            {/* Left */}
            <div className="min-w-0 space-y-5 sm:space-y-6 xl:space-y-7">
              <ActiveHackathons
                hackathons={
                  dashboard.activeHackathons || []
                }
              />

              <RecentActivity
                activities={
                  dashboard.recentActivity || []
                }
              />
            </div>

            {/* Right */}
            <div className="min-w-0 space-y-5 sm:space-y-6 xl:space-y-7">
              <QuickActions />

              <UpcomingDeadlines
                deadlines={
                  dashboard.upcomingDeadlines || []
                }
              />

              <DashboardNotice />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

// ==========================================
// WELCOME
// ==========================================

const DashboardWelcome = ({
  user,
  activeHackathons = [],
  upcomingDeadlines = [],
}) => {
  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const nextDeadline =
    upcomingDeadlines.length > 0
      ? upcomingDeadlines[0]?.remaining ||
        "Upcoming"
      : "No deadline";

  const currentHackathon =
    activeHackathons.length > 0
      ? activeHackathons[0]
      : null;

  const currentHackathonId =
    currentHackathon?._id ||
    currentHackathon?.id;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-slate-200/80
        bg-white
        px-5
        py-6
        shadow-[0_8px_30px_rgba(15,23,42,0.05)]

        sm:px-7
        sm:py-8

        lg:px-8
      "
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-100/70 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
        {/* Text */}
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/90 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2] sm:text-xs">
            <Sparkles size={14} />
            Student Workspace
          </div>

          <h1 className="mt-4 break-words text-[30px] font-black leading-[1.08] tracking-[-0.045em] text-slate-950 sm:mt-5 sm:text-4xl lg:text-[42px]">
            Welcome back,{" "}
            <span className="text-[#1769c2]">
              {user?.name || "User"}
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
            Track your hackathons, manage
            your team, monitor deadlines
            and submit projects from one
            place.
          </p>
        </div>

        {/* Right info */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:flex lg:items-stretch">
          <WelcomeInfo
            icon={CalendarDays}
            label="Today"
            value={today}
          />

          <WelcomeInfo
            icon={Clock3}
            label="Next deadline"
            value={nextDeadline}
          />

          {currentHackathon &&
          currentHackathonId ? (
            <Link
              href={`/events/${currentHackathonId}`}
              className="
                group
                col-span-2
                flex
                min-h-[78px]
                items-center
                justify-between
                gap-4
                rounded-2xl
                bg-slate-950
                px-4
                py-4
                text-left
                text-white
                shadow-sm
                transition-all
                active:scale-[0.97]
                hover:-translate-y-0.5
                hover:bg-[#1769c2]

                sm:px-5

                lg:min-w-[205px]
              "
            >
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 group-hover:text-blue-100">
                  Continue working
                </p>

                <p className="mt-1 max-w-[180px] truncate text-sm font-bold">
                  {currentHackathon.title}
                </p>
              </div>

              <ChevronRight
                size={20}
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </Link>
          ) : (
            <div
              className="
                col-span-2
                flex
                min-h-[78px]
                items-center
                justify-between
                gap-4
                rounded-2xl
                bg-slate-100
                px-4
                py-4
                text-slate-500

                sm:px-5

                lg:min-w-[205px]
              "
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Continue working
                </p>

                <p className="mt-1 text-sm font-bold">
                  No active hackathon
                </p>
              </div>

              <ChevronRight
                size={20}
                className="opacity-40"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// WELCOME INFO
// ==========================================

const WelcomeInfo = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-4 sm:min-w-[140px] sm:px-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1769c2] shadow-sm">
        <Icon size={16} />
      </div>

      <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400 sm:text-xs">
        {label}
      </p>

      <p
        className="mt-1 truncate text-xs font-black text-slate-900 sm:text-sm"
        title={value}
      >
        {value}
      </p>
    </div>
  );
};

// ==========================================
// DASHBOARD NOTICE
// ==========================================

const DashboardNotice = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[26px]
        bg-slate-950
        p-5
        text-white
        shadow-[0_12px_35px_rgba(15,23,42,0.16)]

        sm:p-6
      "
    >
      {/* Decoration */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white">
            <Bell size={20} />
          </div>

          <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-slate-950 sm:text-[10px]">
            Important
          </span>
        </div>

        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.14em] text-blue-300">
          Don't miss it
        </p>

        <h2 className="mt-2 text-xl font-black tracking-[-0.025em] sm:text-2xl">
          Submission window
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-300">
          Submit your repository, demo
          video and presentation before the
          closing deadline.
        </p>

        <Link
          href="/submit"
          className="
            group
            mt-6
            inline-flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-white
            px-4
            text-sm
            font-bold
            text-slate-950
            shadow-sm
            transition-all
            active:scale-[0.97]
            hover:bg-blue-50
          "
        >
          Submit project

          <ChevronRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};

export default Dashboard;