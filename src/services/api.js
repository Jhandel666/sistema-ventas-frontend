import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://sistema-ventas-backend-2twt.onrender.com/api"
});

export default api;