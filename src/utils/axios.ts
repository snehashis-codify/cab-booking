import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MAPBOX_API_URL,
});
axiosInstance.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers["Authorization"] =
    `Bearer ${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
  return config;
});
axiosInstance.interceptors.response.use((config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
});
