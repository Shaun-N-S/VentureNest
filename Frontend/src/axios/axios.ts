import axios,{ type InternalAxiosRequestConfig} from "axios";
import { store } from "@/store/store";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const token = store.getState().token.token;
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
   (res) => res,
  async (err) => {
    const originalRequest: InternalAxiosRequestConfig = err.config;
    if (
      err.response.status === 403 &&
      err.response.data.message === "Unauthorized"
    ) {
      try {
        const response = await AxiosInstance.get("/refreshToken");
        store.dispatch({
          type: "token/addToken",
          payload: {
            token: response.data.accessToken
          },
        });
        originalRequest.headers.Authorization = `Bearer : ${response.data.accessToken}`;
        return AxiosInstance(originalRequest);
      } catch {
        store.dispatch({ type: "token/removeToken" });
      }
    }
  }

);

export default AxiosInstance;
