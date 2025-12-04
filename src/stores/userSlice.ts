// store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from "../types/userTypes";
import { userService } from "../services/userService";
import { resetAuth } from "./authenSlice";

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

// 1. Tách thunk fetch info sang đây
export const fetchCurrentUserInfo = createAsyncThunk(
  "user/fetchCurrentUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await userService.getCurrentUserInfo();
      return res.data.data || null; // Trả về object User
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch user failed");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetch user
      .addCase(fetchCurrentUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetAuth, (state) => {
        state.currentUser = null;
        state.error = null;
      });
  },
});

export default userSlice.reducer;