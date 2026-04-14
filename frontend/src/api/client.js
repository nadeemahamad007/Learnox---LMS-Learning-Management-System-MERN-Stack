import axios from "axios";

const api = axios.create({
  // Prefer same-origin in production (when the backend serves the frontend).
  // For separate frontend hosting, set VITE_API_BASE_URL to the backend URL.
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lms_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
