import axios from "axios";

const server = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5173",
  withCredentials: true,
});

export default server;
