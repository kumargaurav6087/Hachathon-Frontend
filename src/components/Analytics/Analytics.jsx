"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import { getDashboardAnalytics } from "@/lib/dashboardApi";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDashboardAnalytics();

      setAnalytics(response.analytics);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Analytics load nahi hua.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const submissionRate = useMemo(() => {
    if (!analytics?.totalTeams) {
      return 0;
    }

    return Math.min(
      Math.round(
        (analytics.totalSubmissions /
          analytics.totalTeams) *
          100,
      ),
      100,
    );
  }, [analytics]);

  const approvalRate = useMemo(() => {
    if (!analytics?.totalSubmissions) {
      return 0;
    }

    return Math.round(
      ((analytics.approvedSubmissions || 0) /
        analytics.totalSubmissions) *
        100,
    );
  }, [analytics]);

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-19">
        <Header />

        <section className="mx-auto max-w-350 px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          <AnalyticsHero />

          {loading && <AnalyticsLoading />}

          {!loading && error && (
            <AnalyticsError
              message={error}
              onRetry={loadAnalytics}
            />
          )}

          {!loading && !error && analytics && (
            <>
              <AnalyticsStats analytics={analytics} />

              <div className="mt-7 grid gap-7 xl:grid-cols-[1.25fr_0.75fr]">
                <AnalyticsOverview
                  analytics={analytics}
                />

                <PerformancePanel
                  submissionRate={submissionRate}
                  approvalRate={approvalRate}
                />
              </div>

              <div className="mt-7 grid gap-7 lg:grid-cols-2">
                <SubmissionBreakdown
                  analytics={analytics}
                />

                <PlatformSummary
                  analytics={analytics}
                />
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

const AnalyticsHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-9 sm:py-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div>
          <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
            Admin analytics
          </span>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Platform overview
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Track users, teams, hackathons, problem
            statements and project submissions from one
            dashboard.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
        >
          Open dashboard
        </Link>
      </div>
    </section>
  );
};

const AnalyticsStats = ({ analytics }) => {
  const stats = [
    {
      label: "Total users",
      value: analytics.totalUsers || 0,
      description: "Registered accounts",
      icon: "U",
      iconClass: "bg-blue-50 text-blue-700",
    },
    {
      label: "Total teams",
      value: analytics.totalTeams || 0,
      description: "Created participant teams",
      icon: "T",
      iconClass: "bg-violet-50 text-violet-700",
    },
    {
      label: "Hackathons",
      value: analytics.totalHackathons || 0,
      description: "Platform events",
      icon: "H",
      iconClass: "bg-amber-50 text-amber-700",
    },
    {
      label: "Submissions",
      value: analytics.totalSubmissions || 0,
      description: "Submitted projects",
      icon: "S",
      iconClass: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${stat.iconClass}`}
          >
            {stat.icon}
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-500">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950">
            {stat.value}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            {stat.description}
          </p>
        </article>
      ))}
    </section>
  );
};

const AnalyticsOverview = ({ analytics }) => {
  const rows = [
    {
      label: "Users",
      value: analytics.totalUsers || 0,
      max: Math.max(analytics.totalUsers || 0, 1),
    },
    {
      label: "Teams",
      value: analytics.totalTeams || 0,
      max: Math.max(analytics.totalUsers || 0, 1),
    },
    {
      label: "Hackathons",
      value: analytics.totalHackathons || 0,
      max: Math.max(analytics.totalUsers || 0, 1),
    },
    {
      label: "Problem statements",
      value: analytics.totalProblems || 0,
      max: Math.max(analytics.totalUsers || 0, 1),
    },
    {
      label: "Submissions",
      value: analytics.totalSubmissions || 0,
      max: Math.max(analytics.totalUsers || 0, 1),
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <div>
        <h2 className="text-lg font-black text-slate-950">
          Platform activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Comparison of major platform records
        </p>
      </div>

      <div className="mt-7 space-y-6">
        {rows.map((row) => {
          const width = Math.max(
            Math.round((row.value / row.max) * 100),
            row.value > 0 ? 8 : 0,
          );

          return (
            <div key={row.label}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">
                  {row.label}
                </span>

                <span className="text-sm font-black text-slate-950">
                  {row.value}
                </span>
              </div>

              <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all duration-500"
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const PerformancePanel = ({
  submissionRate,
  approvalRate,
}) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-black text-slate-950">
        Performance
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Submission and approval indicators
      </p>

      <div className="mt-7 space-y-6">
        <ProgressCircle
          value={submissionRate}
          label="Team submission rate"
        />

        <ProgressCircle
          value={approvalRate}
          label="Submission approval rate"
        />
      </div>

      <div className="mt-7 rounded-2xl bg-slate-950 p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Admin note
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          Analytics data current MongoDB records se
          automatically calculate ho raha hai.
        </p>
      </div>
    </section>
  );
};

const ProgressCircle = ({ value, label }) => {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(#1d4ed8 ${value}%, #e2e8f0 ${value}% 100%)`,
        }}
      >
        <div className="flex h-15 w-15 items-center justify-center rounded-full bg-white text-base font-black text-slate-950">
          {value}%
        </div>
      </div>

      <div>
        <p className="text-sm font-black text-slate-900">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Calculated from current teams and submissions.
        </p>
      </div>
    </div>
  );
};

const SubmissionBreakdown = ({ analytics }) => {
  const total = analytics.totalSubmissions || 0;

  const items = [
    {
      label: "Approved",
      value: analytics.approvedSubmissions || 0,
      className: "bg-emerald-500",
    },
    {
      label: "Pending",
      value: analytics.pendingSubmissions || 0,
      className: "bg-amber-500",
    },
    {
      label: "Rejected",
      value: analytics.rejectedSubmissions || 0,
      className: "bg-red-500",
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-black text-slate-950">
        Submission breakdown
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Current project review statuses
      </p>

      <div className="mt-7 flex h-4 overflow-hidden rounded-full bg-slate-100">
        {items.map((item) => {
          const width =
            total > 0
              ? (item.value / total) * 100
              : 0;

          return (
            <div
              key={item.label}
              className={item.className}
              style={{
                width: `${width}%`,
              }}
            />
          );
        })}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${item.className}`}
              />

              <span className="text-xs font-bold text-slate-500">
                {item.label}
              </span>
            </div>

            <p className="mt-3 text-2xl font-black text-slate-950">
              {item.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

const PlatformSummary = ({ analytics }) => {
  const items = [
    {
      label: "Average teams per hackathon",
      value:
        analytics.totalHackathons > 0
          ? (
              analytics.totalTeams /
              analytics.totalHackathons
            ).toFixed(1)
          : "0",
    },
    {
      label: "Average submissions per hackathon",
      value:
        analytics.totalHackathons > 0
          ? (
              analytics.totalSubmissions /
              analytics.totalHackathons
            ).toFixed(1)
          : "0",
    },
    {
      label: "Users per team",
      value:
        analytics.totalTeams > 0
          ? (
              analytics.totalUsers /
              analytics.totalTeams
            ).toFixed(1)
          : "0",
    },
    {
      label: "Problem statements",
      value: analytics.totalProblems || 0,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-lg font-black text-slate-950">
        Platform summary
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Useful ratios based on existing data
      </p>

      <div className="mt-6 divide-y divide-slate-100">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-5 py-4"
          >
            <span className="text-sm font-semibold text-slate-500">
              {item.label}
            </span>

            <span className="text-lg font-black text-slate-950">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const AnalyticsLoading = () => {
  return (
    <section className="mt-7 rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mx-auto block h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-blue-700" />

      <p className="mt-5 text-sm font-bold text-slate-600">
        Analytics loading...
      </p>
    </section>
  );
};

const AnalyticsError = ({
  message,
  onRetry,
}) => {
  return (
    <section className="mt-7 rounded-3xl border border-red-200 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-600">
        !
      </div>

      <h2 className="mt-5 text-xl font-black text-slate-950">
        Analytics access failed
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        {message}
      </p>

      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Try again
        </button>

        <Link
          href="/auth"
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default Analytics;