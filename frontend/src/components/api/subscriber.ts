const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://claudygodwebapp-1.onrender.com';
const SUBSCRIBE_ENDPOINT = `${API_BASE}/api/subscribers`;

export const subscribeToNewsletter = async (data: FormData) => {
  try {
    console.log("Sending request to:", SUBSCRIBE_ENDPOINT);
    const response = await fetch(SUBSCRIBE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Full fetch error:", error);
    throw new Error("Network error. Please check your connection and try again.");
  }
};