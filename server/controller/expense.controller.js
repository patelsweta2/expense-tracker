import Expense from "../schema/expense.schema.js";
import CustomError from "../utils/customError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create a new expense
export const createExpense = catchAsyncError(async (req, res, next) => {
  const { expenseName, amount, type, category, description, date } = req.body;

  // Create a new expense entry in the database
  const expense = await Expense.create({
    expenseName,
    amount,
    category,
    description,
    date,
  });

  res.status(201).json({
    success: true,
    message: "Expense created successfully",
    expense,
  });
});

// Get all expenses
export const getAllExpenses = catchAsyncError(async (req, res, next) => {
  const expenses = await Expense.find({ userId: req.user.userId });

  res.status(200).json({
    success: true,
    expenses,
  });
});

// Get a single expense by ID
export const getExpenseById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const expense = await Expense.findOne({ _id: id, userId: req.user.userId });

  if (!expense) {
    return next(new CustomError("Expense not found", 404));
  }

  res.status(200).json({
    success: true,
    expense,
  });
});

// Update an expense
export const updateExpense = catchAsyncError(async (req, res, next) => {
  const { expenseName, amount, category, description, date } = req.body;

  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    { expenseName, amount, category, description, date },
    { new: true, runValidators: true }
  );

  if (!expense) {
    return next(new CustomError("Expense not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Expense updated successfully",
    expense,
  });
});

// Delete an expense
export const deleteExpense = catchAsyncError(async (req, res, next) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) {
    return next(new CustomError("Expense not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Expense deleted successfully",
  });
});
