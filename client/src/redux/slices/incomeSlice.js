import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
import ENDPOINTS from "../../utils/endPoints";
import catchAsyncError from "../../../../server/middleware/catchAsyncError";

//create Income action
export const createIncome = catchAsyncError(
  "income/create",
  async (incomeData, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: ENDPOINTS.ADD_INCOME,
        data: incomeData,
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

//get all Incomes action
export const getAllIncomes = createAsyncThunk(
  "income/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        method: "GET",
        url: ENDPOINTS.GET_ALL_INCOME,
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return response.data; // Return the list of all incomes
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// get one Income action
export const getOneIncome = createAsyncThunk(
  "income/getOne",
  async (incomeId, { rejectWithValue }) => {
    try {
      const config = {
        method: "GET",
        url: `${ENDPOINTS.GET_ONE_INCOME}/${incomeId}`,
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

//update Income action
export const updateIncome = createAsyncThunk(
  "income/update",
  async ({ incomeId, incomeData }, { rejectWithValue }) => {
    try {
      const config = {
        method: "PUT",
        url: `${ENDPOINTS.UPDATE_INCOME}/${incomeId}`,
        data: incomeData,
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

// Delete Income action
export const deleteIncome = createAsyncThunk(
  "income/delete",
  async (incomeId, { rejectWithValue }) => {
    try {
      const config = {
        method: "DELETE",
        url: `${ENDPOINTS.DELETE_INCOME}/${incomeId}`,
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return incomeId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  incomes: [],
  income: null,
  loading: false,
  error: null,
};

const incomeSlice = createSlice({
  name: "income",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Income
      .addCase(createIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes.push(action.payload);
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get All Incomes
      .addCase(getAllIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get One Income
      .addCase(getOneIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
      })
      .addCase(getOneIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update Income
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.income = action.payload;
        // Optionally update the income in the list if necessary
        const index = state.incomes.findIndex(
          (income) => income.id === action.payload.id
        );
        if (index !== -1) {
          state.incomes[index] = action.payload;
        }
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete Income
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = state.incomes.filter(
          (income) => income.id !== action.payload
        );
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default incomeSlice.reducer;
