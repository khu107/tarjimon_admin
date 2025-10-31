import axios, { AxiosError } from "axios";
import type { ApiError } from "../types/api";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://tarjimon.up.railway.app",
});

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
