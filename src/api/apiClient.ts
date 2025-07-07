import axios from "axios";

export const solicitudesClient = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
searchClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      return Promise.reject(errorMessage);
    }
  );
  */
