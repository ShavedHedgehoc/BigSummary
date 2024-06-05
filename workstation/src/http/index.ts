import axios from "axios";

export const apiUrl = "/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export { $api };
