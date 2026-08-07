"use client";

import { useMemo, useState } from "react";

import {
  BarChart3,
  CalendarDays,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Search,
  Trophy,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const reportsData = [
  {
    id: 1,
    title: "Participant Report",
    description:
      "Registered participants ki complete details, college, contact information aur role.",
    type: "Participants",
    format: "CSV",
    date: "06 Aug 2026",
    records: 850,
    icon: Users,
    iconStyle: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    title: "Hackathon Performance Report",
    description:
      "Hackathon registrations, participation, submissions aur completion rates ka overview.",
    type: "Hackathons",
    format: "PDF",
    date: "05 Aug 2026",
    records: 12,
    icon: Trophy,
    iconStyle: "bg-amber-50 text-amber-700",
  },
  {
    id: 3,
    title: "Submission Evaluation Report",
    description:
      "Project submission status, judge score, feedback aur final evaluation details.",
    type: "Submissions",
    format: "XLSX",
    date: "04 Aug 2026",
    records: 238,
    icon: FileSpreadsheet,
    iconStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 4,
    title: "Team Registration Report",
    description:
      "Registered teams, team leaders, members aur selected hackathon ki information.",
    type: "Teams",
    format: "CSV",
    date: "03 Aug 2026",
    records: 165,
    icon: Users,
    iconStyle: "bg-violet-50 text-violet-700",
  },
  {
    id: 5,
    title: "Certificate Distribution Report",
    description:
      "Generated certificates, participants, issue date aur verification ID details.",
    type: "Certificates",
    format: "PDF",
    date: "02 Aug 2026",
    records: 320,
    icon: FileText,
    iconStyle: "bg-rose-50 text-rose-700",
  },
  {
    id: 6,
    title: "Monthly Analytics Report",
    description:
      "Monthly user growth, hackathon activity, submissions aur engagement summary.",
    type: "Analytics",
    format: "PDF",
    date: "31 Jul 2026",
    records: 24,
    icon: BarChart3,
    iconStyle: "bg-cyan-50 text-cyan-700",
  },
];

const reportTypes = [
  "All Reports",
  "Participants",
  "Hackathons",
  "Submissions",
  "Teams",
  "Certificates",
  "Analytics",
];

const Reports = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] =
    useState("All Reports");

  const [selectedDate, setSelectedDate] =
    useState("30 Days");

  const [downloadingId, setDownloadingId] =
    useState(null);

  const filteredReports = useMemo(() => {
    const value = searchText.trim().toLowerCase();

    return reportsData.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(value) ||
        report.description.toLowerCase().includes(value) ||
        report.type.toLowerCase().includes(value);

      const matchesType =
        selectedType === "All Reports" ||
        report.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchText, selectedType]);

  const downloadReport = async (report) => {
    try {
      setDownloadingId(report.id);

      await new Promise((resolve) =>
        setTimeout(resolve, 700),
      );

      const content = `
HackOn Report

Title: ${report.title}
Type: ${report.type}
Format: ${report.format}
Generated Date: ${report.date}
Total Records: ${report.records}

${report.description}
      `.trim();

      const blob = new Blob([content], {
        type: "text/plain",
      });

      const fileUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = fileUrl;
      link.download = `${report.title
        .toLowerCase()
        .replace(/\s+/g, "-")}.txt`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen md:pl-19">
        <Header />

        <section className="mx-auto w-full max-w-350 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <ReportsHero />

          <ReportsStats />

          <ReportsFilters
            searchText={searchText}
            setSearchText={setSearchText}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          {filteredReports.length > 0 ? (
            <section className="mt-6 grid gap-5 xl:grid-cols-2">
              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  downloading={
                    downloadingId === report.id
                  }
                  onDownload={() =>
                    downloadReport(report)
                  }
                />
              ))}
            </section>
          ) : (
            <EmptyReports />
          )}

          <RecentActivity />
        </section>
      </div>
    </main>
  );
};

const ReportsHero = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-7 text-white sm:px-8 sm:py-9 lg:px-10">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-bold text-blue-100">
            <FileText size={15} />
            Reports Centre
          </span>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            Platform Reports
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Participants, teams, hackathons, submissions aur
            certificates ki reports generate aur download
            karo.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-bold text-slate-950 transition hover:bg-blue-50 sm:w-fit"
        >
          <FileText size={18} />
          Generate Report
        </button>
      </div>
    </section>
  );
};

const ReportsStats = () => {
  const stats = [
    {
      title: "Total Reports",
      value: "24",
      description: "Generated this month",
      icon: FileText,
      style: "bg-blue-50 text-blue-700",
    },
    {
      title: "Downloads",
      value: "156",
      description: "Total report downloads",
      icon: Download,
      style: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Scheduled",
      value: "04",
      description: "Automatic reports",
      icon: CalendarDays,
      style: "bg-violet-50 text-violet-700",
    },
    {
      title: "Total Records",
      value: "1.5K",
      description: "Records included",
      icon: BarChart3,
      style: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.style}`}
            >
              <Icon size={20} />
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              {stat.title}
            </p>

            <p className="mt-1 text-3xl font-black tracking-[-0.04em] text-slate-950">
              {stat.value}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {stat.description}
            </p>
          </article>
        );
      })}
    </section>
  );
};

const ReportsFilters = ({
  searchText,
  setSearchText,
  selectedType,
  setSelectedType,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchText}
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            placeholder="Search reports..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div className="relative">
          <Filter
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={selectedType}
            onChange={(event) =>
              setSelectedType(event.target.value)
            }
            className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 lg:w-52"
          >
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <CalendarDays
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={selectedDate}
            onChange={(event) =>
              setSelectedDate(event.target.value)
            }
            className="h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-slate-700 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 lg:w-45"
          >
            <option value="7 Days">Last 7 Days</option>
            <option value="30 Days">Last 30 Days</option>
            <option value="3 Months">Last 3 Months</option>
            <option value="1 Year">Last Year</option>
          </select>
        </div>
      </div>
    </section>
  );
};

const ReportCard = ({
  report,
  downloading,
  onDownload,
}) => {
  const Icon = report.icon;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${report.iconStyle}`}
        >
          <Icon size={22} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-black leading-6 text-slate-950">
                {report.title}
              </h2>

              <p className="mt-1 text-xs font-black uppercase tracking-wider text-blue-700">
                {report.type}
              </p>
            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600">
              {report.format}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            {report.description}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Generated
              </p>

              <p className="mt-1 text-sm font-black text-slate-900">
                {report.date}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Records
              </p>

              <p className="mt-1 text-sm font-black text-slate-900">
                {report.records.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <FileText size={17} />
              View Report
            </button>

            <button
              type="button"
              onClick={onDownload}
              disabled={downloading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {downloading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Download size={17} />
              )}

              {downloading
                ? "Preparing..."
                : "Download"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: "Participant report downloaded",
      date: "Today, 10:45 PM",
      user: "Admin",
    },
    {
      id: 2,
      title: "Monthly analytics report generated",
      date: "Yesterday, 4:20 PM",
      user: "System",
    },
    {
      id: 3,
      title: "Certificate report downloaded",
      date: "04 Aug 2026, 11:30 AM",
      user: "Admin",
    },
  ];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-lg font-black text-slate-950">
        Recent Report Activity
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Latest report generation and download history
      </p>

      <div className="mt-5 divide-y divide-slate-100">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <FileText size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {activity.date}
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
              {activity.user}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const EmptyReports = () => {
  return (
    <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
      <FileText
        size={30}
        className="mx-auto text-slate-400"
      />

      <h2 className="mt-4 text-xl font-black">
        No reports found
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Search ya filter change karke dobara try karo.
      </p>
    </section>
  );
};

export default Reports;