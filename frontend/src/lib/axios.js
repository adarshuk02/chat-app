import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chat-app-server-eight-red.vercel.app/api" : "https://chat-app-server-eight-red.vercel.app/api",
  withCredentials: true,
});
