import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
const baseURL = "https://edu-trailblaze.azurewebsites.net/api";

const api = axios.create({
    baseURL,
    timeout: 30000000,
});

// Xử lý request
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token")?.replaceAll('"', "");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Xử lý response 
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
