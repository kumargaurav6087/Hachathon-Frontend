const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const request = async (endpoint, options = {}) => {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
};

export const registerUser = (formData) => {
  return request("/api/users/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const loginUser = (formData) => {
  return request("/api/users/login", {
    method: "POST",
    body: JSON.stringify(formData),
  });
};

export const getUserProfile = (token) => {
  return request("/api/users/profile", {
    method: "GET",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};