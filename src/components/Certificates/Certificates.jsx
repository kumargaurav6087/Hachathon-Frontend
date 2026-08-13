"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  Award,
  CheckCircle2,
  Download,
  Eye,
  LoaderCircle,
  Search,
  ShieldCheck,
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
    isDownloading,
    setIsDownloading,
  ] = useState(false);

  // ========================================
  // LOAD CERTIFICATES
  // ========================================

  const loadCertificates = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMyCertificates();

      console.log(
        "Certificates API:",
        response
      );

      const currentUser =
        JSON.parse(
          localStorage.getItem(
            "hackon_user"
          ) || "{}"
        );

      const formattedCertificates =
        (
          response.certificates ||
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
            certificate.certificateType,

          achievement:
            certificate.achievement,

          issuedDate:
            certificate.issuedDate,

          verificationId:
            certificate.verificationId,

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
        error.message ||
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
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.certificateType
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.verificationId
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            certificate.teamName
              .toLowerCase()
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
        setIsDownloading(true);

        const { jsPDF } =
          await import("jspdf");

        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = 297;
        const pageHeight = 210;

        // Background
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

        // Outer border
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

        // Inner blue border
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

        // Logo circle
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

        // HackOn
        pdf.setTextColor(
          15,
          23,
          42
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

        // Type
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

        // Heading
        pdf.setTextColor(
          15,
          23,
          42
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

        // Participant name
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
          certificate.participantName,
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

        // Achievement
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

        // Team
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

        // Date
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

        // Organizer
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

        // Verification ID
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

        const safeName =
          certificate.hackathonName
            .replace(
              /[^a-z0-9]/gi,
              "-"
            )
            .toLowerCase();

        pdf.save(
          `${safeName}-${certificate.certificateType
            .replace(/\s+/g, "-")
            .toLowerCase()}-certificate.pdf`
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
        setIsDownloading(false);
      }
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f7fb]">
        <Sidebar />

        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <LoaderCircle
                size={38}
                className="mx-auto animate-spin text-blue-700"
              />

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading certificates...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="mx-auto max-w-[1400px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">

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
            <div className="mt-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-bold">
                  Certificates load nahi hue
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          {!error && (
            <>
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

              {filteredCertificates.length >
              0 ? (
                <section className="mt-7 grid gap-6 lg:grid-cols-2">
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
                          isDownloading
                        }
                      />
                    )
                  )}
                </section>
              ) : (
                <EmptyCertificates />
              )}
            </>
          )}
        </section>
      </div>

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
            isDownloading
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
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-200 sm:px-9 sm:py-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
            <Award size={17} />
            Achievement centre
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Your certificates
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            View and download
            certificates earned from
            your hackathons.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat
            label="Total earned"
            value={String(
              totalCertificates
            ).padStart(2, "0")}
          />

          <HeroStat
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
  label,
  value,
}) => {
  return (
    <div className="min-w-32 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
      <p className="text-xs font-medium text-slate-300">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">
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
    <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
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
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {filterOptions.map(
            (filter) => (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }
                className={`shrink-0 rounded-xl px-4 py-3 text-xs font-bold transition ${
                  activeFilter ===
                  filter
                    ? "bg-slate-950 text-white"
                    : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {filter}
              </button>
            )
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
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="p-4 sm:p-5">
        <CertificateVisual
          certificate={
            certificate
          }
          compact
        />
      </div>

      <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${getCertificateBadge(
              certificate.certificateType
            )}`}
          >
            {
              certificate.certificateType
            }
          </span>

          <span className="text-xs text-slate-400">
            Issued{" "}
            {formatDate(
              certificate.issuedDate
            )}
          </span>
        </div>

        <h2 className="mt-3 text-lg font-black text-slate-950">
          {
            certificate.hackathonName
          }
        </h2>

        <p className="mt-1 text-xs font-semibold text-slate-500">
          Team:{" "}
          {certificate.teamName}
        </p>

        <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck
            size={14}
          />

          {
            certificate.verificationId
          }
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {isDownloading ? (
              <LoaderCircle
                size={16}
                className="animate-spin"
              />
            ) : (
              <Download
                size={16}
              />
            )}

            {isDownloading
              ? "Preparing..."
              : "Download"}
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
      className={`relative overflow-hidden border border-slate-200 bg-[#fffdf8] ${
        compact
          ? "aspect-[1.414/1] rounded-2xl"
          : "aspect-[1.414/1] w-full rounded-2xl"
      }`}
    >
      <div className="absolute inset-2 border border-slate-300" />

      <div className="absolute inset-3 border border-blue-600/40" />

      <div className="absolute -left-14 -top-14 h-36 w-36 rotate-45 bg-blue-700" />

      <div className="absolute -bottom-14 -right-14 h-36 w-36 rotate-45 bg-slate-950" />

      <div className="relative flex h-full flex-col items-center justify-center px-10 text-center">
        <p
          className={`font-black uppercase tracking-[0.18em] text-blue-700 ${
            compact
              ? "text-[7px] sm:text-[9px]"
              : "text-xs"
          }`}
        >
          {
            certificate.certificateType
          }{" "}
          certificate
        </p>

        <h3
          className={`font-serif font-bold text-slate-950 ${
            compact
              ? "mt-2 text-base sm:text-xl"
              : "mt-4 text-3xl"
          }`}
        >
          Certificate of Achievement
        </h3>

        <p className="mt-2 text-[8px] text-slate-400 sm:text-xs">
          This certificate is proudly
          presented to
        </p>

        <p
          className={`font-serif font-bold italic text-slate-950 ${
            compact
              ? "mt-1 text-base sm:text-xl"
              : "mt-3 text-3xl"
          }`}
        >
          {
            certificate.participantName
          }
        </p>

        <div className="mt-2 h-px w-40 bg-blue-700" />

        <p
          className={`max-w-[75%] leading-relaxed text-slate-500 ${
            compact
              ? "mt-2 text-[6px] sm:text-[8px]"
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
          className={`mt-2 font-semibold text-slate-500 ${
            compact
              ? "text-[6px] sm:text-[8px]"
              : "text-xs"
          }`}
        >
          Team:{" "}
          {certificate.teamName}
        </p>

        <div className="absolute bottom-6 left-1/2 flex w-[70%] -translate-x-1/2 items-end justify-between text-[7px]">
          <div>
            <p className="font-bold text-slate-800">
              {formatDate(
                certificate.issuedDate
              )}
            </p>

            <div className="mt-1 h-px w-20 bg-slate-400" />

            <p className="mt-1 text-slate-400">
              Date of issue
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800">
              {
                certificate.organizer
              }
            </p>

            <div className="mt-1 h-px w-20 bg-slate-400" />

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Close"
      />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="font-black text-slate-950">
              Certificate preview
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {
                certificate.verificationId
              }
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto bg-slate-100 p-4 sm:p-8">
          <CertificateVisual
            certificate={
              certificate
            }
          />
        </div>

        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onDownload}
            disabled={
              isDownloading
            }
            className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white"
          >
            <Download
              size={16}
            />

            {isDownloading
              ? "Preparing..."
              : "Download PDF"}
          </button>
        </div>
      </section>
    </div>
  );
};

// ========================================
// EMPTY
// ========================================

const EmptyCertificates = () => {
  return (
    <section className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <Award size={22} />
      </div>

      <h2 className="mt-5 text-xl font-black text-slate-950">
        No certificates found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Judge/Admin certificate
        generate karne ke baad tumhara
        certificate yahan show hoga.
      </p>
    </section>
  );
};

// ========================================
// HELPERS
// ========================================

const getCertificateBadge = (
  type
) => {
  if (type === "Winner") {
    return "bg-amber-50 text-amber-700";
  }

  if (
    type === "First Runner-up"
  ) {
    return "bg-slate-100 text-slate-700";
  }

  if (
    type ===
    "Second Runner-up"
  ) {
    return "bg-orange-50 text-orange-700";
  }

  if (type === "Finalist") {
    return "bg-violet-50 text-violet-700";
  }

  return "bg-blue-50 text-blue-700";
};

const formatDate = (date) => {
  if (!date) {
    return "No date";
  }

  return new Date(
    date
  ).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );
};

export default Certificates;