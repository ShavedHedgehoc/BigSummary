import axios, { AxiosError } from "axios";
import { httpErrors } from "./httpErrors";

const handleError = (error: Error | AxiosError | unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 500 || error.response?.status === 504) return httpErrors.API_ERROR;
    const message = typeof error.response !== "undefined" ? error.response.data.message : httpErrors.UNKNOWN_ERROR;
    return message;
  }
  return httpErrors.UNRESOLVED_ERROR;
};

export default handleError;
