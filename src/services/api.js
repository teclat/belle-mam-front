import axios from "axios";
import { Constants } from "./../constants";

const api = axios.create({
  baseURL: Constants.ApiUrl,
});

api.interceptors.request.use(async (config) => {
  const user = JSON.parse(await localStorage.getItem("user"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
