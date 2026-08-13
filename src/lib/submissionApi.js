const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("hackon_token");
};

// ==========================================
// CREATE SUBMISSION
// ==========================================

export const createSubmission = async (formData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/submissions/create`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      // FormData use ho raha hai
      // Content-Type manually mat dena
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Project submission failed."
    );
  }

  return data;
};

// ==========================================
// GET ALL SUBMISSIONS
// ==========================================

export const getAllSubmissions = async () => {
  const response = await fetch(
    `${API_URL}/api/submissions`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Submissions fetch nahi hue."
    );
  }

  return data;
};

// ==========================================
// GET SINGLE SUBMISSION
// ==========================================

export const getSingleSubmission = async (
  submissionId
) => {
  const response = await fetch(
    `${API_URL}/api/submissions/${submissionId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Submission fetch nahi hua."
    );
  }

  return data;
};

// ==========================================
// UPDATE SUBMISSION
// ==========================================

export const updateSubmission = async (
  submissionId,
  formData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/submissions/${submissionId}`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Submission update nahi hua."
    );
  }

  return data;
};

// ==========================================
// EVALUATE SUBMISSION
// JUDGE / ADMIN ONLY
// ==========================================

export const evaluateSubmission = async (
  submissionId,
  evaluationData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/submissions/${submissionId}/evaluate`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        score: evaluationData.score,
        feedback: evaluationData.feedback,
        status: evaluationData.status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Submission evaluate nahi hua."
    );
  }

  return data;
};

// ==========================================
// LEADERBOARD
// ==========================================

export const getLeaderboard = async () => {
  const response = await fetch(
    `${API_URL}/api/submissions/leaderboard/all`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Leaderboard fetch nahi hua."
    );
  }

  return data;
};

// ==========================================
// TOP 3 WINNERS
// ==========================================

export const getWinners = async (
  hackathonId
) => {
  const response = await fetch(
    `${API_URL}/api/submissions/winners/${hackathonId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Winners fetch nahi hue."
    );
  }

  return data;
};