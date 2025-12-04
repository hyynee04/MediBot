import type { ApiResponse } from "../types/apiResponse";
import type { User } from "../types/userTypes";
import axiosClient from "../utils/axiosConfig";

const USER_BASE_URL = "/api/User";

export const userService = {
  getCurrentUserInfo: () => {
    return axiosClient.get<ApiResponse<User>>(
      `${USER_BASE_URL}/GetCurrentUserInfo`,
    );
  },
};
