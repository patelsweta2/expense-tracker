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
        data: loginData,
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      cookies.set("token", response.data.token, { expires: 7 });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Logout action
export const logout = () => {
  cookies.remove("token");
  return { type: "user/logout" };
};

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // for register
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
      // for Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout: logoutAction } = userSlice.actions;
export default userSlice.reducer;
