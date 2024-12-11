import catchAsyncError from "../middleware/catchAsyncError.js";
import Expense from "../schema/expense.schema.js";
import Income from "../schema/income.schema.js";
// import CustomError from "../utils/customError";

export const accountStatsCtrl = catchAsyncError(async (req, res) => {
  const expensesStats = await Expense.aggregate([
    { $match: { amount: { $gte: 20 }, userId: req.user.userId } }, // Filter by user
    {
      $group: {
        _id: null,
        averageExp: { $avg: "$amount" },
        totalExp: { $sum: "$amount" },
        minExp: { $min: "$amount" },
        maxExp: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const incomeStats = await Income.aggregate([
    { $match: { amount: { $gte: 20 }, userId: req.user.userId } }, // Filter by user
    {
      $group: {
        _id: null,
        averageInc: { $avg: "$amount" },
        totalInc: { $sum: "$amount" },
        minInc: { $min: "$amount" },
        maxInc: { $max: "$amount" },
        totalRecords: { $sum: 1 },
      },
    },
  ]);

  const profit =
    (incomeStats[0]?.totalInc || 0) - (expensesStats[0]?.totalExp || 0);

  res.status(200).json({
    success: true,
    expensesStats: expensesStats[0] || {},
    incomeStats: incomeStats[0] || {},
    profit,
  });
});
