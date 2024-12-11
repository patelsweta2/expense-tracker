import mongoose from "mongoose";

// Expense Schema
const expenseSchema = new mongoose.Schema(
  {
    expenseName: {
      type: String,
      required: [true, "Expense name is required"],
      trim: true,
      minlength: [3, "Expense name should have at least 3 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be a positive number"],
      max: [99999999, "Amount exceeds the maximum limit"],
    },
    // type: {
    //   type: String,
    //   default: "expense",
    //   enum: {
    //     values: ["expense", "income"],
    //     message: "Type must be either 'expense' or 'income'",
    //   },
    // },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [3, "Category should have at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description should not exceed 500 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
