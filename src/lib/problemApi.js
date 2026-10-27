const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

export const SOCIAL_INNOVATION_CATEGORIES = [
  "Environment",
  "Waste Management",
  "Education",
  "Healthcare",
  "Transportation",
  "Accessibility",
  "Public Safety",
  "Water Conservation",
  "Rural Development"
];

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("hackon_token");
};

// ==========================================
// GET ALL PROBLEMS (Supports filtering)
// ==========================================
export const getAllProblems = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.category && params.category !== "All Categories") {
    query.set("category", params.category);
  }
  if (params.status && params.status !== "all") {
    query.set("status", params.status);
  }
  if (params.search) {
    query.set("search", params.search);
  }
  if (params.hackathonId) {
    query.set("hackathonId", params.hackathonId);
  }

  const queryString = query.toString() ? `?${query.toString()}` : "";

  const response = await fetch(
    `${API_URL}/api/problems${queryString}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load problem statements."
    );
  }

  return data;
};

// ==========================================
// GET SINGLE PROBLEM STATEMENT
// ==========================================
export const getProblemById = async (problemId) => {
  const response = await fetch(
    `${API_URL}/api/problems/${problemId}`,
    {
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to load problem statement details."
    );
  }

  return data;
};

// ==========================================
// REPORT COMMUNITY PROBLEM
// ==========================================
export const reportCommunityProblem = async (problemData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please log in to report a community problem.");
  }

  const response = await fetch(
    `${API_URL}/api/problems/community`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(problemData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to report community problem."
    );
  }

  return data;
};

// ==========================================
// ADMIN MODERATE / UPDATE PROBLEM STATUS
// ==========================================
export const updateProblemStatus = async (problemId, statusData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Admin authentication required.");
  }

  const response = await fetch(
    `${API_URL}/api/problems/${problemId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update problem statement."
    );
  }

  return data;
};

// ==========================================
// TOGGLE UPVOTE
// ==========================================
export const toggleUpvoteProblem = async (problemId) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please log in to upvote this challenge.");
  }

  const response = await fetch(
    `${API_URL}/api/problems/${problemId}/upvote`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to upvote problem."
    );
  }

  return data;
};

// ==========================================
// TEAM SELECT PROBLEM
// ==========================================
export const selectProblem = async (
  problemId,
  teamId
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/problems/${problemId}/select`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        teamId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to select problem statement."
    );
  }

  return data;
};