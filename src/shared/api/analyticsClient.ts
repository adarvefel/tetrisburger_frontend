// analyticsClient.ts
import axios from "axios";

export const analyticsClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// 👇 opcional: headers aquí
analyticsClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});