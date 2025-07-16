import axios from "axios";
import { getFingerprint } from "../utils/getFingerprint";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  const fingerprint = await getFingerprint();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (fingerprint) {
    config.headers["x-device-fingerprint"] = fingerprint;
  }

  return config;
});

export default api;
