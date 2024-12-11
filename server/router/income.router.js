import express from "express";
import {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} from "../controller/income.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/incomes").post(authMiddleware, createIncome); // Create income
router.route("/incomes").get(authMiddleware, getAllIncomes); // Get all incomes
router.route("/incomes/:id").get(authMiddleware, getIncomeById); // Get income by ID
router.route("/incomes/:id").put(authMiddleware, updateIncome); // Update income by ID
router.route("/incomes/:id").delete(authMiddleware, deleteIncome); // Delete income by ID

export default router;
