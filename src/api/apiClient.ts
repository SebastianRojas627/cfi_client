import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

export const solicitudesClient = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

solicitudesClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = handleApiError(error);
    console.error(errorMessage);
    return Promise.reject(errorMessage);
  }
);

solicitudesClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("user.accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})