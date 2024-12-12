import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
import cookies from "js-cookie"; // Ensure this is correctly imported
import ENDPOINTS from "../../utils/endPoints";

// for user register
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: ENDPOINTS.REGISTER,
        credentials: "include",
        data: userData,
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// for user login
export const loginUser = createAsyncThunk(
  "user/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: ENDPOINTS.LOGIN,
        credentials: "include",
        data: loginData,
      };
      const response = await request(config);
      console.log("login", response.data);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      cookies.set("auth_token", response.data.token, { path: "/" });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout action
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: ENDPOINTS.LOGOUT,
        credentials: "include",
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.message || "Logout failed");
      }
      cookies.remove("auth_token", { path: "/" });
      return response.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // For register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // For login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // For logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout: logoutAction } = userSlice.actions;
export default userSlice.reducer;
