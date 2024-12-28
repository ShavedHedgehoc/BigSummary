import axios from "axios";
import { ApiRoutes } from "./apiRoutes";

export const apiUrl = `/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const $clearApi = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

$clearApi.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

$api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  function (config) {
    return config;
  },
  async function (error) {
    const originalRequest = error.config;
    if (originalRequest.url !== ApiRoutes.LOGIN && originalRequest.url !== ApiRoutes.LOGOUT && error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const response = await $clearApi.post(ApiRoutes.REFRESH);
          localStorage.setItem("accessToken", response.data.accessToken);
          return $api.request(originalRequest);
        } catch (error) {
          // localStorage.removeItem("accessToken");
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export { $api, $clearApi };
