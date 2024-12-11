import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./../slices/userSlice";
import incomeSlice from "./../slices/incomeSlice";
import expenseSlice from "./../slices/expenseSlice";
import apiMiddleware from "../middleware/apiMiddleware";
import toastMiddleware from "../middleware/toastMiddleware";

const store = configureStore({
  reducer: {
    user: userSlice,
    income: incomeSlice,
    expense: expenseSlice,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware,
    apiMiddleware,
    toastMiddleware,
  ],
});

export default store;
