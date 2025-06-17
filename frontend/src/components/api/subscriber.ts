// Determine base URL based on environment
const getApiBase = () => {
  if (import.meta.env.PROD) {
    return 'https://claudygodwebapp-1.onrender.com';
  }
  return window.location.origin.includes('localhost') 
    ? 'http://localhost:10000' 
    : 'https://claudygodwebapp-1.onrender.com';
};

const API_BASE = getApiBase();
const SUBSCRIBE_ENDPOINT = `${API_BASE}/api/subscribers`;

export async function subscribeToNewsletter({ name, email }) {
  try {
    const res = await fetch(SUBSCRIBE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Enhanced error messages
      let errorMsg = data.message || `Request failed with status ${res.status}`;
      
      // Special handling for common errors
      if (res.status === 403) {
        errorMsg = 'Access forbidden - please check your connection';
      } else if (res.status === 0) {
        errorMsg = 'Network error - failed to reach server';
      }
      
      throw new Error(errorMsg);
    }
    
    return data;
  } catch (err) {
    console.error('Subscription error:', err);
    throw new Error(err.message || 'Network request failed');
  }
}