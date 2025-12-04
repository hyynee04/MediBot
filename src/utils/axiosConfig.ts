import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";
import { paths } from "../routes/paths";

const axiosClient = axios.create({
  baseURL: "https://localhost:7290",
  withCredentials: true,
});

// 1. Tạo biến local để giữ store
let store: any;

// 2. Hàm để nhận store từ bên ngoài (main.tsx) truyền vào
export const injectStore = (_store: any) => {
  store = _store;
};

// Attach token
axiosClient.interceptors.request.use(
  (config) => {
    // Luôn đọc trực tiếp từ localStorage trước mỗi request
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (error.response?.status === 401) {
      // 1. Xóa token trong localStorage
      localStorage.removeItem("token");

      // 2. Chuyển hướng về trang login bằng window.location
      window.location.href = paths.root;
    }

    if (error.response) {
      return Promise.reject({
        status,
        data: error.response.data,
      });
    }

    return Promise.reject({ status: 0, message: "Network error" });
  }
);

export default axiosClient;
