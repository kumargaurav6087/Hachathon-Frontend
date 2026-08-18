"use client";

import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  Check,
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
  X,
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
  // LOAD TEAM + HACKATHONS + PROBLEMS
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
          teamResponse?.team || null;

        const registeredHackathons =
          dashboardResponse?.dashboard
            ?.activeHackathons || [];

        const allProblems =
          problemResponse?.problems || [];

        setTeam(currentTeam);
        setHackathons(
          registeredHackathons
        );
        setProblems(allProblems);

        if (
          registeredHackathons.length === 1
        ) {
          const onlyHackathon =
            registeredHackathons[0];

          setFormData((current) => ({
            ...current,

            hackathonId:
              onlyHackathon.id ||
              onlyHackathon._id ||
              "",
          }));
        }
      } catch (error) {
        setErrors({
          load:
            error?.message ||
            "Submission data load nahi hua.",
        });
      } finally {
        setLoading(false);
      }
    };

    loadSubmissionData();
  }, []);

  // ==========================================
  // CURRENT HACKATHON PROBLEMS
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
        parsedUrl.protocol === "http:" ||
        parsedUrl.protocol === "https:"
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
      !formData.githubLink
        .toLowerCase()
        .includes("github.com")
    ) {
      newErrors.githubLink =
        "GitHub repository ka link enter karo.";
    }

    if (
      formData.demoVideoLink.trim() &&
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
            problem._id?.toString() ===
            formData.problemStatementId
              ?.toString()
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
              team?._id?.toString()
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
        response?.message ||
          "Project submitted successfully."
      );

      const defaultHackathon =
        hackathons.length === 1
          ? hackathons[0].id ||
            hackathons[0]._id ||
            ""
          : "";

      setFormData({
        ...initialForm,
        hackathonId:
          defaultHackathon,
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
          error?.message ||
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
      <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb]">
        <Sidebar />

        <div className="min-h-screen w-full md:pl-[76px]">
          <Header />

          <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm">
                <LoaderCircle
                  size={30}
                  className="animate-spin text-[#1769c2]"
                />
              </div>

              <p className="mt-4 text-sm font-bold text-slate-500">
                Loading submission portal...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
      <Sidebar />

      <div className="min-h-screen w-full md:pl-[76px]">
        <Header />

        <section className="mx-auto w-full max-w-[1040px] px-4 py-6 pb-28 sm:px-6 sm:py-9 sm:pb-32 lg:px-8 lg:py-12">
          {/* ==================================
              HEADER
          =================================== */}

          <div className="mb-7 sm:mb-9">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#1769c2] sm:text-xs">
              <UploadCloud size={15} />
              Project Submission Portal
            </div>

            <div className="mt-4 flex flex-col justify-between gap-5 sm:mt-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-[32px] font-black leading-[1.06] tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
                  Submit your project
                </h1>

                <p className="mt-3 max-w-[650px] text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                  Submit your project details,
                  repository, demo and supporting
                  files for evaluation.
                </p>
              </div>

              <div
                className={`w-full rounded-2xl border px-4 py-3.5 sm:w-auto sm:min-w-[170px] sm:px-5 sm:py-4 ${
                  success
                    ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border-blue-100 bg-blue-50 text-[#1769c2]"
                }`}
              >
                <p className="text-xs font-black">
                  Submission status
                </p>

                <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold">
                  {success ? (
                    <>
                      <CheckCircle2
                        size={14}
                      />
                      Submitted
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      Not submitted
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ==================================
              ALERTS
          =================================== */}

          {errors.load && (
            <AlertBox
              message={errors.load}
            />
          )}

          {success && (
            <div className="mb-6 flex items-start gap-3 rounded-[20px] border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 sm:p-5">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0"
              />

              <div>
                <p className="font-black">
                  Project submitted successfully!
                </p>

                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  {success}
                </p>
              </div>
            </div>
          )}

          {errors.submit && (
            <AlertBox
              message={errors.submit}
            />
          )}

          {!team ? (
            <AlertBox
              message="Tum kisi team ka part nahi ho. Pehle team create ya join karo."
            />
          ) : hackathons.length === 0 ? (
            <AlertBox
              message="Tumhari team kisi hackathon me registered nahi hai."
            />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6"
              noValidate
            >
              {/* ==================================
                  TEAM
              =================================== */}

              <FormSection
                icon={Users}
                number="01"
                title="Team Information"
                description="Your registered team information."
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
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

              {/* ==================================
                  HACKATHON + PROBLEM
              =================================== */}

              <FormSection
                icon={Target}
                number="02"
                title="Hackathon & Problem Statement"
                description="Select the hackathon and challenge for your project."
              >
                <div className="grid gap-5 md:grid-cols-2">
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
                        (hackathon) => {
                          const id =
                            hackathon.id ||
                            hackathon._id;

                          return (
                            <option
                              key={id}
                              value={id}
                            >
                              {
                                hackathon.title
                              }
                            </option>
                          );
                        }
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
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-700">
                      <AlertCircle
                        size={15}
                        className="mt-0.5 shrink-0"
                      />

                      <span>
                        Is hackathon ke liye
                        abhi koi problem
                        statement available
                        nahi hai.
                      </span>
                    </div>
                  )}
              </FormSection>

              {/* ==================================
                  PROJECT DETAILS
              =================================== */}

              <FormSection
                icon={FileText}
                number="03"
                title="Project Details"
                description="Tell judges about your solution."
              >
                <div className="space-y-5 sm:space-y-6">
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
                      maxLength={1500}
                      placeholder="Explain your solution, problem solved and major features..."
                      className={`${getInputClass(
                        errors.projectDescription
                      )} h-auto min-h-[150px] resize-none py-4`}
                    />

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="text-[10px] text-slate-400 sm:text-xs">
                        Minimum 20 characters
                      </p>

                      <p className="text-[10px] font-bold text-slate-400 sm:text-xs">
                        {
                          formData
                            .projectDescription
                            .length
                        }
                        /1500
                      </p>
                    </div>
                  </FormField>
                </div>
              </FormSection>

              {/* ==================================
                  LINKS
              =================================== */}

              <FormSection
                icon={GitBranch}
                number="04"
                title="Project Links"
                description="Provide links so judges can review the project."
              >
                <div className="space-y-5 sm:space-y-6">
                  <IconInput
                    icon={GitBranch}
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

              {/* ==================================
                  FILE UPLOAD
              =================================== */}

              <FormSection
                icon={UploadCloud}
                number="05"
                title="Project Files"
                description="Upload supporting files for your submission."
              >
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 sm:gap-4">
                  <FileUpload
                    icon={FileArchive}
                    label="Source ZIP"
                    accept=".zip"
                    file={zipFile}
                    onChange={
                      setZipFile
                    }
                  />

                  <FileUpload
                    icon={FileText}
                    label="Presentation"
                    accept=".ppt,.pptx"
                    file={pptFile}
                    onChange={
                      setPptFile
                    }
                  />

                  <FileUpload
                    icon={FileText}
                    label="Project PDF"
                    accept=".pdf"
                    file={pdfFile}
                    onChange={
                      setPdfFile
                    }
                  />
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-400">
                  Files optional hain jab tak
                  backend upload rules unhe
                  mandatory nahi banate.
                </p>
              </FormSection>

              {/* ==================================
                  DECLARATION
              =================================== */}

              <div
                className={`rounded-[22px] border bg-white p-5 shadow-sm sm:p-6 ${
                  errors.agree
                    ? "border-red-200"
                    : "border-slate-200"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <span
                    className={`
                      mt-0.5
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      border
                      transition-all

                      ${
                        formData.agree
                          ? "border-[#1769c2] bg-[#1769c2] text-white"
                          : "border-slate-300 bg-white"
                      }
                    `}
                  >
                    {formData.agree && (
                      <Check size={13} />
                    )}
                  </span>

                  <input
                    type="checkbox"
                    name="agree"
                    checked={
                      formData.agree
                    }
                    onChange={
                      handleChange
                    }
                    className="sr-only"
                  />

                  <span className="text-sm leading-6 text-slate-600">
                    I confirm that all
                    submitted information is
                    correct and this project
                    is the original work of
                    our team.
                  </span>
                </label>

                {errors.agree && (
                  <p className="mt-3 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-500">
                    <AlertCircle
                      size={14}
                      className="mt-0.5 shrink-0"
                    />

                    {errors.agree}
                  </p>
                )}
              </div>

              {/* ==================================
                  SUBMIT BAR
              =================================== */}

              <div className="fixed bottom-3 left-3 right-3 z-30 rounded-[20px] border border-slate-200 bg-white/95 p-3 shadow-[0_16px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:bottom-4 sm:left-auto sm:right-5 sm:w-[430px] sm:p-4 md:left-[92px] lg:right-8 lg:w-[470px]">
                <div className="flex items-center gap-3">
                  <div className="hidden min-w-0 flex-1 sm:block">
                    <p className="text-xs font-black text-slate-800">
                      Ready to submit?
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Fields marked * are required.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      submitting
                    }
                    className="
                      inline-flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#1769c2]
                      px-6
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_7px_20px_rgba(23,105,194,0.25)]
                      transition-all
                      active:scale-[0.97]
                      hover:bg-[#1058aa]
                      disabled:cursor-not-allowed
                      disabled:opacity-60

                      sm:w-auto
                      sm:min-w-[180px]
                    "
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
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
};

// ==========================================
// FORM SECTION
// ==========================================

const FormSection = ({
  icon: Icon,
  number,
  title,
  description,
  children,
}) => {
  return (
    <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_7px_26px_rgba(15,23,42,0.045)] sm:rounded-[28px]">
      <div className="flex items-start gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:gap-4 sm:px-7 sm:py-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1769c2] sm:h-11 sm:w-11">
          <Icon
            size={19}
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-base font-black text-slate-950 sm:text-lg">
              {title}
            </h2>

            <span className="shrink-0 text-[10px] font-black tracking-[0.16em] text-slate-300 sm:text-xs">
              {number}
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7 lg:p-8">
        {children}
      </div>
    </section>
  );
};

// ==========================================
// FORM FIELD
// ==========================================

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
        <p className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-500">
          <AlertCircle
            size={14}
            className="mt-0.5 shrink-0"
          />

          {error}
        </p>
      )}
    </div>
  );
};

// ==========================================
// READ ONLY BOX
// ==========================================

const ReadOnlyBox = ({
  label,
  value,
}) => {
  return (
    <div className="min-w-0 rounded-[18px] border border-slate-200 bg-slate-50/80 p-3.5 sm:p-4">
      <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 sm:text-xs">
        {label}
      </p>

      <p
        className="mt-2 truncate text-xs font-black text-slate-900 sm:text-sm"
        title={value || "-"}
      >
        {value || "-"}
      </p>
    </div>
  );
};

// ==========================================
// SELECT BOX
// ==========================================

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
        )} appearance-none pr-12 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400`}
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

// ==========================================
// ICON INPUT
// ==========================================

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

// ==========================================
// FILE UPLOAD
// ==========================================

const FileUpload = ({
  icon: Icon,
  label,
  accept,
  file,
  onChange,
}) => {
  return (
    <div
      className={`
        relative
        rounded-[20px]
        border
        border-dashed
        p-4
        text-center
        transition-all

        ${
          file
            ? "border-emerald-300 bg-emerald-50/50"
            : "border-slate-300 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50"
        }
      `}
    >
      {file && (
        <button
          type="button"
          onClick={() =>
            onChange(null)
          }
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm transition active:scale-90 hover:text-red-500"
          aria-label={`Remove ${label}`}
        >
          <X size={14} />
        </button>
      )}

      <label className="block cursor-pointer">
        <div
          className={`
            mx-auto
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-white
            shadow-sm

            ${
              file
                ? "text-emerald-600"
                : "text-[#1769c2]"
            }
          `}
        >
          {file ? (
            <CheckCircle2
              size={19}
            />
          ) : (
            <Icon size={19} />
          )}
        </div>

        <p className="mt-3 text-sm font-black text-slate-800">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-xs ${
            file
              ? "font-semibold text-emerald-600"
              : "text-slate-400"
          }`}
          title={
            file?.name ||
            "Choose file"
          }
        >
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
    </div>
  );
};

// ==========================================
// ALERT BOX
// ==========================================

const AlertBox = ({
  message,
}) => {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-[20px] border border-red-200 bg-red-50 p-4 text-red-700 sm:p-5">
      <AlertCircle
        size={20}
        className="mt-0.5 shrink-0"
      />

      <p className="text-sm font-semibold leading-6">
        {message}
      </p>
    </div>
  );
};

// ==========================================
// INPUT CLASS
// ==========================================

const getInputClass = (
  error
) => {
  return `h-12 w-full rounded-2xl border bg-white px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:font-normal placeholder:text-slate-400 ${
    error
      ? "border-red-300 ring-4 ring-red-50 focus:border-red-400"
      : "border-slate-200 hover:border-slate-300 focus:border-[#1769c2] focus:ring-4 focus:ring-blue-50"
  }`;
};

export default ProjectSubmission;