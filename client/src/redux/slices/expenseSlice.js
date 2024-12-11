import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../utils/request";
import ENDPOINTS from "../../utils/endPoints";
import Cookies from "js-cookie";

// create Expense action
export const createExpense = createAsyncThunk(
  "expense/create",
  async (expenseData, { rejectWithValue }) => {
    try {
      const config = {
        method: "POST",
        url: ENDPOINTS.ADD_EXPENSES,
        data: expenseData,
        headers: {},
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

// get all expenses action
export const getAllExpenses = createAsyncThunk(
  "expense/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        method: "GET",
        url: ENDPOINTS.GET_ALL_EXPENSES,
        headers: {},
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return response.data; // Return the list of all expenses
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get One Expense action
export const getOneExpense = createAsyncThunk(
  "expense/getOne",
  async (expenseId, { rejectWithValue }) => {
    try {
      const config = {
        method: "GET",
        url: `${ENDPOINTS.GET_ONE_EXPENSE}/${expenseId}`,
        headers: {},
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return response.data; // Return the specific expense data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Expense action
export const updateExpense = createAsyncThunk(
  "expense/update",
  async ({ expenseId, expenseData }, { rejectWithValue }) => {
    try {
      const config = {
        method: "PUT",
        url: `${ENDPOINTS.UPDATE_EXPENSE}/${expenseId}`, // Ensure expenseId is in the URL
        data: expenseData,
        headers: {},
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return response.data; // Return the updated expense data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Expense action
export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async (expenseId, { rejectWithValue }) => {
    try {
      const config = {
        method: "DELETE",
        url: `${ENDPOINTS.DELETE_EXPENSE}/${expenseId}`,
        headers: {},
      };
      const response = await request(config);
      if (!response.success) {
        return rejectWithValue(response.data);
      }
      return expenseId; // Return the expenseId that was deleted
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  expenses: [],
  expense: null,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Expense
      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload : action.error.message;
      })
      // Get All Expenses
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload; // Set the list of expenses
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Get One Expense
      .addCase(getOneExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload; // Set the selected expense
      })
      .addCase(getOneExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expense = action.payload;
        // Optionally update the expense in the list if necessary
        const index = state.expenses.findIndex(
          (expense) => expense.id === action.payload.id
        );
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      // Delete Expense
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (expense) => expense.id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default expenseSlice.reducer;
