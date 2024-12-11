import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
