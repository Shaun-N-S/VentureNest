import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config)=>{
  return config;
})

instance.interceptors.response.use((config)=>{
  return config;
})

export default instance;