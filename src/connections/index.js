import axios from "axios";
import { url } from "@/connections/mainApi.js";

const api = axios.create({
  baseURL: url,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("rt__eva__backoffice");
    if (token) {
      config.headers['access_token'] = token; // Usar 'access_token' en lugar de 'Authorization'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

 
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("rt__eva__backoffice");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${url}auth/refreshToken`, { token: refreshToken });
          localStorage.setItem("rt__eva__backoffice", data.token);
          originalRequest.headers['access_token'] = data.token;

     
          return api(originalRequest);
        } catch (refreshError) {
        
          localStorage.removeItem("rt__eva__backoffice");
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
