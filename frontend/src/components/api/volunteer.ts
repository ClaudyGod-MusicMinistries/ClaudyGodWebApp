// src/api/volunteerService.ts
export type VolunteerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  reason: string;
};

const API_BASE_URL =  "http://localhost:5000";

export const submitVolunteerForm = async (data: VolunteerFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/volunteers`, {
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