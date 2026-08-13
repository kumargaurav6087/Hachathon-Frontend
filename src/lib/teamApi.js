const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("hackon_token");
};

export const createTeam = async (teamData) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/api/teams/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(teamData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Team create nahi hua."
    );
  }

  return data;
};

export const joinTeam = async (teamCode) => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/api/teams/join`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        teamCode,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Team join nahi hua."
    );
  }

  return data;
};

export const getMyTeam = async () => {
  const token = getToken();

  const response = await fetch(
    `${API_URL}/api/teams/my-team`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Team fetch nahi hua."
    );
  }

  return data;
};