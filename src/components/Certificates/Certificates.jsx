"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  Award,
  CheckCircle2,
  Download,
  Eye,
  LoaderCircle,
  Search,
  ShieldCheck,
  Trophy,
  X,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import {
  getMyCertificates,
} from "@/lib/certificateApi";

const filterOptions = [
  "All certificates",
  "Participation",
  "Winner",
  "First Runner-up",
  "Second Runner-up",
  "Finalist",
];

const Certificates = () => {
  const [certificates, setCertificates] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All certificates");

  const [
    selectedCertificate,
    setSelectedCertificate,
  ] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    downloadingCertificateId,
    setDownloadingCertificateId,
  ] = useState(null);

  // ========================================
  // LOAD CERTIFICATES
  // ========================================

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMyCertificates();

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "hackon_user"
          ) || "{}"
        );

      const formattedCertificates =
        (
          response?.certificates ||
          []
        ).map((certificate) => ({
          id: certificate._id,

          participantName:
            currentUser.name ||
            "Participant",

          hackathonName:
            certificate.hackathon
              ?.title ||
            "Hackathon",

          certificateType:
            certificate.certificateType ||
            "Participation",

          achievement:
            certificate.achievement ||
            "Successfully participated",

          issuedDate:
            certificate.issuedDate,

          verificationId:
            certificate.verificationId ||
            "N/A",

          organizer:
            certificate.organizer ||
            "HackOn Community",

          teamName:
            certificate.team
              ?.teamName ||
            "Team",

          raw: certificate,
        }));

      setCertificates(
        formattedCertificates
      );
    } catch (error) {
      setError(
        error?.message ||
          "Certificates load nahi hue."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  // ========================================
  // MODAL BODY SCROLL
  // ========================================

  useEffect(() => {
    if (!selectedCertificate) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCertificate]);

  // ========================================
  // FILTER + SEARCH
  // ========================================

  const filteredCertificates =
    useMemo(() => {
      const searchValue =
        searchTerm
          .trim()
          .toLowerCase();

      return certificates.filter(
        (certificate) => {
          const matchesSearch =
            !searchValue ||
            certificate.hackathonName
              ?.toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.certificateType
              ?.toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.verificationId
              ?.toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.teamName
              ?.toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.participantName
              ?.toLowerCase()
              .includes(
                searchValue
              );

          const matchesFilter =
            activeFilter ===
              "All certificates" ||
            certificate.certificateType ===
              activeFilter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      certificates,
      searchTerm,
      activeFilter,
    ]);

  const winnerCertificates =
    certificates.filter(
      (certificate) =>
        certificate.certificateType ===
          "Winner" ||
        certificate.certificateType ===
          "First Runner-up" ||
        certificate.certificateType ===
          "Second Runner-up"
    ).length;

  // ========================================
  // DOWNLOAD PDF
  // ========================================

  const handleDownloadCertificate =
    async (certificate) => {
      try {
        setDownloadingCertificateId(
          certificate.id
        );

        const { jsPDF } =
          await import("jspdf");

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = 297;
        const pageHeight = 210;

        // ====================================
        // BACKGROUND
        // ====================================

        pdf.setFillColor(
          248,
          250,
          252
        );

        pdf.rect(
          0,
          0,
          pageWidth,
          pageHeight,
          "F"
        );

        // ====================================
        // OUTER BORDER
        // ====================================

        pdf.setDrawColor(
          15,
          23,
          42
        );

        pdf.setLineWidth(1.4);

        pdf.rect(
          9,
          9,
          pageWidth - 18,
          pageHeight - 18
        );

        // ====================================
        // INNER BLUE BORDER
        // ====================================

        pdf.setDrawColor(
          37,
          99,
          235
        );

        pdf.setLineWidth(0.5);

        pdf.rect(
          14,
          14,
          pageWidth - 28,
          pageHeight - 28
        );

        // ====================================
        // LOGO
        // ====================================

        pdf.setFillColor(
          15,
          23,
          42
        );

        pdf.circle(
          38,
          36,
          15,
          "F"
        );

        pdf.setTextColor(
          255,
          255,
          255
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(12);

        pdf.text(
          "H",
          38,
          40,
          {
            align: "center",
          }
        );

        // ====================================
        // BRAND
        // ====================================

        pdf.setTextColor(
          15,
          23,
          42
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(18);

        pdf.text(
          "HACKON",
          57,
          33
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(8);

        pdf.setTextColor(
          100,
          116,
          139
        );

        pdf.text(
          "BUILD. INNOVATE. IMPACT.",
          57,
          39
        );

        // ====================================
        // CERTIFICATE TYPE
        // ====================================

        pdf.setTextColor(
          37,
          99,
          235
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(12);

        pdf.text(
          `${certificate.certificateType.toUpperCase()} CERTIFICATE`,
          pageWidth / 2,
          62,
          {
            align: "center",
          }
        );

        // ====================================
        // MAIN HEADING
        // ====================================

        pdf.setTextColor(
          15,
          23,
          42
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(28);

        pdf.text(
          "Certificate of Achievement",
          pageWidth / 2,
          78,
          {
            align: "center",
          }
        );

        // ====================================
        // PRESENTED TO
        // ====================================

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(11);

        pdf.setTextColor(
          100,
          116,
          139
        );

        pdf.text(
          "This certificate is proudly presented to",
          pageWidth / 2,
          95,
          {
            align: "center",
          }
        );

        // ====================================
        // PARTICIPANT NAME
        // ====================================

        pdf.setFont(
          "times",
          "bolditalic"
        );

        pdf.setTextColor(
          15,
          23,
          42
        );

        pdf.setFontSize(25);

        pdf.text(
          certificate.participantName ||
            "Participant",
          pageWidth / 2,
          114,
          {
            align: "center",
          }
        );

        pdf.setDrawColor(
          37,
          99,
          235
        );

        pdf.line(
          82,
          120,
          215,
          120
        );

        // ====================================
        // ACHIEVEMENT
        // ====================================

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(11);

        pdf.setTextColor(
          71,
          85,
          105
        );

        const achievementText =
          `${certificate.achievement} at ${certificate.hackathonName}.`;

        const wrapped =
          pdf.splitTextToSize(
            achievementText,
            180
          );

        pdf.text(
          wrapped,
          pageWidth / 2,
          136,
          {
            align: "center",
          }
        );

        // ====================================
        // TEAM
        // ====================================

        pdf.setFontSize(10);

        pdf.setTextColor(
          71,
          85,
          105
        );

        pdf.text(
          `Team: ${certificate.teamName}`,
          pageWidth / 2,
          151,
          {
            align: "center",
          }
        );

        // ====================================
        // DATE
        // ====================================

        const issuedDate =
          formatDate(
            certificate.issuedDate
          );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setTextColor(
          15,
          23,
          42
        );

        pdf.setFontSize(10);

        pdf.text(
          issuedDate,
          61,
          168,
          {
            align: "center",
          }
        );

        pdf.setDrawColor(
          148,
          163,
          184
        );

        pdf.line(
          31,
          173,
          91,
          173
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setTextColor(
          100,
          116,
          139
        );

        pdf.setFontSize(8);

        pdf.text(
          "Date of issue",
          61,
          179,
          {
            align: "center",
          }
        );

        // ====================================
        // ORGANIZER
        // ====================================

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setTextColor(
          15,
          23,
          42
        );

        pdf.setFontSize(10);

        pdf.text(
          certificate.organizer,
          236,
          168,
          {
            align: "center",
          }
        );

        pdf.setDrawColor(
          148,
          163,
          184
        );

        pdf.line(
          206,
          173,
          266,
          173
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setTextColor(
          100,
          116,
          139
        );

        pdf.setFontSize(8);

        pdf.text(
          "Authorized organizer",
          236,
          179,
          {
            align: "center",
          }
        );

        // ====================================
        // VERIFICATION ID
        // ====================================

        pdf.setFillColor(
          239,
          246,
          255
        );

        pdf.roundedRect(
          102,
          185,
          93,
          9,
          2,
          2,
          "F"
        );

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setTextColor(
          37,
          99,
          235
        );

        pdf.setFontSize(7);

        pdf.text(
          `Verification ID: ${certificate.verificationId}`,
          pageWidth / 2,
          190.5,
          {
            align: "center",
          }
        );

        // ====================================
        // SAVE
        // ====================================

        const safeName =
          certificate.hackathonName
            .replace(
              /[^a-z0-9]/gi,
              "-"
            )
            .replace(
              /-+/g,
              "-"
            )
            .toLowerCase();

        const safeType =
          certificate.certificateType
            .replace(
              /[^a-z0-9]/gi,
              "-"
            )
            .replace(
              /-+/g,
              "-"
            )
            .toLowerCase();

        pdf.save(
          `${safeName}-${safeType}-certificate.pdf`
        );
      } catch (error) {
        console.error(
          "Certificate download error:",
          error
        );

        alert(
          "Certificate download nahi hua."
        );
      } finally {
        setDownloadingCertificateId(
          null
        );
      }
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
            <div className="animate-pulse rounded-[28px] bg-slate-950 p-6 sm:p-9">
              <div className="h-8 w-44 rounded-full bg-white/10" />

              <div className="mt-5 h-10 w-[70%] max-w-md rounded-xl bg-white/10" />

              <div className="mt-4 h-4 w-[80%] max-w-xl rounded bg-white/10" />
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {[1, 2].map(
                (item) => (
                  <div
                    key={item}
                    className="h-[390px] animate-pulse rounded-[26px] border border-slate-200 bg-white"
                  />
                )
              )}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
              <LoaderCircle
                size={18}
                className="animate-spin text-[#1769c2]"
              />

              Loading certificates...
            </div>
          </section>
        </div>
      </main>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 xl:px-10">
          {/* HERO */}

          <CertificatesHero
            totalCertificates={
              certificates.length
            }
            winnerCertificates={
              winnerCertificates
            }
          />

          {/* ERROR */}

          {error && (
            <div className="mt-6 flex flex-col items-start gap-4 rounded-[22px] border border-red-200 bg-red-50 p-4 text-red-700 sm:flex-row sm:p-5">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <p className="font-black">
                  Certificates load nahi hue
                </p>

                <p className="mt-1 text-sm leading-6">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  loadCertificates
                }
                className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white transition active:scale-95"
              >
                Retry
              </button>
            </div>
          )}

          {!error && (
            <>
              {/* TOOLBAR */}

              <CertificateToolbar
                searchTerm={
                  searchTerm
                }
                setSearchTerm={
                  setSearchTerm
                }
                activeFilter={
                  activeFilter
                }
                setActiveFilter={
                  setActiveFilter
                }
              />

              {/* RESULTS INFO */}

              <div className="mt-5 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                  <span className="font-black text-slate-950">
                    {
                      filteredCertificates.length
                    }
                  </span>{" "}
                  certificate
                  {filteredCertificates.length ===
                  1
                    ? ""
                    : "s"}{" "}
                  found
                </p>

                {(searchTerm ||
                  activeFilter !==
                    "All certificates") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter(
                        "All certificates"
                      );
                    }}
                    className="text-xs font-bold text-[#1769c2] transition active:scale-95"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* CERTIFICATES */}

              {filteredCertificates.length >
              0 ? (
                <section className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-6">
                  {filteredCertificates.map(
                    (
                      certificate
                    ) => (
                      <CertificateCard
                        key={
                          certificate.id
                        }
                        certificate={
                          certificate
                        }
                        onPreview={() =>
                          setSelectedCertificate(
                            certificate
                          )
                        }
                        onDownload={() =>
                          handleDownloadCertificate(
                            certificate
                          )
                        }
                        isDownloading={
                          downloadingCertificateId ===
                          certificate.id
                        }
                      />
                    )
                  )}
                </section>
              ) : (
                <EmptyCertificates
                  filtered={
                    certificates.length >
                    0
                  }
                  onClear={() => {
                    setSearchTerm("");
                    setActiveFilter(
                      "All certificates"
                    );
                  }}
                />
              )}
            </>
          )}
        </section>
      </div>

      {/* PREVIEW */}

      {selectedCertificate && (
        <CertificatePreviewModal
          certificate={
            selectedCertificate
          }
          onClose={() =>
            setSelectedCertificate(
              null
            )
          }
          onDownload={() =>
            handleDownloadCertificate(
              selectedCertificate
            )
          }
          isDownloading={
            downloadingCertificateId ===
            selectedCertificate.id
          }
        />
      )}
    </main>
  );
};

// ========================================
// HERO
// ========================================

const CertificatesHero = ({
  totalCertificates,
  winnerCertificates,
}) => {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-slate-950 px-5 py-7 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-blue-100 backdrop-blur sm:text-xs">
            <Award size={15} />
            Achievement Centre
          </div>

          <h1 className="mt-4 text-[32px] font-black leading-[1.05] tracking-[-0.045em] sm:mt-5 sm:text-4xl lg:text-5xl">
            Your certificates
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            View, preview and download
            certificates earned from your
            hackathons and achievements.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat
            icon={Award}
            label="Total earned"
            value={String(
              totalCertificates
            ).padStart(2, "0")}
          />

          <HeroStat
            icon={Trophy}
            label="Winning awards"
            value={String(
              winnerCertificates
            ).padStart(2, "0")}
          />
        </div>
      </div>
    </section>
  );
};

const HeroStat = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-[20px] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur sm:min-w-[145px] sm:px-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-blue-200">
        <Icon size={15} />
      </div>

      <p className="mt-3 text-[10px] font-semibold text-slate-300 sm:text-xs">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
};

// ========================================
// TOOLBAR
// ========================================

const CertificateToolbar = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <section className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_7px_25px_rgba(15,23,42,0.045)] sm:mt-7 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        {/* SEARCH */}

        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
            placeholder="Search certificate..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-10 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#1769c2] focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() =>
                setSearchTerm("")
              }
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition active:scale-90 hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* FILTERS */}

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {filterOptions.map(
            (filter) => {
              const active =
                activeFilter ===
                filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setActiveFilter(
                      filter
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
                        ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
                    }
                  `}
                >
                  {filter}
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
// CERTIFICATE CARD
// ========================================

const CertificateCard = ({
  certificate,
  onPreview,
  onDownload,
  isDownloading,
}) => {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)] transition-all duration-300 active:scale-[0.995] sm:hover:-translate-y-1 sm:hover:border-blue-200 sm:hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
      {/* VISUAL */}

      <div className="p-3 sm:p-5">
        <CertificateVisual
          certificate={
            certificate
          }
          compact
        />
      </div>

      {/* DETAILS */}

      <div className="border-t border-slate-100 px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] sm:text-[10px] ${getCertificateBadge(
              certificate.certificateType
            )}`}
          >
            {
              certificate.certificateType
            }
          </span>

          <span className="text-[10px] font-medium text-slate-400 sm:text-xs">
            Issued{" "}
            {formatDate(
              certificate.issuedDate,
              true
            )}
          </span>
        </div>

        <h2 className="mt-3 line-clamp-2 text-lg font-black tracking-[-0.02em] text-slate-950 sm:text-xl">
          {certificate.hackathonName}
        </h2>

        <p className="mt-1 truncate text-xs font-semibold text-slate-500">
          Team:{" "}
          {certificate.teamName}
        </p>

        <div className="mt-4 flex min-w-0 items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-[10px] text-slate-500 sm:text-xs">
          <ShieldCheck
            size={14}
            className="shrink-0 text-emerald-600"
          />

          <span className="min-w-0 truncate">
            {certificate.verificationId}
          </span>
        </div>

        {/* ACTIONS */}

        <div className="mt-5 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:gap-3">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-all active:scale-[0.97] hover:border-blue-200 hover:bg-blue-50 hover:text-[#1769c2]"
          >
            <Eye size={16} />
            Preview
          </button>

          <button
            type="button"
            onClick={onDownload}
            disabled={
              isDownloading
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-4 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.97] hover:bg-[#125aa7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDownloading ? (
              <>
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />

                Preparing...
              </>
            ) : (
              <>
                <Download
                  size={16}
                />

                Download
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

// ========================================
// CERTIFICATE VISUAL
// ========================================

const CertificateVisual = ({
  certificate,
  compact = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden border border-slate-200 bg-[#fffdf8] shadow-sm ${
        compact
          ? "aspect-[1.414/1] rounded-[18px]"
          : "aspect-[1.414/1] w-full rounded-[20px]"
      }`}
    >
      {/* BORDERS */}

      <div className="absolute inset-[6px] border border-slate-300 sm:inset-2" />

      <div className="absolute inset-[9px] border border-blue-600/40 sm:inset-3" />

      {/* CORNERS */}

      <div className="absolute -left-14 -top-14 h-32 w-32 rotate-45 bg-[#1769c2] sm:h-36 sm:w-36" />

      <div className="absolute -bottom-14 -right-14 h-32 w-32 rotate-45 bg-slate-950 sm:h-36 sm:w-36" />

      {/* BRAND */}

      <div
        className={`absolute left-4 top-4 flex items-center gap-2 ${
          compact
            ? "sm:left-6 sm:top-5"
            : "left-7 top-6"
        }`}
      >
        <div
          className={`flex items-center justify-center rounded-full bg-slate-950 font-black text-white ${
            compact
              ? "h-6 w-6 text-[8px] sm:h-8 sm:w-8 sm:text-[10px]"
              : "h-10 w-10 text-xs"
          }`}
        >
          H
        </div>

        <div>
          <p
            className={`font-black tracking-[0.12em] text-slate-950 ${
              compact
                ? "text-[6px] sm:text-[9px]"
                : "text-xs"
            }`}
          >
            HACKON
          </p>

          <p
            className={`text-slate-400 ${
              compact
                ? "text-[4px] sm:text-[6px]"
                : "text-[8px]"
            }`}
          >
            BUILD. INNOVATE. IMPACT.
          </p>
        </div>
      </div>

      {/* CONTENT */}

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center sm:px-10">
        <p
          className={`font-black uppercase tracking-[0.18em] text-[#1769c2] ${
            compact
              ? "text-[6px] sm:text-[9px]"
              : "text-xs"
          }`}
        >
          {
            certificate.certificateType
          }{" "}
          certificate
        </p>

        <h3
          className={`font-serif font-bold tracking-[-0.025em] text-slate-950 ${
            compact
              ? "mt-1.5 text-[13px] sm:mt-2 sm:text-xl"
              : "mt-4 text-3xl"
          }`}
        >
          Certificate of Achievement
        </h3>

        <p
          className={`text-slate-400 ${
            compact
              ? "mt-1 text-[5px] sm:mt-2 sm:text-xs"
              : "mt-2 text-xs"
          }`}
        >
          This certificate is proudly
          presented to
        </p>

        <p
          className={`max-w-[80%] truncate font-serif font-bold italic text-slate-950 ${
            compact
              ? "mt-1 text-[12px] sm:text-xl"
              : "mt-3 text-3xl"
          }`}
        >
          {certificate.participantName}
        </p>

        <div
          className={`bg-[#1769c2] ${
            compact
              ? "mt-1 h-px w-24 sm:mt-2 sm:w-40"
              : "mt-2 h-px w-40"
          }`}
        />

        <p
          className={`max-w-[76%] leading-relaxed text-slate-500 ${
            compact
              ? "mt-1 text-[4.5px] sm:mt-2 sm:text-[8px]"
              : "mt-4 text-xs"
          }`}
        >
          {
            certificate.achievement
          }{" "}
          at{" "}
          <strong>
            {
              certificate.hackathonName
            }
          </strong>
          .
        </p>

        <p
          className={`font-semibold text-slate-500 ${
            compact
              ? "mt-1 text-[5px] sm:mt-2 sm:text-[8px]"
              : "mt-2 text-xs"
          }`}
        >
          Team:{" "}
          {certificate.teamName}
        </p>

        {/* FOOTER */}

        <div
          className={`absolute left-1/2 flex -translate-x-1/2 items-end justify-between ${
            compact
              ? "bottom-3 w-[70%] text-[4px] sm:bottom-5 sm:text-[7px]"
              : "bottom-6 w-[70%] text-[7px]"
          }`}
        >
          <div className="text-left">
            <p className="font-bold text-slate-800">
              {formatDate(
                certificate.issuedDate,
                compact
              )}
            </p>

            <div
              className={`mt-1 h-px bg-slate-400 ${
                compact
                  ? "w-10 sm:w-20"
                  : "w-20"
              }`}
            />

            <p className="mt-1 text-slate-400">
              Date of issue
            </p>
          </div>

          <div className="text-right">
            <p
              className={`max-w-[80px] truncate font-bold text-slate-800 sm:max-w-none`}
            >
              {
                certificate.organizer
              }
            </p>

            <div
              className={`ml-auto mt-1 h-px bg-slate-400 ${
                compact
                  ? "w-10 sm:w-20"
                  : "w-20"
              }`}
            />

            <p className="mt-1 text-slate-400">
              Authorized organizer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// PREVIEW MODAL
// ========================================

const CertificatePreviewModal = ({
  certificate,
  onClose,
  onDownload,
  isDownloading,
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      {/* OVERLAY */}

      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Close certificate preview"
      />

      <section className="relative z-10 mt-auto flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:my-auto sm:rounded-[28px]">
        {/* MOBILE HANDLE */}

        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-slate-300" />
        </div>

        {/* HEADER */}

        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2]">
              Certificate
            </p>

            <h2 className="mt-1 font-black text-slate-950 sm:text-lg">
              Certificate preview
            </h2>

            <p className="mt-1 truncate text-[10px] text-slate-400 sm:text-xs">
              {
                certificate.verificationId
              }
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition active:scale-90 hover:bg-red-50 hover:text-red-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* PREVIEW */}

        <div className="min-h-0 flex-1 overflow-y-auto bg-slate-100 p-3 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-[900px]">
            <CertificateVisual
              certificate={
                certificate
              }
            />
          </div>

          {/* MOBILE DETAILS */}

          <div className="mx-auto mt-4 max-w-[900px] rounded-2xl border border-slate-200 bg-white p-4 sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              <PreviewDetail
                label="Type"
                value={
                  certificate.certificateType
                }
              />

              <PreviewDetail
                label="Issued"
                value={formatDate(
                  certificate.issuedDate,
                  true
                )}
              />

              <PreviewDetail
                label="Team"
                value={
                  certificate.teamName
                }
              />

              <PreviewDetail
                label="Organizer"
                value={
                  certificate.organizer
                }
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}

        <div className="shrink-0 border-t border-slate-200 bg-white p-4 sm:flex sm:items-center sm:justify-between sm:px-6">
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-slate-700">
              Verification ID
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {
                certificate.verificationId
              }
            </p>
          </div>

          <button
            type="button"
            onClick={onDownload}
            disabled={
              isDownloading
            }
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-6 text-sm font-bold text-white shadow-sm transition-all active:scale-[0.97] hover:bg-[#125aa7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isDownloading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />

                Preparing PDF...
              </>
            ) : (
              <>
                <Download
                  size={17}
                />

                Download PDF
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

const PreviewDetail = ({
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-xl bg-slate-50 p-3">
      <p className="text-[9px] font-black uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      <p
        className="mt-1 truncate text-xs font-bold text-slate-800"
        title={value}
      >
        {value || "-"}
      </p>
    </div>
  );
};

// ========================================
// EMPTY
// ========================================

const EmptyCertificates = ({
  filtered = false,
  onClear,
}) => {
  return (
    <section className="mt-5 rounded-[26px] border border-dashed border-slate-300 bg-white px-5 py-12 text-center sm:mt-7 sm:px-6 sm:py-16">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Award size={22} />
      </div>

      <h2 className="mt-5 text-xl font-black tracking-[-0.02em] text-slate-950">
        {filtered
          ? "No matching certificates"
          : "No certificates found"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {filtered
          ? "Search ya filter change karke dobara try karo."
          : "Judge/Admin certificate generate karne ke baad tumhara certificate yahan show hoga."}
      </p>

      {filtered && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-[#1769c2]"
        >
          Clear filters
        </button>
      )}
    </section>
  );
};

// ========================================
// HELPERS
// ========================================

const getCertificateBadge = (
  type
) => {
  switch (type) {
    case "Winner":
      return "bg-amber-50 text-amber-700";

    case "First Runner-up":
      return "bg-slate-100 text-slate-700";

    case "Second Runner-up":
      return "bg-orange-50 text-orange-700";

    case "Finalist":
      return "bg-violet-50 text-violet-700";

    case "Participation":
      return "bg-blue-50 text-blue-700";

    default:
      return "bg-blue-50 text-blue-700";
  }
};

const formatDate = (
  date,
  short = false
) => {
  if (!date) {
    return "No date";
  }

  const parsed =
    new Date(date);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "No date";
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month:
        short
          ? "short"
          : "long",
      year: "numeric",
    }
  );
};

export default Certificates;