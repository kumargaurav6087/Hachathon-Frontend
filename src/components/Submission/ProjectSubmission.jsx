"use client";

import { useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  GitBranch,
  Globe2,
  Layers3,
  LoaderCircle,
  Plus,
  Send,
  Target,
  Trash2,
  UploadCloud,
  Users,
  Video,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

const initialForm = {
  teamName: "",
  teamDescription: "",
  problemStatement: "",
  track: "",
  githubUrl: "",
  liveUrl: "",
  youtubeUrl: "",
  presentationUrl: "",
  agree: false,
};

const ProjectSubmission = () => {
  const [formData, setFormData] = useState(initialForm);
  const [technologyInput, setTechnologyInput] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      submit: "",
    }));
  };

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) {
      return;
    }

    const technologyAlreadyExists = technologies.some(
      (technology) =>
        technology.toLowerCase() === value.toLowerCase(),
    );

    if (technologyAlreadyExists) {
      setTechnologyInput("");
      return;
    }

    if (technologies.length >= 10) {
      setErrors((current) => ({
        ...current,
        technologies:
          "Maximum 10 technologies add kar sakte ho.",
      }));

      return;
    }

    setTechnologies((current) => [...current, value]);
    setTechnologyInput("");

    setErrors((current) => ({
      ...current,
      technologies: "",
    }));
  };

  const handleTechnologyKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTechnology();
    }
  };

  const removeTechnology = (technologyToRemove) => {
    setTechnologies((current) =>
      current.filter(
        (technology) => technology !== technologyToRemove,
      ),
    );
  };

  const isValidUrl = (value) => {
    try {
      const parsedUrl = new URL(value);

      return (
        parsedUrl.protocol === "http:" ||
        parsedUrl.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const teamName = formData.teamName.trim();
    const teamDescription = formData.teamDescription.trim();
    const githubUrl = formData.githubUrl.trim();
    const liveUrl = formData.liveUrl.trim();
    const youtubeUrl = formData.youtubeUrl.trim();
    const presentationUrl =
      formData.presentationUrl.trim();

    if (!teamName) {
      newErrors.teamName = "Team name required hai.";
    } else if (teamName.length < 3) {
      newErrors.teamName =
        "Team name minimum 3 characters ka hona chahiye.";
    }

    if (!teamDescription) {
      newErrors.teamDescription =
        "Team description required hai.";
    } else if (teamDescription.length < 20) {
      newErrors.teamDescription =
        "Description minimum 20 characters ki honi chahiye.";
    }

    if (!formData.problemStatement) {
      newErrors.problemStatement =
        "Problem statement select karo.";
    }

    if (!formData.track) {
      newErrors.track = "Track select karo.";
    }

    if (technologies.length === 0) {
      newErrors.technologies =
        "Kam se kam ek technology add karo.";
    }

    if (!githubUrl) {
      newErrors.githubUrl =
        "GitHub repository link required hai.";
    } else if (!isValidUrl(githubUrl)) {
      newErrors.githubUrl =
        "Valid GitHub repository URL enter karo.";
    } else if (!githubUrl.includes("github.com")) {
      newErrors.githubUrl =
        "GitHub.com ka repository link enter karo.";
    }

    if (liveUrl && !isValidUrl(liveUrl)) {
      newErrors.liveUrl =
        "Valid live project URL enter karo.";
    }

    if (youtubeUrl && !isValidUrl(youtubeUrl)) {
      newErrors.youtubeUrl =
        "Valid YouTube URL enter karo.";
    }

    if (
      presentationUrl &&
      !isValidUrl(presentationUrl)
    ) {
      newErrors.presentationUrl =
        "Valid Google Drive ya Dropbox URL enter karo.";
    }

    if (!formData.agree) {
      newErrors.agree =
        "Submission declaration accept karna required hai.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess(false);

    const isFormValid = validateForm();

    if (!isFormValid) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSubmitting(true);

    const submissionData = {
      ...formData,
      teamName: formData.teamName.trim(),
      teamDescription:
        formData.teamDescription.trim(),
      githubUrl: formData.githubUrl.trim(),
      liveUrl: formData.liveUrl.trim(),
      youtubeUrl: formData.youtubeUrl.trim(),
      presentationUrl:
        formData.presentationUrl.trim(),
      technologies,
    };

    try {
      console.log("Submission data:", submissionData);

      // Backend API ready hone ke baad is code ko uncomment karna.
      /*
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Project submission failed",
        );
      }
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 1400),
      );

      setSuccess(true);
      setFormData(initialForm);
      setTechnologyInput("");
      setTechnologies([]);
      setErrors({});

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Submission error:", error);

      setErrors((current) => ({
        ...current,
        submit:
          error.message ||
          "Project submit nahi hua. Dobara try karo.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-19">
        <Header />

        <section className="mx-auto max-w-245 px-5 py-12 sm:px-7 lg:py-16">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#1769c2]">
              <UploadCloud size={17} />
              Project Submission Portal
            </div>

            <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Submit your project
                </h1>

                <p className="mt-3 max-w-[650px] text-base leading-7 text-slate-500">
                  Complete all project details carefully. You
                  can edit your submission before the final
                  deadline.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-700">
                <p className="font-bold">Submission status</p>
                <p className="mt-1 text-xs">
                  Draft not submitted
                </p>
              </div>
            </div>
          </div>

          {success && (
            <div className="mb-7 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
              <CheckCircle2
                className="mt-0.5 shrink-0"
                size={21}
              />

              <div>
                <p className="font-bold">
                  Project submitted successfully!
                </p>

                <p className="mt-1 text-sm text-emerald-700">
                  Tumhari submission review ke liye bhej di
                  gayi hai.
                </p>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="mb-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
              <AlertCircle
                className="mt-0.5 shrink-0"
                size={21}
              />

              <p className="text-sm font-medium">
                {errors.submit}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <FormSection
              icon={Users}
              number="01"
              title="Team Information"
              description="Tell us about your team and its members."
            >
              <div className="grid gap-6">
                <FormField
                  label="Team Name"
                  required
                  error={errors.teamName}
                >
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="e.g. CodeCrafters"
                    className={getInputClass(
                      errors.teamName,
                    )}
                  />
                </FormField>

                <FormField
                  label="Team Description"
                  required
                  error={errors.teamDescription}
                >
                  <textarea
                    name="teamDescription"
                    value={formData.teamDescription}
                    onChange={handleChange}
                    maxLength={500}
                    rows={5}
                    placeholder="Tell judges about your team, backgrounds, roles and what drives you..."
                    className={`${getInputClass(
                      errors.teamDescription,
                    )} h-auto min-h-32.5 resize-none py-4`}
                  />

                  <p className="mt-2 text-right text-xs text-slate-400">
                    {formData.teamDescription.length}/500
                  </p>
                </FormField>
              </div>
            </FormSection>

            <FormSection
              icon={Target}
              number="02"
              title="Problem Statement & Track"
              description="Choose the challenge you are solving."
            >
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  label="Problem Statement"
                  required
                  error={errors.problemStatement}
                >
                  <div className="relative">
                    <select
                      name="problemStatement"
                      value={formData.problemStatement}
                      onChange={handleChange}
                      className={`${getInputClass(
                        errors.problemStatement,
                      )} appearance-none pr-12`}
                    >
                      <option value="">
                        Select a problem statement
                      </option>

                      <option value="ai-healthcare">
                        AI for Better Healthcare
                      </option>

                      <option value="smart-education">
                        Smart Education Platform
                      </option>

                      <option value="climate-action">
                        Technology for Climate Action
                      </option>

                      <option value="fintech">
                        Inclusive FinTech Solution
                      </option>
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </FormField>

                <FormField
                  label="Track"
                  required
                  error={errors.track}
                >
                  <div className="relative">
                    <select
                      name="track"
                      value={formData.track}
                      onChange={handleChange}
                      className={`${getInputClass(
                        errors.track,
                      )} appearance-none pr-12`}
                    >
                      <option value="">
                        Select your track
                      </option>

                      <option value="ai-ml">
                        AI / ML
                      </option>

                      <option value="web-development">
                        Web Development
                      </option>

                      <option value="blockchain">
                        Blockchain
                      </option>

                      <option value="cloud">
                        Cloud Computing
                      </option>

                      <option value="iot">IoT</option>
                    </select>

                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </FormField>
              </div>
            </FormSection>

            <FormSection
              icon={Layers3}
              number="03"
              title="Technology Stack"
              description="Add the technologies used to build your project."
            >
              <FormField
                label="Technologies"
                required
                error={errors.technologies}
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={technologyInput}
                    onChange={(event) => {
                      setTechnologyInput(event.target.value);

                      setErrors((current) => ({
                        ...current,
                        technologies: "",
                      }));
                    }}
                    onKeyDown={handleTechnologyKeyDown}
                    placeholder="e.g. React, Node.js, TensorFlow"
                    className={getInputClass(
                      errors.technologies,
                    )}
                  />

                  <button
                    type="button"
                    onClick={addTechnology}
                    className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-[#1769c2]"
                    aria-label="Add technology"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Enter, comma ya plus button se technology
                  add karo.
                </p>

                {technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {technologies.map((technology) => (
                      <span
                        key={technology}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold text-[#1769c2]"
                      >
                        {technology}

                        <button
                          type="button"
                          onClick={() =>
                            removeTechnology(technology)
                          }
                          className="transition hover:text-red-500"
                          aria-label={`Remove ${technology}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </FormField>
            </FormSection>

            <FormSection
              icon={Globe2}
              number="04"
              title="Project Links"
              description="Provide links so judges can review your work."
            >
              <div className="grid gap-6">
                <IconInput
                  icon={GitBranch}
                  label="GitHub Repository Link"
                  required
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/project"
                  error={errors.githubUrl}
                />

                <IconInput
                  icon={Globe2}
                  label="Live Demo Link"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  placeholder="https://your-project.vercel.app"
                  error={errors.liveUrl}
                />

                <IconInput
                  icon={Video}
                  label="YouTube Demo Video"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/watch?v=..."
                  error={errors.youtubeUrl}
                />

                <IconInput
                  icon={FileText}
                  label="PPT / PDF Share Link"
                  name="presentationUrl"
                  value={formData.presentationUrl}
                  onChange={handleChange}
                  placeholder="Google Drive or Dropbox share link"
                  error={errors.presentationUrl}
                />

                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
                  Upload your PPT or PDF to Google Drive or
                  Dropbox, enable public link sharing, then
                  paste the link above.
                </div>
              </div>
            </FormSection>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 accent-[#1769c2]"
                />

                <span className="text-sm leading-6 text-slate-600">
                  I confirm that all submitted information is
                  correct and this project is the original work
                  of our team.
                </span>
              </label>

              {errors.agree && (
                <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-500">
                  <AlertCircle size={14} />
                  {errors.agree}
                </p>
              )}
            </div>

            <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Fields marked{" "}
                <span className="text-red-500">*</span> are
                required.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex min-w-47.5 items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#1058aa] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Project
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

const FormSection = ({
  icon: Icon,
  number,
  title,
  description,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2]">
          <Icon size={21} />
        </span>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-extrabold text-slate-950">
              {title}
            </h2>

            <span className="text-xs font-bold tracking-[0.16em] text-slate-300">
              {number}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
};

const FormField = ({
  label,
  required = false,
  error,
  children,
}) => {
  return (
    <div>
      <label className="mb-2.5 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

const IconInput = ({
  icon: Icon,
  label,
  required = false,
  error,
  ...inputProps
}) => {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
    >
      <div className="relative">
        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="url"
          {...inputProps}
          className={`${getInputClass(error)} pl-12`}
        />
      </div>
    </FormField>
  );
};

const getInputClass = (error) => {
  return `h-12.5 w-full rounded-xl border bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
    error
      ? "border-red-300 ring-4 ring-red-50 focus:border-red-400"
      : "border-slate-200 hover:border-slate-300 focus:border-[#1769c2] focus:ring-4 focus:ring-blue-50"
  }`;
};

export default ProjectSubmission;