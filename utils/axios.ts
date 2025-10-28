import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { Platform } from "react-native";

const envURL =
  process.env.EXPO_PUBLIC_DOMAIN_BACKEND ||
  process.env.DOMAIN_BACKEND ||
  // @ts-expect-error allow VITE_ during dev parity
  process.env.VITE_DOMAIN_BACKEND ||
  "";

// Handle emulator/device localhost differences
const localFallback = Platform.select({
  ios: "http://localhost:8080",
  android: "http://10.0.2.2:8080",
  default: "http://127.0.0.1:8080",
});

const baseURL = envURL || localFallback!;

// Log for quick diagnosis in dev
if (__DEV__) {
  // eslint-disable-next-line no-console
  console.log("[axios] baseURL:", baseURL);
}

const axiosInstance = axios.create({
  baseURL,
  // Disable cookies by default; enable only if backend supports it for mobile
  withCredentials: false,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const access_token = localStorage.getItem("access_token");
//     if (access_token) {
//       config.headers?.set("Authorization", `Bearer ${access_token}`);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post<{ access_token: string }>(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
