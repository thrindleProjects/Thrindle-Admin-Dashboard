import * as constants from "../redux/constants/index";
import axios from "axios";
import store from "../redux/store/store";

const axiosInstance = axios.create({
  baseURL: "https://store-staging-api.thrindle.com/api/thrindle",
  // baseURL: "https://store-staging-api.thrindle.com/api/thrindle",
  headers: {},
});

// Defaults timeout when unable to connect to server
axiosInstance.defaults.timeout = 50000;
axiosInstance.defaults.timeoutErrorMessage =
  "Cannot connect to server. Please check your network";

// Request interceptor for API calls
// https://www.bezkoder.com/react-refresh-token/
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.getState().login.accessToken;
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;
    if (
      originalConfig.url !== "/login" ||
      (originalConfig.url !== "/forgot-password" && err.response)
    ) {
      // Access Token was expired
      if (err?.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        store.dispatch({ type: constants.ADMIN_LOGOUT });
        // toast.error("Session terminated, Please login.");
        console.log(err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;

// err.response?.data?.message == "user needs to be verified" &&
