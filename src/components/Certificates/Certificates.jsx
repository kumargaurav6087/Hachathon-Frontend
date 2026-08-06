"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const certificateData = [
  {
    id: 1,
    participantName: "Kumar Gaurav",
    hackathonName: "FutureTech AI Hackathon 2026",
    certificateType: "Participation",
    achievement: "Successfully participated in the hackathon",
    issuedDate: "28 July 2026",
    verificationId: "HACKON-FTAI-2026-001",
    organizer: "HackOn Community",
    theme: "blue",
  },
  {
    id: 2,
    participantName: "Kumar Gaurav",
    hackathonName: "GreenCode Sustainability Sprint",
    certificateType: "Winner",
    achievement: "Secured 1st position in the hackathon",
    issuedDate: "16 June 2026",
    verificationId: "HACKON-GCSS-2026-014",
    organizer: "HackOn Community",
    theme: "emerald",
  },
  {
    id: 3,
    participantName: "Kumar Gaurav",
    hackathonName: "India Web3 Innovation Challenge",
    certificateType: "Finalist",
    achievement: "Selected as a grand finalist",
    issuedDate: "10 May 2026",
    verificationId: "HACKON-WEB3-2026-029",
    organizer: "HackOn Community",
    theme: "violet",
  },
  {
    id: 4,
    participantName: "Kumar Gaurav",
    hackathonName: "Smart Education Buildathon",
    certificateType: "Participation",
    achievement: "Successfully completed the hackathon",
    issuedDate: "22 April 2026",
    verificationId: "HACKON-SEB-2026-108",
    organizer: "HackOn Community",
    theme: "amber",
  },
];

const filterOptions = [
  "All certificates",
  "Participation",
  "Winner",
  "Finalist",
];

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] =
    useState("All certificates");
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);
  const [isDownloading, setIsDownloading] =
    useState(false);

  const filteredCertificates = useMemo(() => {
    return certificateData.filter((certificate) => {
      const searchValue = searchTerm.trim().toLowerCase();

      const matchesSearch =
        certificate.hackathonName
          .toLowerCase()
          .includes(searchValue) ||
        certificate.certificateType
          .toLowerCase()
          .includes(searchValue) ||
        certificate.verificationId
          .toLowerCase()
          .includes(searchValue);

      const matchesFilter =
        activeFilter === "All certificates" ||
        certificate.certificateType === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const handleDownloadCertificate = async (certificate) => {
    try {
      setIsDownloading(true);

      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 297;
      const pageHeight = 210;

      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.setDrawColor(15, 23, 42);
      pdf.setLineWidth(1.4);
      pdf.rect(9, 9, pageWidth - 18, pageHeight - 18);

      pdf.setDrawColor(37, 99, 235);
      pdf.setLineWidth(0.5);
      pdf.rect(14, 14, pageWidth - 28, pageHeight - 28);

      pdf.setFillColor(15, 23, 42);
      pdf.circle(38, 36, 15, "F");

      pdf.setTextColor(255, 255, 255);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(12);
      pdf.text("H", 38, 40, {
        align: "center",
      });

      pdf.setTextColor(15, 23, 42);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text("HACKON", 57, 33);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text("BUILD. INNOVATE. IMPACT.", 57, 39);

      pdf.setTextColor(37, 99, 235);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(13);
      pdf.text(
        `${certificate.certificateType.toUpperCase()} CERTIFICATE`,
        pageWidth / 2,
        62,
        {
          align: "center",
        },
      );

      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(29);
      pdf.text("Certificate of Achievement", pageWidth / 2, 78, {
        align: "center",
      });

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(11);
      pdf.text(
        "This certificate is proudly presented to",
        pageWidth / 2,
        95,
        {
          align: "center",
        },
      );

      pdf.setFont("times", "bolditalic");
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(26);
      pdf.text(
        certificate.participantName,
        pageWidth / 2,
        114,
        {
          align: "center",
        },
      );

      pdf.setDrawColor(37, 99, 235);
      pdf.setLineWidth(0.6);
      pdf.line(82, 120, 215, 120);

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(71, 85, 105);
      pdf.setFontSize(11);

      const achievementText = `${certificate.achievement} at ${certificate.hackathonName}.`;

      const wrappedAchievement = pdf.splitTextToSize(
        achievementText,
        180,
      );

      pdf.text(
        wrappedAchievement,
        pageWidth / 2,
        136,
        {
          align: "center",
        },
      );

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(10);
      pdf.text(certificate.issuedDate, 61, 168, {
        align: "center",
      });

      pdf.setDrawColor(148, 163, 184);
      pdf.setLineWidth(0.3);
      pdf.line(31, 173, 91, 173);

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(8);
      pdf.text("Date of issue", 61, 179, {
        align: "center",
      });

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(15, 23, 42);
      pdf.setFontSize(10);
      pdf.text(certificate.organizer, 236, 168, {
        align: "center",
      });

      pdf.setDrawColor(148, 163, 184);
      pdf.line(206, 173, 266, 173);

      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      pdf.setFontSize(8);
      pdf.text("Authorized organizer", 236, 179, {
        align: "center",
      });

      pdf.setFillColor(239, 246, 255);
      pdf.roundedRect(107, 185, 83, 9, 2, 2, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(37, 99, 235);
      pdf.setFontSize(7);
      pdf.text(
        `Verification ID: ${certificate.verificationId}`,
        pageWidth / 2,
        190.5,
        {
          align: "center",
        },
      );

      const safeFileName = certificate.hackathonName
        .replace(/[^a-z0-9]/gi, "-")
        .toLowerCase();

      pdf.save(`${safeFileName}-certificate.pdf`);
    } catch (error) {
      console.error("Certificate download failed:", error);
      alert(
        "Certificate download nahi hua. Package installation check karo.",
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-19">
        <Header />

        <section className="mx-auto max-w-350 px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          <CertificatesHero
            totalCertificates={certificateData.length}
            winnerCertificates={
              certificateData.filter(
                (certificate) =>
                  certificate.certificateType === "Winner",
              ).length
            }
          />

          <CertificateToolbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          {filteredCertificates.length > 0 ? (
            <section className="mt-7 grid gap-6 lg:grid-cols-2">
              {filteredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onPreview={() =>
                    setSelectedCertificate(certificate)
                  }
                  onDownload={() =>
                    handleDownloadCertificate(certificate)
                  }
                  isDownloading={isDownloading}
                />
              ))}
            </section>
          ) : (
            <EmptyCertificates />
          )}
        </section>
      </div>

      {selectedCertificate && (
        <CertificatePreviewModal
          certificate={selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          onDownload={() =>
            handleDownloadCertificate(selectedCertificate)
          }
          isDownloading={isDownloading}
        />
      )}
    </main>
  );
};

const CertificatesHero = ({
  totalCertificates,
  winnerCertificates,
}) => {
  return (
    <section className="relative overflow-hidden rounded-4xl bg-slate-950 px-6 py-8 text-white shadow-xl shadow-slate-200 sm:px-9 sm:py-10">
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold text-blue-100">
            <AwardIcon />
            Achievement centre
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Your certificates
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            View, verify and download certificates earned from
            hackathons and innovation challenges.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <HeroStat
            label="Total earned"
            value={String(totalCertificates).padStart(2, "0")}
          />

          <HeroStat
            label="Winning awards"
            value={String(winnerCertificates).padStart(2, "0")}
          />
        </div>
      </div>
    </section>
  );
};

const HeroStat = ({ label, value }) => {
  return (
    <div className="min-w-32 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
      <p className="text-xs font-medium text-slate-300">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
};

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
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search by hackathon or verification ID..."
            className="h-12.5 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 xl:pb-0">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-xl px-4 py-3 text-xs font-bold transition ${
                activeFilter === filter
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-200"
                  : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const CertificateCard = ({
  certificate,
  onPreview,
  onDownload,
  isDownloading,
}) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="p-4 sm:p-5">
        <CertificateVisual certificate={certificate} compact />
      </div>

      <div className="border-t border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${getCertificateBadge(
                  certificate.certificateType,
                )}`}
              >
                {certificate.certificateType}
              </span>

              <span className="text-xs text-slate-400">
                Issued {certificate.issuedDate}
              </span>
            </div>

            <h2 className="mt-3 text-lg font-black tracking-tight text-slate-950">
              {certificate.hackathonName}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <VerifyIcon />
              {certificate.verificationId}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPreview}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <EyeIcon />
            Preview
          </button>

          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <DownloadIcon />
            {isDownloading ? "Preparing..." : "Download"}
          </button>
        </div>
      </div>
    </article>
  );
};

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

      <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border-4 border-amber-300 bg-amber-100 text-xs font-black text-amber-800 shadow-sm">
        H
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-10 text-center">
        <p
          className={`font-black uppercase tracking-[0.22em] text-blue-700 ${
            compact ? "text-[7px] sm:text-[9px]" : "text-xs"
          }`}
        >
          {certificate.certificateType} certificate
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

        <p
          className={`text-slate-400 ${
            compact
              ? "mt-2 text-[6px] sm:text-[8px]"
              : "mt-5 text-xs"
          }`}
        >
          This certificate is proudly presented to
        </p>

        <p
          className={`font-serif font-bold italic text-slate-950 ${
            compact
              ? "mt-1 text-base sm:text-xl"
              : "mt-3 text-3xl"
          }`}
        >
          {certificate.participantName}
        </p>

        <div
          className={`bg-blue-700 ${
            compact
              ? "mt-1 h-px w-32 sm:w-44"
              : "mt-3 h-px w-64"
          }`}
        />

        <p
          className={`max-w-[75%] leading-relaxed text-slate-500 ${
            compact
              ? "mt-2 text-[6px] sm:text-[8px]"
              : "mt-4 text-xs"
          }`}
        >
          {certificate.achievement} at{" "}
          <strong>{certificate.hackathonName}</strong>.
        </p>

        <div
          className={`absolute bottom-6 left-1/2 flex w-[70%] -translate-x-1/2 items-end justify-between ${
            compact ? "text-[6px] sm:text-[7px]" : "text-[10px]"
          }`}
        >
          <div>
            <p className="font-bold text-slate-800">
              {certificate.issuedDate}
            </p>
            <div className="mt-1 h-px w-16 bg-slate-400 sm:w-24" />
            <p className="mt-1 text-slate-400">
              Date of issue
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-800">
              {certificate.organizer}
            </p>
            <div className="mt-1 h-px w-16 bg-slate-400 sm:w-24" />
            <p className="mt-1 text-slate-400">
              Authorized organizer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificatePreviewModal = ({
  certificate,
  onClose,
  onDownload,
  isDownloading,
}) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close preview"
      />

      <section className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-black text-slate-950">
              Certificate preview
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {certificate.verificationId}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-500 transition hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto bg-slate-100 p-4 sm:p-8">
          <CertificateVisual certificate={certificate} />
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-slate-400">
            Certificate authenticity can be checked using the
            verification ID.
          </p>

          <button
            type="button"
            onClick={onDownload}
            disabled={isDownloading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            <DownloadIcon />
            {isDownloading
              ? "Preparing PDF..."
              : "Download PDF"}
          </button>
        </div>
      </section>
    </div>
  );
};

const EmptyCertificates = () => {
  return (
    <section className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        <AwardIcon />
      </div>

      <h2 className="mt-5 text-xl font-black text-slate-950">
        No certificates found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Search term ya selected filter ke according koi
        certificate available nahi hai.
      </p>
    </section>
  );
};

const getCertificateBadge = (type) => {
  if (type === "Winner") {
    return "bg-amber-50 text-amber-700";
  }

  if (type === "Finalist") {
    return "bg-violet-50 text-violet-700";
  }

  return "bg-blue-50 text-blue-700";
};

/*
  Inline SVG icons use kiye hain, isliye lucide-react
  export/version wala error nahi aayega.
*/

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const AwardIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M8.2 13 7 22l5-3 5 3-1.2-9" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 3v12" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 21h14" />
  </svg>
);

const VerifyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default Certificates;