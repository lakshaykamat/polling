import axios from "axios";
import { LocalStorageHandler } from "./utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  let user = LocalStorageHandler.getToken();
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle any global error responses here
    return Promise.reject(error);
  }
);

export default axiosInstance;
