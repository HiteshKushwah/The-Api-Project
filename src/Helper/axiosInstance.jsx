
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 404 || error.response.status === 401)) {
      localStorage.removeItem('userToken'); 
      localStorage.removeItem('userName'); 
    
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;