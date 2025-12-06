// store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authenService } from "../services/authenService";
import type { LoginRequest, SignUpRequest } from "../types/authenTypes";
import { fetchCurrentUserInfo } from "./userSlice";
import { fetchConversations } from "./chatSlice";

interface AuthState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  token: storedToken || null,
  loading: false,
  error: null,
  // Đã bỏ field 'user' đi vì nó nằm bên userSlice rồi
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginRequest, { rejectWithValue, dispatch }) => {
    try {
      const res = await authenService.login(payload);

      // --- XỬ LÝ THÀNH CÔNG ---
      const token = res.data.data.token;
      localStorage.setItem("token", token);

      await dispatch(fetchCurrentUserInfo()).unwrap();
      await dispatch(fetchConversations()).unwrap();

      return token;

    } catch (err: any) {
      console.log(err);

      if (err.data && err.data.data) {
        return rejectWithValue(err.data.data || "Something happened. Please try again!");
      }
      return rejectWithValue("Something happened. Please try again!");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload: SignUpRequest, { rejectWithValue }) => {
    try {
      await authenService.signup(payload);
      return true;
    } catch (err: any) {
      const errorMsg =
        err?.data?.data || "Something happened. Please try again!";
      return rejectWithValue(errorMsg);
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    // try {
    //   await authenService.logout();
    // } catch (err) {
    //   console.error("Logout API failed", err);
    // }
    try {
      localStorage.removeItem("token");
      dispatch(resetAuth());
      return true;
    } catch (err: any) {
      dispatch(resetAuth()); // Lỗi cũng reset luôn
      return rejectWithValue(err.data?.data);
    }
  }
);

export const authenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearAuthError: (state) => {
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Payload giờ chỉ là token string
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

  },
});

export const { resetAuth, clearAuthError } = authenSlice.actions;
export default authenSlice.reducer;