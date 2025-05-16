import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { axiosBaseUrl } from "../lib/env";

const axiosInstance = axios.create({
  baseURL: axiosBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized!");
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        console.error("Forbidden! You do not have permission.");
      } else if (error.response.status >= 500) {
        console.error("Server error, please try again later.");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
