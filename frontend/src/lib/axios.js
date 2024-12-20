import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "https://chatapp-cl3t.onrender.com/api" 
    : "https://chatapp-cl3t.onrender.com/api",
  withCredentials: true, // Ensures that cookies are sent with requests
});

// You might want to log the cookies or response headers for debugging:
axiosInstance.interceptors.request.use((config) => {
  console.log("Request Cookies: ", document.cookie);  // Check if cookies are available
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error Response: ", error.response);
    return Promise.reject(error);
  }
);
