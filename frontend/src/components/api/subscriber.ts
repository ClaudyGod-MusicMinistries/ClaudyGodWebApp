export type FormData = {
  name: string;
  email: string;
};

const API_BASE = process.env.API_URL || 5000;;
const SUBSCRIBE_ENDPOINT = `${API_BASE}/api/subscribers`;

// const API_BASE_URL = 'http://localhost:5000';

export const subscribeToNewsletter = async (data: FormData) => {
  try {
    const response = await fetch(`${SUBSCRIBE_ENDPOINT}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Subscription failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Newsletter API error:", error);
    throw error;
  }
};