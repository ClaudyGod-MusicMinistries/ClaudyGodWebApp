// src/config.ts
/**
 * Central place for runtime configuration.
 * Reads VITE_API_BASE from your .env, or uses a fallback.
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE?.trim() ||
  'http://localhost:10000';  // ← adjust if your backend lives elsewhere
