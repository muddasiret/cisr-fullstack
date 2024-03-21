import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Set your base URL here
});

axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, such as adding headers
    // For example, adding an authorization header
    // config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
