import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

export const axiosClient = axios.create({
    baseURL: "http://localhost:8080",

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

        if (status === 401 && message === "Token inválido, expirado o no proporcionado") {
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);