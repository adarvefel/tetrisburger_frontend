import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_BACKEND_URL;

export const axiosClient = axios.create({
    baseURL: API_URL,

})

axiosClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;


    },
    (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;
        const messageError = error.response?.data?.error;

        if (status === 401 && messageError === "Token expirado") {
            useAuthStore.getState().logout();
            window.location.href = "/login";
            
        }

        return Promise.reject(error);
    }
);