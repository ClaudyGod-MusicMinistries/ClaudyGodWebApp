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
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email }),
    });

    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch (e) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      throw new Error(errorData.message || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw new Error(err.message || 'Network request failed');
  }
}