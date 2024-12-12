import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
import ENDPOINTS from "../../utils/endPoints";

export const fetchStats = createAsyncThunk(
  "stats/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        method: "GET",
        url: ENDPOINTS.STATS_DATA,
        credentials: "include",
      };
      console.log("endpoints", ENDPOINTS.STATS_DATA);
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

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    stats: {
      expensesStats: {},
      incomeStats: {},
      profit: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default statsSlice.reducer;
