import axios from "axios";

const api = axios.create({
  baseURL: "https://bellemam-backend.mg8.andreconjo.com/api/",
});

api.interceptors.request.use(async (config) => {
  const user = JSON.parse(await localStorage.getItem("user"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
