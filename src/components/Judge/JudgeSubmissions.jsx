"use client";

import { useEffect, useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  LoaderCircle,
  RefreshCw,
  Save,
  ShieldCheck,
  Video,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import {
  evaluateSubmission,
  getAllSubmissions,
} from "@/lib/submissionApi";

const JudgeSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setPageError("");

      const response = await getAllSubmissions();

      setSubmissions(response.submissions || []);
    } catch (error) {
      setPageError(
        error.message ||
          "Submissions load nahi hue."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f8fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="mx-auto max-w-[1250px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700">
                <ShieldCheck size={17} />
                Judge Evaluation Panel
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Project Submissions
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Review participant projects, assign scores,
                provide feedback and update submission status.
              </p>
            </div>

            <button
              type="button"
              onClick={loadSubmissions}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>

          {loading && (
            <div className="flex min-h-[350px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="text-center">
                <LoaderCircle
                  size={38}
                  className="mx-auto animate-spin text-[#1769c2]"
                />

                <p className="mt-4 text-sm font-semibold text-slate-500">
                  Loading submissions...
                </p>
              </div>
            </div>
          )}

          {!loading && pageError && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
              <AlertCircle
                size={32}
                className="mx-auto text-red-600"
              />

              <h2 className="mt-4 text-lg font-black text-slate-950">
                Submissions load nahi hue
              </h2>

              <p className="mt-2 text-sm text-red-600">
                {pageError}
              </p>
            </div>
          )}

          {!loading &&
            !pageError &&
            submissions.length === 0 && (
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <h2 className="text-xl font-black text-slate-950">
                  No submissions yet
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Participants ke submissions yahan show honge.
                </p>
              </div>
            )}

          {!loading &&
            !pageError &&
            submissions.length > 0 && (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <SubmissionCard
                    key={submission._id}
                    submission={submission}
                    onUpdated={loadSubmissions}
                  />
                ))}
              </div>
            )}
        </section>
      </div>
    </main>
  );
};

const SubmissionCard = ({
  submission,
  onUpdated,
}) => {
  const [score, setScore] = useState(
    submission.score ?? 0
  );

  const [feedback, setFeedback] = useState(
    submission.feedback || ""
  );

  const [status, setStatus] = useState(
    submission.status || "submitted"
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("");

  const handleEvaluate = async () => {
    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const numericScore = Number(score);

      if (
        Number.isNaN(numericScore) ||
        numericScore < 0 ||
        numericScore > 100
      ) {
        setMessage(
          "Score 0 se 100 ke beech hona chahiye."
        );
        setMessageType("error");
        return;
      }

      const response =
        await evaluateSubmission(
          submission._id,
          {
            score: numericScore,
            feedback: feedback.trim(),
            status,
          }
        );

      setMessage(
        response.message ||
          "Submission evaluated successfully."
      );

      setMessageType("success");

      await onUpdated();
    } catch (error) {
      setMessage(
        error.message ||
          "Submission evaluate nahi hua."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const statusClass =
    status === "approved"
      ? "bg-emerald-50 text-emerald-700"
      : status === "rejected"
      ? "bg-red-50 text-red-600"
      : status === "under-review"
      ? "bg-amber-50 text-amber-700"
      : "bg-blue-50 text-blue-700";

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-black text-slate-950">
                {submission.projectTitle}
              </h2>

              <span
                className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wider ${statusClass}`}
              >
                {status}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {submission.projectDescription}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-right">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Current Score
            </p>

            <p className="mt-1 text-2xl font-black text-slate-950">
              {submission.score ?? 0}
              <span className="text-sm text-slate-400">
                /100
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-7 p-6 sm:p-7 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoBox
              label="Team"
              value={
                submission.team?.teamName ||
                "Unknown team"
              }
            />

            <InfoBox
              label="Hackathon"
              value={
                submission.hackathon?.title ||
                "Unknown hackathon"
              }
            />

            <InfoBox
              label="Problem"
              value={
                submission.problemStatement?.title ||
                "Unknown problem"
              }
            />

            <InfoBox
              label="Submitted By"
              value={
                submission.submittedBy?.name ||
                "Unknown user"
              }
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {submission.githubLink && (
              <a
                href={submission.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <GitBranch size={16} />
                GitHub
                <ExternalLink size={14} />
              </a>
            )}

            {submission.demoVideoLink && (
              <a
                href={submission.demoVideoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Video size={16} />
                Demo Video
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
          <h3 className="text-sm font-black text-slate-950">
            Evaluate Submission
          </h3>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Score (0–100)
            </label>

            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(event) =>
                setScore(event.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Status
            </label>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            >
              <option value="submitted">
                Submitted
              </option>

              <option value="under-review">
                Under Review
              </option>

              <option value="approved">
                Approved
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Feedback
            </label>

            <textarea
              value={feedback}
              onChange={(event) =>
                setFeedback(event.target.value)
              }
              rows={5}
              placeholder="Write feedback for the participant..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />
          </div>

          {message && (
            <div
              className={`mt-4 rounded-xl px-3 py-3 text-xs font-semibold ${
                messageType === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="button"
            onClick={handleEvaluate}
            disabled={saving}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-[#1769c2] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Evaluation
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

const InfoBox = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 truncate text-sm font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
};

export default JudgeSubmissions;