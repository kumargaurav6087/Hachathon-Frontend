"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileArchive,
  FileText,
  GitBranch,
  LoaderCircle,
  Send,
  Target,
  UploadCloud,
  Users,
  Video,
} from "lucide-react";

import Header from "@/components/Home/Header";
import Sidebar from "@/components/Home/Sidebar";

import { getMyTeam } from "@/lib/teamApi";
import { getUserDashboard } from "@/lib/dashboardApi";

import {
  getAllProblems,
  selectProblem,
} from "@/lib/problemApi";

import {
  createSubmission,
} from "@/lib/submissionApi";

const initialForm = {
  hackathonId: "",
  problemStatementId: "",
  projectTitle: "",
  projectDescription: "",
  githubLink: "",
  demoVideoLink: "",
  agree: false,
};

const ProjectSubmission = () => {
  const [formData, setFormData] =
    useState(initialForm);

  const [team, setTeam] =
    useState(null);

  const [hackathons, setHackathons] =
    useState([]);

  const [problems, setProblems] =
    useState([]);

  const [zipFile, setZipFile] =
    useState(null);

  const [pptFile, setPptFile] =
    useState(null);

  const [pdfFile, setPdfFile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [errors, setErrors] =
    useState({});

  // ==========================================
  // LOAD TEAM + REGISTERED HACKATHONS + PROBLEMS
  // ==========================================

  useEffect(() => {
    const loadSubmissionData = async () => {
      try {
        setLoading(true);
        setErrors({});

        const [
          teamResponse,
          dashboardResponse,
          problemResponse,
        ] = await Promise.all([
          getMyTeam(),
          getUserDashboard(),
          getAllProblems(),
        ]);

        const currentTeam =
          teamResponse.team || null;

        const registeredHackathons =
          dashboardResponse.dashboard
            ?.activeHackathons || [];

        const allProblems =
          problemResponse.problems || [];

        setTeam(currentTeam);
        setHackathons(
          registeredHackathons
        );
        setProblems(allProblems);

        // Agar sirf ek registered hackathon hai
        // to automatically select kar do.
        if (
          registeredHackathons.length === 1
        ) {
          setFormData((current) => ({
            ...current,

            hackathonId:
              registeredHackathons[0].id,
          }));
        }
      } catch (error) {
        setErrors({
          load:
            error.message ||
            "Submission data load nahi hua.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSubmissionData();
  }, []);

  // ==========================================
  // CURRENT HACKATHON KE PROBLEMS
  // ==========================================

  const filteredProblems =
    useMemo(() => {
      if (!formData.hackathonId) {
        return [];
      }

      return problems.filter(
        (problem) => {
          const problemHackathonId =
            typeof problem.hackathon ===
            "object"
              ? problem.hackathon?._id
              : problem.hackathon;

          return (
            problemHackathonId?.toString() ===
            formData.hackathonId.toString()
          );
        }
      );
    }, [
      problems,
      formData.hackathonId,
    ]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,

      // Hackathon change hua to old problem reset
      ...(name === "hackathonId"
        ? {
            problemStatementId: "",
          }
        : {}),
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      submit: "",
    }));

    setSuccess("");
  };

  // ==========================================
  // URL VALIDATION
  // ==========================================

  const isValidUrl = (value) => {
    try {
      const parsedUrl =
        new URL(value);

      return (
        parsedUrl.protocol ===
          "http:" ||
        parsedUrl.protocol ===
          "https:"
      );
    } catch {
      return false;
    }
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    const newErrors = {};

    if (!team) {
      newErrors.team =
        "Project submit karne ke liye pehle team create ya join karo.";
    }

    if (!formData.hackathonId) {
      newErrors.hackathonId =
        "Hackathon select karo.";
    }

    if (
      !formData.problemStatementId
    ) {
      newErrors.problemStatementId =
        "Problem statement select karo.";
    }

    if (
      !formData.projectTitle.trim()
    ) {
      newErrors.projectTitle =
        "Project title required hai.";
    } else if (
      formData.projectTitle.trim()
        .length < 3
    ) {
      newErrors.projectTitle =
        "Project title minimum 3 characters ka hona chahiye.";
    }

    if (
      !formData.projectDescription.trim()
    ) {
      newErrors.projectDescription =
        "Project description required hai.";
    } else if (
      formData.projectDescription
        .trim().length < 20
    ) {
      newErrors.projectDescription =
        "Project description minimum 20 characters ki honi chahiye.";
    }

    if (
      !formData.githubLink.trim()
    ) {
      newErrors.githubLink =
        "GitHub repository link required hai.";
    } else if (
      !isValidUrl(
        formData.githubLink.trim()
      )
    ) {
      newErrors.githubLink =
        "Valid GitHub URL enter karo.";
    } else if (
      !formData.githubLink.includes(
        "github.com"
      )
    ) {
      newErrors.githubLink =
        "GitHub repository ka link enter karo.";
    }

    if (
      formData.demoVideoLink &&
      !isValidUrl(
        formData.demoVideoLink.trim()
      )
    ) {
      newErrors.demoVideoLink =
        "Valid demo video URL enter karo.";
    }

    if (!formData.agree) {
      newErrors.agree =
        "Submission declaration accept karna required hai.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  // ==========================================
  // PROBLEM ALREADY SELECTED?
  // ==========================================

  const ensureProblemSelected =
    async () => {
      const selectedProblem =
        problems.find(
          (problem) =>
            problem._id ===
            formData.problemStatementId
        );

      if (!selectedProblem) {
        throw new Error(
          "Selected problem statement nahi mila."
        );
      }

      const alreadySelected =
        selectedProblem.selectedTeams?.some(
          (selectedTeam) => {
            const selectedTeamId =
              typeof selectedTeam ===
              "object"
                ? selectedTeam._id
                : selectedTeam;

            return (
              selectedTeamId?.toString() ===
              team._id?.toString()
            );
          }
        );

      if (alreadySelected) {
        return;
      }

      try {
        await selectProblem(
          formData.problemStatementId,
          team._id
        );
      } catch (error) {
        // Agar backend bolta hai already selected,
        // to submission continue kar sakti hai.
        if (
          error.message
            ?.toLowerCase()
            .includes(
              "already selected"
            )
        ) {
          return;
        }

        throw error;
      }
    };

  // ==========================================
  // SUBMIT PROJECT
  // ==========================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSuccess("");

    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setSubmitting(true);

      // Submission controller expects
      // selectedTeams me team hona chahiye
      await ensureProblemSelected();

      const data =
        new FormData();

      data.append(
        "projectTitle",
        formData.projectTitle.trim()
      );

      data.append(
        "projectDescription",
        formData.projectDescription.trim()
      );

      data.append(
        "githubLink",
        formData.githubLink.trim()
      );

      if (
        formData.demoVideoLink.trim()
      ) {
        data.append(
          "demoVideoLink",
          formData.demoVideoLink.trim()
        );
      }

      data.append(
        "teamId",
        team._id
      );

      data.append(
        "hackathonId",
        formData.hackathonId
      );

      data.append(
        "problemStatementId",
        formData.problemStatementId
      );

      if (zipFile) {
        data.append(
          "zipFile",
          zipFile
        );
      }

      if (pptFile) {
        data.append(
          "pptFile",
          pptFile
        );
      }

      if (pdfFile) {
        data.append(
          "pdfFile",
          pdfFile
        );
      }

      const response =
        await createSubmission(
          data
        );

      setSuccess(
        response.message ||
          "Project submitted successfully."
      );

      setFormData({
        ...initialForm,

        // Registered hackathon retain
        hackathonId:
          hackathons.length === 1
            ? hackathons[0].id
            : "",
      });

      setZipFile(null);
      setPptFile(null);
      setPdfFile(null);

      setErrors({});

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setErrors((current) => ({
        ...current,

        submit:
          error.message ||
          "Project submit nahi hua.",
      }));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f7fb]">
        <Sidebar />

        <div className="min-h-screen pl-0 md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="text-center">
              <LoaderCircle
                size={38}
                className="mx-auto animate-spin text-[#1769c2]"
              />

              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading submission portal...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen pl-0 md:pl-[76px]">
        <Header />

        <section className="mx-auto max-w-[980px] px-5 py-10 sm:px-7 lg:py-14">
          {/* HEADER */}

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[#1769c2]">
              <UploadCloud
                size={17}
              />

              Project Submission Portal
            </div>

            <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  Submit your project
                </h1>

                <p className="mt-3 max-w-[650px] text-base leading-7 text-slate-500">
                  Submit your project
                  details, repository,
                  demo and supporting
                  files for evaluation.
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-700">
                <p className="font-bold">
                  Submission status
                </p>

                <p className="mt-1 text-xs">
                  {success
                    ? "Submitted"
                    : "Not submitted"}
                </p>
              </div>
            </div>
          </div>

          {/* LOAD ERROR */}

          {errors.load && (
            <AlertBox
              type="error"
              message={
                errors.load
              }
            />
          )}

          {/* SUCCESS */}

          {success && (
            <div className="mb-7 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
              <CheckCircle2
                size={21}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-bold">
                  Project submitted
                  successfully!
                </p>

                <p className="mt-1 text-sm text-emerald-700">
                  {success}
                </p>
              </div>
            </div>
          )}

          {/* SUBMISSION ERROR */}

          {errors.submit && (
            <AlertBox
              type="error"
              message={
                errors.submit
              }
            />
          )}

          {!team ? (
            <AlertBox
              type="error"
              message="Tum kisi team ka part nahi ho. Pehle team create ya join karo."
            />
          ) : hackathons.length ===
            0 ? (
            <AlertBox
              type="error"
              message="Tumhari team kisi hackathon me registered nahi hai."
            />
          ) : (
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
              noValidate
            >
              {/* TEAM */}

              <FormSection
                icon={Users}
                number="01"
                title="Team Information"
                description="Your registered team information."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <ReadOnlyBox
                    label="Team Name"
                    value={
                      team.teamName
                    }
                  />

                  <ReadOnlyBox
                    label="Team Code"
                    value={
                      team.teamCode
                    }
                  />

                  <ReadOnlyBox
                    label="Members"
                    value={`${
                      team.members
                        ?.length ||
                      0
                    } / ${
                      team.maxMembers ||
                      4
                    }`}
                  />

                  <ReadOnlyBox
                    label="Leader"
                    value={
                      typeof team.leader ===
                      "object"
                        ? team.leader
                            ?.name ||
                          "Leader"
                        : "Team Leader"
                    }
                  />
                </div>
              </FormSection>

              {/* HACKATHON + PROBLEM */}

              <FormSection
                icon={Target}
                number="02"
                title="Hackathon & Problem Statement"
                description="Select the hackathon and challenge for your project."
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    label="Hackathon"
                    required
                    error={
                      errors.hackathonId
                    }
                  >
                    <SelectBox
                      name="hackathonId"
                      value={
                        formData.hackathonId
                      }
                      onChange={
                        handleChange
                      }
                      error={
                        errors.hackathonId
                      }
                    >
                      <option value="">
                        Select hackathon
                      </option>

                      {hackathons.map(
                        (
                          hackathon
                        ) => (
                          <option
                            key={
                              hackathon.id
                            }
                            value={
                              hackathon.id
                            }
                          >
                            {
                              hackathon.title
                            }
                          </option>
                        )
                      )}
                    </SelectBox>
                  </FormField>

                  <FormField
                    label="Problem Statement"
                    required
                    error={
                      errors.problemStatementId
                    }
                  >
                    <SelectBox
                      name="problemStatementId"
                      value={
                        formData.problemStatementId
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        !formData.hackathonId
                      }
                      error={
                        errors.problemStatementId
                      }
                    >
                      <option value="">
                        {!formData.hackathonId
                          ? "Select hackathon first"
                          : "Select problem statement"}
                      </option>

                      {filteredProblems.map(
                        (problem) => (
                          <option
                            key={
                              problem._id
                            }
                            value={
                              problem._id
                            }
                          >
                            {
                              problem.title
                            }{" "}
                            -{" "}
                            {
                              problem.category
                            }
                          </option>
                        )
                      )}
                    </SelectBox>
                  </FormField>
                </div>

                {formData.hackathonId &&
                  filteredProblems.length ===
                    0 && (
                    <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-700">
                      Is hackathon
                      ke liye abhi
                      koi problem
                      statement
                      available nahi
                      hai.
                    </p>
                  )}
              </FormSection>

              {/* PROJECT DETAILS */}

              <FormSection
                icon={FileText}
                number="03"
                title="Project Details"
                description="Tell judges about your solution."
              >
                <div className="space-y-6">
                  <FormField
                    label="Project Title"
                    required
                    error={
                      errors.projectTitle
                    }
                  >
                    <input
                      type="text"
                      name="projectTitle"
                      value={
                        formData.projectTitle
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. AI Health Assistant"
                      className={getInputClass(
                        errors.projectTitle
                      )}
                    />
                  </FormField>

                  <FormField
                    label="Project Description"
                    required
                    error={
                      errors.projectDescription
                    }
                  >
                    <textarea
                      name="projectDescription"
                      value={
                        formData.projectDescription
                      }
                      onChange={
                        handleChange
                      }
                      rows={6}
                      maxLength={
                        1500
                      }
                      placeholder="Explain your solution, problem solved and major features..."
                      className={`${getInputClass(
                        errors.projectDescription
                      )} h-auto min-h-40 resize-none py-4`}
                    />

                    <p className="mt-2 text-right text-xs text-slate-400">
                      {
                        formData
                          .projectDescription
                          .length
                      }
                      /1500
                    </p>
                  </FormField>
                </div>
              </FormSection>

              {/* LINKS */}

              <FormSection
                icon={GitBranch}
                number="04"
                title="Project Links"
                description="Provide links so judges can review the project."
              >
                <div className="space-y-6">
                  <IconInput
                    icon={
                      GitBranch
                    }
                    label="GitHub Repository"
                    required
                    name="githubLink"
                    value={
                      formData.githubLink
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://github.com/username/project"
                    error={
                      errors.githubLink
                    }
                  />

                  <IconInput
                    icon={Video}
                    label="Demo Video Link"
                    name="demoVideoLink"
                    value={
                      formData.demoVideoLink
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="https://youtube.com/watch?v=..."
                    error={
                      errors.demoVideoLink
                    }
                  />
                </div>
              </FormSection>

              {/* FILE UPLOAD */}

              <FormSection
                icon={UploadCloud}
                number="05"
                title="Project Files"
                description="Upload supporting files for your submission."
              >
                <div className="grid gap-5 md:grid-cols-3">
                  <FileUpload
                    icon={
                      FileArchive
                    }
                    label="Source ZIP"
                    accept=".zip"
                    file={
                      zipFile
                    }
                    onChange={
                      setZipFile
                    }
                  />

                  <FileUpload
                    icon={
                      FileText
                    }
                    label="Presentation"
                    accept=".ppt,.pptx"
                    file={
                      pptFile
                    }
                    onChange={
                      setPptFile
                    }
                  />

                  <FileUpload
                    icon={
                      FileText
                    }
                    label="Project PDF"
                    accept=".pdf"
                    file={
                      pdfFile
                    }
                    onChange={
                      setPdfFile
                    }
                  />
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-400">
                  Files optional hain
                  jab tak backend
                  upload rules unhe
                  mandatory nahi
                  banate.
                </p>
              </FormSection>

              {/* DECLARATION */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={
                      formData.agree
                    }
                    onChange={
                      handleChange
                    }
                    className="mt-1 h-4 w-4 accent-[#1769c2]"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I confirm
                    that all
                    submitted
                    information
                    is correct
                    and this
                    project is
                    the original
                    work of our
                    team.
                  </span>
                </label>

                {errors.agree && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-500">
                    <AlertCircle
                      size={14}
                    />

                    {
                      errors.agree
                    }
                  </p>
                )}
              </div>

              {/* SUBMIT */}

              <div className="sticky bottom-4 z-20 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.13)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Fields marked{" "}
                  <span className="text-red-500">
                    *
                  </span>{" "}
                  are required.
                </p>

                <button
                  type="submit"
                  disabled={
                    submitting
                  }
                  className="inline-flex min-w-48 items-center justify-center gap-2 rounded-xl bg-[#1769c2] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-[#1058aa] disabled:cursor-not-allowed disabled:opacity-60"
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
                      <Send
                        size={18}
                      />

                      Submit Project
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

// ==========================================
// COMPONENTS
// ==========================================

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

      <div className="p-6 sm:p-8">
        {children}
      </div>
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
          <span className="ml-1 text-red-500">
            *
          </span>
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

const ReadOnlyBox = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-black text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
};

const SelectBox = ({
  children,
  error,
  ...props
}) => {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${getInputClass(
          error
        )} appearance-none pr-12 disabled:cursor-not-allowed disabled:bg-slate-100`}
      >
        {children}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
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
          className={`${getInputClass(
            error
          )} pl-12`}
        />
      </div>
    </FormField>
  );
};

const FileUpload = ({
  icon: Icon,
  label,
  accept,
  file,
  onChange,
}) => {
  return (
    <label className="cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-blue-300 hover:bg-blue-50/50">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#1769c2] shadow-sm">
        <Icon size={19} />
      </div>

      <p className="mt-3 text-sm font-bold text-slate-800">
        {label}
      </p>

      <p className="mt-1 truncate text-xs text-slate-400">
        {file
          ? file.name
          : "Choose file"}
      </p>

      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) =>
          onChange(
            event.target.files?.[0] ||
              null
          )
        }
      />
    </label>
  );
};

const AlertBox = ({
  message,
}) => {
  return (
    <div className="mb-7 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
      <AlertCircle
        size={21}
        className="mt-0.5 shrink-0"
      />

      <p className="text-sm font-medium">
        {message}
      </p>
    </div>
  );
};

const getInputClass = (
  error
) => {
  return `h-12.5 w-full rounded-xl border bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 ${
    error
      ? "border-red-300 ring-4 ring-red-50 focus:border-red-400"
      : "border-slate-200 hover:border-slate-300 focus:border-[#1769c2] focus:ring-4 focus:ring-blue-50"
  }`;
};

export default ProjectSubmission;