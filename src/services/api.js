import axios from "axios";

const api = axios.create({
  baseURL: "https://api.karbitindia.com/api/web",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers["token"] = `Bearer ${token}`;
    // config.headers["token"] = `Bearer admin-1`;

  }

  return config;
});

export default api;