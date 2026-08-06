"use client";

import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Sparkles,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import DashboardStats from "./DashboardStats";
import ActiveHackathons from "./ActiveHackathons";
import UpcomingDeadlines from "./UpcomingDeadlines";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-19">
        <Header />

        <section className="mx-auto max-w-350 px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          <DashboardWelcome />

          <DashboardStats />

          <div className="mt-7 grid gap-7 xl:grid-cols-[1.55fr_0.85fr]">
            <div className="space-y-7">
              <ActiveHackathons />
              <RecentActivity />
            </div>

            <div className="space-y-7">
              <QuickActions />
              <UpcomingDeadlines />
              <DashboardNotice />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

const DashboardWelcome = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-100px] left-[35%] h-44 w-44 rounded-full bg-violet-100/60 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-700">
            <Sparkles size={15} />
            Student workspace
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.045em] text-slate-950 sm:text-4xl">
            Welcome back, Gaurav
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Track your hackathons, manage your team, monitor deadlines and
            submit projects from one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:flex">
          <WelcomeInfo
            icon={CalendarDays}
            label="Today"
            value="26 July"
          />

          <WelcomeInfo
            icon={Clock3}
            label="Next deadline"
            value="2 days"
          />

          <button
            type="button"
            className="col-span-2 inline-flex min-h-19 items-center justify-between gap-5 rounded-2xl bg-slate-950 px-5 py-4 text-left text-white transition hover:-translate-y-0.5 hover:bg-blue-700 sm:min-w-48"
          >
            <div>
              <p className="text-xs text-slate-300">
                Continue working
              </p>

              <p className="mt-1 text-sm font-bold">
                AI Health Project
              </p>
            </div>

            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const WelcomeInfo = ({ icon: Icon, label, value }) => {
  return (
    <div className="min-w-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
        <Icon size={16} />
      </div>

      <p className="mt-3 text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
};

const DashboardNotice = () => {
  return (
    <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
      <div className="flex items-start justify-between gap-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
          <Bell size={20} />
        </div>

        <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-950">
          Important
        </span>
      </div>

      <h2 className="mt-6 text-xl font-black tracking-tight">
        Submission window is open
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-300">
        Submit your final repository, demo video and presentation before the
        closing deadline.
      </p>

      <button
        type="button"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
      >
        Submit project
        <ChevronRight size={17} />
      </button>
    </section>
  );
};

export default Dashboard;