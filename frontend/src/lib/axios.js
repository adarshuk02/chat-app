import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "https://chatapp-cl3t.onrender.com/api" 
    : "https://chatapp-cl3t.onrender.com/api",
  withCredentials: true, // Make sure cookies are sent
});

// Add request interceptor to retry request if cookies aren't set yet
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if cookies are set and delay if not
    if (!document.cookie.includes('jwt')) {
      return new Promise((resolve) => {
        // Retry after a short delay if cookies are not set yet
        setTimeout(() => resolve(config), 1000); // Delay for 500ms (you can adjust this)
      });
    }
    console.log("Request Cookies: ", document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally, handle responses to check cookie behavior or errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error Response: ", error.response);
    return Promise.reject(error);
  }
);

