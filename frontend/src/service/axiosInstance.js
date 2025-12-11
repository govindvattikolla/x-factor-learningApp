import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== "undefined" && error.response && error.response.status === 401) {
            console.log(error.response);
            //window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;