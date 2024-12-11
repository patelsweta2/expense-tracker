import Income from "../schema/income.schema.js";
import CustomError from "../utils/customError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

//create Income controller
export const createIncome = catchAsyncError(async (req, res, next) => {
  const { incomeName, amount, source, description, date } = req.body;

  // Create a new income document
  const income = await Income.create({
    incomeName,
    amount,
    source,
    description,
    date,
  });

  res.status(201).json({
    success: true,
    message: "Income created successfully",
    income,
  });
});

// Get All Incomes Controller
export const getAllIncomes = catchAsyncError(async (req, res, next) => {
  const incomes = await Income.find({ userId: req.user.userId });

  res.status(200).json({
    success: true,
    incomes,
  });
});

// Get Single Income Controller
export const getIncomeById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Find income by ID
  const income = await Income.findOne({ _id: id, userId: req.user.userId });

  if (!income) {
    return next(new CustomError("Income not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    income,
  });
});

// Update Income Controller
export const updateIncome = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { incomeName, amount, source, description, date } = req.body;

  // Find and update income by ID
  const income = await Income.findByIdAndUpdate(
    id,
    { incomeName, amount, source, description, date },
    { new: true, runValidators: true }
  );

  if (!income) {
    return next(new CustomError("Income not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "Income updated successfully",
    income,
  });
});

// Delete Income Controller
export const deleteIncome = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Find and delete income by ID
  const income = await Income.findByIdAndDelete(id);

  if (!income) {
    return next(new CustomError("Income not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    message: "Income deleted successfully",
  });
});
