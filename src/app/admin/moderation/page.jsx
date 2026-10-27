"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import RoleGuard from "@/components/Auth/RoleGuard";
import { getAllProblems, updateProblemStatus } from "@/lib/problemApi";

const AdminModerationContent = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const loadProblems = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAllProblems({ status: filterStatus });
      setProblems(res?.problems || []);
    } catch (err) {
      setError(err.message || "Failed to load community problems for moderation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProblems();
  }, [filterStatus]);

  const handleStatusChange = async (problemId, newStatus) => {
    try {
      setUpdatingId(problemId);
      setMessage("");
      await updateProblemStatus(problemId, { status: newStatus });
      setMessage(`Problem status successfully updated to "${newStatus}".`);
      await loadProblems();
    } catch (err) {
      setError(err.message || "Failed to update problem status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProblems = problems.filter((p) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return (
      p.title?.toLowerCase().includes(s) ||
      p.category?.toLowerCase().includes(s) ||
      p.location?.toLowerCase().includes(s)
    );
  });

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Sidebar />
      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-800">
                <ShieldCheck size={14} />
                Admin Panel
              </div>
              <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                Community Problem Moderation
              </h1>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Review, approve, and track community challenges submitted by citizens, NGOs, and students.
              </p>
            </div>

            <button
              type="button"
              onClick={loadProblems}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
            >
              <RefreshCw size={14} />
              Refresh Feed
            </button>
          </div>

          {/* Feedback Banners */}
          {message && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-bold text-emerald-800">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-bold text-red-800">
              {error}
            </div>
          )}

          {/* Filter Bar */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
              {["all", "submitted", "under-review", "approved", "prototype", "implemented", "rejected"].map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFilterStatus(st)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${
                      filterStatus === st
                        ? "bg-violet-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                )
              )}
            </div>

            <div className="relative min-w-[200px]">
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs font-medium text-slate-800 outline-none focus:border-violet-500"
              />
              <Search size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>
          </div>

          {/* List of Problems */}
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <LoaderCircle size={36} className="animate-spin text-violet-600" />
            </div>
          ) : filteredProblems.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
              <h3 className="mt-4 font-black text-slate-900">No Problems Found</h3>
              <p className="mt-1 text-xs text-slate-500">
                No problem statements match the selected status filter.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredProblems.map((prob) => {
                const isUpdating = updatingId === prob._id;
                return (
                  <div
                    key={prob._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-black text-violet-800">
                            {prob.category}
                          </span>
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 capitalize">
                            Status: {prob.status || "submitted"}
                          </span>
                          <span className="text-xs text-slate-400">
                            Location: {prob.location || "Community"}
                          </span>
                        </div>

                        <h3 className="mt-2 text-base font-black text-slate-900">
                          {prob.title}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600">
                          {prob.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span>Reported by: {prob.createdBy?.name || "Citizen"}</span>
                          <span>•</span>
                          <span>Role: {prob.submittedByRole || "community_member"}</span>
                          <span>•</span>
                          <span>Upvotes: {prob.upvotes?.length || 0}</span>
                        </div>
                      </div>

                      {/* Moderation Controls */}
                      <div className="flex shrink-0 flex-wrap items-center gap-2 pt-2 sm:pt-0">
                        <Link
                          href={`/problems/${prob._id}`}
                          className="rounded-lg border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:bg-slate-100"
                          title="View Challenge"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        {prob.status !== "approved" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(prob._id, "approved")}
                            className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                        )}

                        {prob.status !== "under-review" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(prob._id, "under-review")}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
                          >
                            Review
                          </button>
                        )}

                        {prob.status !== "prototype" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(prob._id, "prototype")}
                            className="rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-purple-700"
                          >
                            Prototype
                          </button>
                        )}

                        {prob.status !== "rejected" && (
                          <button
                            type="button"
                            disabled={isUpdating}
                            onClick={() => handleStatusChange(prob._id, "rejected")}
                            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

const AdminModerationPage = () => {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <AdminModerationContent />
    </RoleGuard>
  );
};

export default AdminModerationPage;
