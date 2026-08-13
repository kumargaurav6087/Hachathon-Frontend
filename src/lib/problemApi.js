const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("hackon_token");
};

export const getAllProblems = async () => {
  const response = await fetch(
    `${API_URL}/api/problems`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Problem statements fetch nahi hue."
    );
  }

  return data;
};

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
      data.message ||
        "Problem statement select nahi hua."
    );
  }

  return data;
};