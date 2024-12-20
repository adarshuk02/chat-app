import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chatapp-cl3t.onrender.com/api" : "https://chatapp-cl3t.onrender.com/api",
  withCredentials: true,  // Make sure cookies are sent with the request
});

// Intercept requests to include the Bearer token from the cookies
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt");  // Retrieve token from cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
