const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

// Normal User / Participant Dashboard
export const getUserDashboard = async () => {
  const token = localStorage.getItem("hackon_token");

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/dashboard/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Dashboard fetch nahi hua."
    );
  }

  return data;
};

// Admin Analytics Dashboard
export const getDashboardAnalytics = async () => {
  const token = localStorage.getItem("hackon_token");

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/dashboard/analytics`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Analytics fetch nahi hua."
    );
  }

  return data;
};