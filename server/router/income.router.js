import express from "express";
import {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome,
} from "../controller/income.controller.js";

const router = express.Router();

router.route("/incomes").post(createIncome); // Create income
router.route("/incomes").get(getAllIncomes); // Get all incomes
router.route("/incomes/:id").get(getIncomeById); // Get income by ID
router.route("/incomes/:id").put(updateIncome); // Update income by ID
router.route("/incomes/:id").delete(deleteIncome); // Delete income by ID

export default router;
