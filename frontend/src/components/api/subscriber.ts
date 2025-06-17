// src/utils/newsletter.js

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';
const SUBSCRIBE_ENDPOINT = `${API_BASE}/api/subscribers`;

export async function subscribeToNewsletter({ name, email }) {
  const payload = { name, email };
  const res = await fetch(SUBSCRIBE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Error ${res.status}`);
  }
  return data;
}
