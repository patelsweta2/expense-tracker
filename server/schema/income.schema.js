import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema(
  {
    incomeName: {
      type: String,
      required: [true, "Income name is required"],
      trim: true,
      minlength: [3, "Income name should be at least 3 characters long"],
      maxlength: [100, "Income name should not exceed 100 characters"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
      max: [99999999, "Amount exceeds the maximum limit"],
    },
    source: {
      type: String,
      required: [true, "Source of income is required"], // e.g., Salary, Freelance, Business
      trim: true,
      minlength: [3, "Source should be at least 3 characters long"],
      maxlength: [50, "Source should not exceed 50 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description should not exceed 500 characters"],
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", incomeSchema);

export default Income;
