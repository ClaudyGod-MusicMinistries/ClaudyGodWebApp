export type VolunteerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  reason: string;
};
const getApiBase = () => {
  if (import.meta.env.PROD) {
    return 'https://claudygodwebapp-1.onrender.com';
  }
  return window.location.origin.includes('localhost') 
    ? 'http://localhost:10000' 
    : 'https://claudygodwebapp-1.onrender.com';
};
const API_BASE = getApiBase();
const VOLUNTEER_ENDPOINT = `${API_BASE}/api/volunteers`;

export const submitVolunteerForm = async (data: VolunteerFormData) => {
  try {
    const response = await fetch(`${VOLUNTEER_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let errorMessage = "Failed to submit volunteer form";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Volunteer API error:", error);
    throw error;
  }
};