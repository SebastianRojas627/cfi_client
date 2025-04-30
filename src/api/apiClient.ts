import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const searchClient = axios.create({
    baseURL: "http://localhost:5004",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
})

searchClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = handleApiError(error);
      console.error(errorMessage);
      return Promise.reject(errorMessage);
    }
  );
  
  export default searchClient;