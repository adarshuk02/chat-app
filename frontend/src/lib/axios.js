import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chatapp-cl3t.onrender.com/api" : "https://chatapp-cl3t.onrender.com/api",
  withCredentials: true,
});
