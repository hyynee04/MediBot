import type { ApiResponse } from "../types/apiResponse";
import type { LoginRequest, SignUpRequest } from "../types/authenTypes";
import axiosClient from "../utils/axiosConfig";

const USER_BASE_URL = "/api/Authen";

export const authenService = {
  login: (data: LoginRequest) => {
    return axiosClient.post<ApiResponse<any>>(
      `${USER_BASE_URL}/Login`,
      data
    );
  },

  signup: (data: SignUpRequest) => {
    return axiosClient.post<ApiResponse<any>>(
      `${USER_BASE_URL}/SignUp`,
      {
        FullName: data.name,
        Username: data.username,
        Password: data.password
      }
    );
  },

  logout: () => {
    return axiosClient.post(`${USER_BASE_URL}/Logout`);
  }
};
