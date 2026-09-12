// In development, route through Vite proxy (/api) to completely bypass CORS.
// In production, use VITE_API_BASE_URL from .env or default to backend host.
export const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL ||
  (import.meta.env?.DEV
    ? '/api/v1/'
    : 'http://api.microraysolution.com/api/v1/')