export type FormData = {
  name: string;
  email: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const SUBSCRIBE_ENDPOINT = `${API_BASE}/api/subscribers`;

export const subscribeToNewsletter = async (data: FormData) => {
  try {
    const response = await fetch(SUBSCRIBE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || "Subscription failed");
    }

    return responseData;
  } catch (error) {
    console.error("Newsletter API error:", error);
    throw error;
  }
};