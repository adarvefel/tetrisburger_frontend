// analyticsClient.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_PYTHON_URL;

export const analyticsClient = axios.create({
  baseURL: API_URL,
});

// 👇 opcional: headers aquí
analyticsClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});