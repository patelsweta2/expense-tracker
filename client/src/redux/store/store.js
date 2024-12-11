import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./../slices/userSlice";
import incomeSlice from "./../slices/incomeSlice";
import apiMiddleware from "../middleware/apiMiddleware";
import toastMiddleware from "../middleware/toastMiddleware";

const store = configureStore({
  reducer: {
    user: userSlice,
    income: incomeSlice,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware,
    apiMiddleware,
    toastMiddleware,
  ],
});

export default store;
