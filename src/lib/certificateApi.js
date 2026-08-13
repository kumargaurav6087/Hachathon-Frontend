const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const getToken = () => {
  return localStorage.getItem("hackon_token");
};

// ==========================================
// GENERATE WINNER CERTIFICATE
// Judge / Admin only
// ==========================================

export const generateWinnerCertificate = async (
  submissionId
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/certificates/winner/${submissionId}`,
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
      data.message ||
        "Certificate generate nahi hua."
    );
  }

  return data;
};

// ==========================================
// GET LOGGED-IN USER CERTIFICATES
// ==========================================

export const getMyCertificates = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/certificates/my`,
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
      data.message ||
        "Certificates fetch nahi hue."
    );
  }

  return data;
};

// ==========================================
// GET SINGLE CERTIFICATE
// ==========================================

export const getSingleCertificate = async (
  certificateId
) => {
  const token = getToken();

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(
    `${API_URL}/api/certificates/${certificateId}`,
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
      data.message ||
        "Certificate fetch nahi hua."
    );
  }

  return data;
};

// ==========================================
// VERIFY CERTIFICATE
// Public
// ==========================================

export const verifyCertificate = async (
  verificationId
) => {
  const response = await fetch(
    `${API_URL}/api/certificates/verify/${encodeURIComponent(
      verificationId
    )}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Certificate verify nahi hua."
    );
  }

  return data;
};