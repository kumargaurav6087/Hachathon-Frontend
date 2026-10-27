"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Compass,
  FileText,
  HeartHandshake,
  Layers,
  Lightbulb,
  LoaderCircle,
  MapPin,
  Send,
  Sparkles,
  Users,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";
import {
  reportCommunityProblem,
  SOCIAL_INNOVATION_CATEGORIES,
} from "@/lib/problemApi";
import { getAllHackathons } from "@/lib/hackathonApi";

const RaiseProblemPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Environment",
    difficulty: "medium",
    location: "",
    impactArea: "",
    submittedByRole: "community_member",
    hackathonId: "",
  });

  const [hackathons, setHackathons] = useState([]);
  const [loadingHackathons, setLoadingHackathons] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadHackathons = async () => {
      try {
        setLoadingHackathons(true);
        const res = await getAllHackathons();
        setHackathons(res?.hackathons || []);
      } catch (err) {
        console.warn("Could not load hackathons for problem association:", err.message);
      } finally {
        setLoadingHackathons(false);
      }
    };
    loadHackathons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);

    const token = localStorage.getItem("hackon_token");
    if (!token) {
      setError("Please login or create an account first to report a community problem.");
      return;
    }

    if (!form.title.trim()) {
      setError("Please provide a title for the community problem.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please provide a detailed description of the community issue.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await reportCommunityProblem({
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        difficulty: form.difficulty,
        location: form.location.trim() || "Community Wide",
        impactArea: form.impactArea.trim() || "Local Citizens",
        submittedByRole: form.submittedByRole,
        hackathonId: form.hackathonId || null,
      });

      setSuccess(res.problem);
      setForm({
        title: "",
        description: "",
        category: "Environment",
        difficulty: "medium",
        location: "",
        impactArea: "",
        submittedByRole: "community_member",
        hackathonId: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit community problem. Please check your network.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <Sidebar />
      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          {/* Back link */}
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-violet-600"
          >
            <ArrowLeft size={16} />
            Back to Challenges
          </Link>

          {/* Page Title */}
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-violet-700">
              <HeartHandshake size={14} />
              Community Voice for Social Innovation
            </div>

            <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Report a Real-World Community Problem
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
              Give your local community a voice. Whether it is plastic waste accumulation, school resource disparity,
              or rural healthcare access, describe the challenge and student innovators will build solutions.
            </p>
          </div>

          {/* Success Banner */}
          {success && (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="shrink-0 text-emerald-600" />
                <div className="flex-1">
                  <h3 className="font-black text-emerald-900">Problem Reported Successfully!</h3>
                  <p className="mt-1 text-sm text-emerald-700">
                    &ldquo;{success.title}&rdquo; has been published in the community innovation pool. Innovator teams can now
                    discover it and collaborate on tech solutions.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href={`/problems/${success._id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                      View Challenge Details
                    </Link>
                    <Link
                      href="/explore"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100"
                    >
                      Browse All Challenges
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              <AlertCircle size={20} className="shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Main Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
          >
            <div className="space-y-6">
              {/* Problem Title */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Problem Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Inadequate segregation and collection of dry & wet waste in community markets"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              {/* Category & Reporter Role */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Social Innovation Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  >
                    {SOCIAL_INNOVATION_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    I am Reporting As
                  </label>
                  <select
                    name="submittedByRole"
                    value={form.submittedByRole}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="community_member">Local Resident / Citizen</option>
                    <option value="student">Student / Innovator</option>
                    <option value="ngo">NGO / Non-Profit Representative</option>
                    <option value="social_worker">Social Worker / Educator</option>
                    <option value="innovator">Domain Expert</option>
                  </select>
                </div>
              </div>

              {/* Location & Impact Group */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Location / Region Affected
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g. Ward 12, Pune or Rural Satara"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                    />
                    <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Target Beneficiaries
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      name="impactArea"
                      value={form.impactArea}
                      onChange={handleChange}
                      placeholder="e.g. Daily commuters, Farmers, Elderly"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                    />
                    <Users size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Urgency / Difficulty & Associated Hackathon */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Challenge Difficulty / Scope
                  </label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="easy">Easy (Immediate awareness or simple mobile tool)</option>
                    <option value="medium">Medium (App + Workflow / Hardware prototype)</option>
                    <option value="hard">Hard (Advanced AI, IoT sensors, or systemic civic platform)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    Associate with Hackathon (Optional)
                  </label>
                  <select
                    name="hackathonId"
                    value={form.hackathonId}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="">-- General Community Challenge (Open Pool) --</option>
                    {hackathons.map((h) => (
                      <option key={h._id || h.id} value={h._id || h.id}>
                        {h.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                  Detailed Problem Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Describe the root causes, who suffers most, how current manual efforts fail, and what kind of mobile/web/IoT prototype would make an immediate difference."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium leading-relaxed text-slate-900 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 text-sm font-black text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-700 hover:to-purple-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" />
                      Publishing Challenge...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Publish Community Problem
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  Submissions are reviewed by community moderators and published for student innovators.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default RaiseProblemPage;
