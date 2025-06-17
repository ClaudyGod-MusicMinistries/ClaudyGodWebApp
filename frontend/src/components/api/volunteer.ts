export type VolunteerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  reason: string;
};
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
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