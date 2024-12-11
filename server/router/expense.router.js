import express from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controller/expense.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new expense
router.post("/expenses", authMiddleware, createExpense);

// Get all expenses
router.get("/expenses", authMiddleware, getAllExpenses);

// Get a single expense by ID
router.get("/expenses/:id", authMiddleware, getExpenseById);

// Update an expense by ID
router.put("/expenses/:id", authMiddleware, updateExpense);

// Delete an expense by ID
router.delete("/expenses/:id", authMiddleware, deleteExpense);

export default router;
