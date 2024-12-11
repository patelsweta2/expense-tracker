import express from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controller/expense.controller.js";

const router = express.Router();

// Create a new expense
router.post("/expenses", createExpense);

// Get all expenses
router.get("/expenses", getAllExpenses);

// Get a single expense by ID
router.get("/expenses/:id", getExpenseById);

// Update an expense by ID
router.put("/expenses/:id", updateExpense);

// Delete an expense by ID
router.delete("/expenses/:id", deleteExpense);

export default router;
