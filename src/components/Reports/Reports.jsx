"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Search,
  Trophy,
  Users,
  X,
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
    date: "06 Aug 2026",
    records: 850,
    icon: Users,
    iconStyle:
      "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    title:
      "Hackathon Performance Report",
    description:
      "Hackathon registrations, participation, submissions aur completion rates ka overview.",
    type: "Hackathons",
    date: "05 Aug 2026",
    records: 12,
    icon: Trophy,
    iconStyle:
      "bg-amber-50 text-amber-700",
  },
  {
    id: 3,
    title:
      "Submission Evaluation Report",
    description:
      "Project submission status, judge score, feedback aur final evaluation details.",
    type: "Submissions",
    date: "04 Aug 2026",
    records: 238,
    icon: FileSpreadsheet,
    iconStyle:
      "bg-emerald-50 text-emerald-700",
  },
  {
    id: 4,
    title:
      "Team Registration Report",
    description:
      "Registered teams, team leaders, members aur selected hackathon ki information.",
    type: "Teams",
    date: "03 Aug 2026",
    records: 165,
    icon: Users,
    iconStyle:
      "bg-violet-50 text-violet-700",
  },
  {
    id: 5,
    title:
      "Certificate Distribution Report",
    description:
      "Generated certificates, participants, issue date aur verification ID details.",
    type: "Certificates",
    date: "02 Aug 2026",
    records: 320,
    icon: FileText,
    iconStyle:
      "bg-rose-50 text-rose-700",
  },
  {
    id: 6,
    title:
      "Monthly Analytics Report",
    description:
      "Monthly user growth, hackathon activity, submissions aur engagement summary.",
    type: "Analytics",
    date: "31 Jul 2026",
    records: 24,
    icon: BarChart3,
    iconStyle:
      "bg-cyan-50 text-cyan-700",
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
  const [searchText, setSearchText] =
    useState("");

  const [
    selectedType,
    setSelectedType,
  ] = useState("All Reports");

  const [
    downloadingId,
    setDownloadingId,
  ] = useState(null);

  // ========================================
  // FILTER
  // ========================================

  const filteredReports =
    useMemo(() => {
      const value =
        searchText
          .trim()
          .toLowerCase();

      return reportsData.filter(
        (report) => {
          const matchesSearch =
            !value ||
            report.title
              .toLowerCase()
              .includes(value) ||
            report.description
              .toLowerCase()
              .includes(value) ||
            report.type
              .toLowerCase()
              .includes(value);

          const matchesType =
            selectedType ===
              "All Reports" ||
            report.type ===
              selectedType;

          return (
            matchesSearch &&
            matchesType
          );
        }
      );
    }, [
      searchText,
      selectedType,
    ]);

  const hasFilters =
    searchText.trim() ||
    selectedType !==
      "All Reports";

  const clearFilters = () => {
    setSearchText("");
    setSelectedType(
      "All Reports"
    );
  };

  // ========================================
  // DOWNLOAD
  // ========================================

  const downloadReport = async (
    report
  ) => {
    try {
      setDownloadingId(
        report.id
      );

      const content = [
        "HackOn Report",
        "",
        `Title: ${report.title}`,
        `Type: ${report.type}`,
        `Generated Date: ${report.date}`,
        `Total Records: ${report.records}`,
        "",
        report.description,
      ].join("\n");

      const blob = new Blob(
        [content],
        {
          type: "text/plain;charset=utf-8",
        }
      );

      const fileUrl =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      const safeFileName =
        report.title
          .toLowerCase()
          .replace(
            /[^a-z0-9]+/g,
            "-"
          )
          .replace(
            /^-|-$/g,
            ""
          );

      link.href =
        fileUrl;

      link.download =
        `${safeFileName}.txt`;

      document.body.appendChild(
        link
      );

      link.click();
      link.remove();

      URL.revokeObjectURL(
        fileUrl
      );
    } catch (error) {
      console.error(
        "Download failed:",
        error
      );
    } finally {
      setDownloadingId(
        null
      );
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* HERO */}

          <ReportsHero />

          {/* FILTERS */}

          <ReportsFilters
            searchText={
              searchText
            }
            setSearchText={
              setSearchText
            }
            selectedType={
              selectedType
            }
            setSelectedType={
              setSelectedType
            }
          />

          {/* RESULTS INFO */}

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold text-slate-500 sm:text-sm">
              <span className="font-black text-slate-950">
                {
                  filteredReports.length
                }
              </span>{" "}
              report
              {filteredReports.length ===
              1
                ? ""
                : "s"}{" "}
              available
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={
                  clearFilters
                }
                className="text-xs font-bold text-[#1769c2] transition active:scale-95"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* REPORTS */}

          {filteredReports.length >
          0 ? (
            <section className="mt-5 grid gap-5 xl:grid-cols-2 xl:gap-6">
              {filteredReports.map(
                (report) => (
                  <ReportCard
                    key={
                      report.id
                    }
                    report={
                      report
                    }
                    downloading={
                      downloadingId ===
                      report.id
                    }
                    onDownload={() =>
                      downloadReport(
                        report
                      )
                    }
                  />
                )
              )}
            </section>
          ) : (
            <EmptyReports
              onClear={
                clearFilters
              }
            />
          )}
        </section>
      </div>
    </main>
  );
};

// ========================================
// HERO
// ========================================

const ReportsHero = () => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-100 sm:text-xs">
          <FileText
            size={15}
          />

          Reports Centre
        </div>

        <h1 className="mt-4 text-[32px] font-black tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
          Platform Reports
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
          Access available reports for
          participants, hackathons,
          submissions, teams,
          certificates and analytics.
        </p>
      </div>
    </section>
  );
};

// ========================================
// FILTERS
// ========================================

const ReportsFilters = ({
  searchText,
  setSearchText,
  selectedType,
  setSelectedType,
}) => {
  return (
    <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:mt-7 sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* SEARCH */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={
              searchText
            }
            onChange={(
              event
            ) =>
              setSearchText(
                event.target
                  .value
              )
            }
            placeholder="Search reports..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#1769c2] focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          {searchText && (
            <button
              type="button"
              onClick={() =>
                setSearchText("")
              }
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition active:scale-90 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* TYPE FILTER */}

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {reportTypes.map(
            (type) => {
              const active =
                selectedType ===
                type;

              return (
                <button
                  key={
                    type
                  }
                  type="button"
                  onClick={() =>
                    setSelectedType(
                      type
                    )
                  }
                  className={`
                    shrink-0
                    rounded-xl
                    border
                    px-3.5
                    py-2.5
                    text-[11px]
                    font-bold
                    transition-all
                    active:scale-95
                    sm:px-4
                    sm:text-xs

                    ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
                    }
                  `}
                >
                  {type}
                </button>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

// ========================================
// REPORT CARD
// ========================================

const ReportCard = ({
  report,
  downloading,
  onDownload,
}) => {
  const Icon =
    report.icon;

  return (
    <article className="group min-w-0 rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,0.045)] transition-all duration-300 sm:p-6 xl:hover:-translate-y-1 xl:hover:border-blue-200 xl:hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)]">
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        {/* ICON */}

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${report.iconStyle}`}
        >
          <Icon size={21} />
        </div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2]">
                {report.type}
              </p>

              <h2 className="mt-1 break-words text-lg font-black leading-6 tracking-[-0.02em] text-slate-950">
                {
                  report.title
                }
              </h2>
            </div>

            <span className="w-fit shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-slate-500">
              TXT
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {
              report.description
            }
          </p>

          {/* INFO */}

          <div className="mt-5 grid grid-cols-2 gap-3">
            <ReportMeta
              label="Generated"
              value={
                report.date
              }
            />

            <ReportMeta
              label="Records"
              value={report.records.toLocaleString(
                "en-IN"
              )}
            />
          </div>

          {/* DOWNLOAD */}

          <button
            type="button"
            onClick={
              onDownload
            }
            disabled={
              downloading
            }
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition-all active:scale-[0.97] hover:bg-[#1769c2] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {downloading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                Preparing...
              </>
            ) : (
              <>
                <Download
                  size={17}
                />

                Download Report
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

// ========================================
// META
// ========================================

const ReportMeta = ({
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-[16px] border border-slate-100 bg-slate-50/80 p-3">
      <p className="text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      <p
        className="mt-1.5 truncate text-xs font-black text-slate-900 sm:text-sm"
        title={String(
          value
        )}
      >
        {value}
      </p>
    </div>
  );
};

// ========================================
// EMPTY
// ========================================

const EmptyReports = ({
  onClear,
}) => {
  return (
    <section className="mt-5 rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <FileText
          size={22}
        />
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
        No reports found
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Search ya report type
        change karke dobara try
        karo.
      </p>

      <button
        type="button"
        onClick={
          onClear
        }
        className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-[#1769c2]"
      >
        Clear filters
      </button>
    </section>
  );
};

export default Reports;