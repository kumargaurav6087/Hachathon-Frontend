const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("hackon_token");
};

// ==========================================
// GET ALL HACKATHONS
// ==========================================

export const getAllHackathons = async () => {
  const response = await fetch(
    `${API_URL}/api/hackathons`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Hackathons fetch nahi hue."
    );
  }

  return data;
};

// ==========================================
// GET SINGLE HACKATHON
// ==========================================

export const getSingleHackathon = async (id) => {
  const response = await fetch(
    `${API_URL}/api/hackathons/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Hackathon fetch nahi hua."
    );
  }

  return data;
};

// ==========================================
// UPDATE HACKATHON
// ADMIN ONLY
// ==========================================

export const updateHackathon = async (
  hackathonId,
  updateData
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/hackathons/${hackathonId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Hackathon update nahi hua."
    );
  }

  return data;
};

// ==========================================
// REGISTER TEAM IN HACKATHON
// ==========================================

export const registerTeamInHackathon = async (
  hackathonId,
  teamId
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/hackathons/${hackathonId}/register-team`,
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
      data.message ||
        "Hackathon registration failed."
    );
  }

  return data;
};