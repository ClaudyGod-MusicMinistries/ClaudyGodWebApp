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
    
    // Handle 204 No Content responses
    if (response.status === 204) {
      return { message: "Subscription successful" };
    }
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! Status: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error("Full fetch error:", error);
    
    // More specific error messages
    if (error instanceof TypeError) {
      throw new Error("Network error. Please check your internet connection.");
    }
    
    throw new Error(error.message || "An unexpected error occurred");
  }
};