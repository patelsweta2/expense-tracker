import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStats } from "../redux/slices/statsSlice";
import { getAllExpenses } from "../redux/slices/expenseSlice";
import { getAllIncomes } from "../redux/slices/incomeSlice";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering required Chart.js components
ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  const dispatch = useDispatch();

  const {
    stats,
    isLoading: statsLoading,
    error: statsError,
  } = useSelector((state) => state.stats);
  const {
    expenses,
    isLoading: expensesLoading,
    error: expensesError,
  } = useSelector((state) => state.expense);
  const {
    incomes,
    isLoading: incomesLoading,
    error: incomesError,
  } = useSelector((state) => state.income);

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(getAllExpenses());
    dispatch(getAllIncomes());
  }, [dispatch]);

  if (statsLoading || expensesLoading || incomesLoading)
    return <p>Loading...</p>;
  if (statsError || expensesError || incomesError)
    return <p>Error: {statsError || expensesError || incomesError}</p>;

  // Prepare expense data for the graph
  const expenseCategories = expenses.map((expense) => expense.category);
  const expenseAmounts = expenses.map((expense) => expense.amount);

  // Prepare income data for the graph
  const incomeSources = incomes.map((income) => income.source);
  const incomeAmounts = incomes.map((income) => income.amount);

  // Profit data (for visualization as an example)
  const profit = stats.profit;

  // Expense Pie Chart Data
  const expenseData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseAmounts,
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A1",
          "#FF5733",
          "#33A1FF",
        ],
      },
    ],
  };

  // Income Pie Chart Data
  const incomeData = {
    labels: incomeSources,
    datasets: [
      {
        data: incomeAmounts,
        backgroundColor: [
          "#FFCC00",
          "#33CCFF",
          "#99FF33",
          "#FF6600",
          "#CC33FF",
        ],
      },
    ],
  };

  // Profit Line Chart Data (Static example)
  const profitData = {
    labels: ["Profit"], // Could be dynamic over time
    datasets: [
      {
        label: "Profit",
        data: [profit],
        borderColor: "#4CAF50",
        backgroundColor: "#81C784",
        fill: false,
      },
    ],
  };

  // Stats Data (expensesStats & incomeStats)
  const { averageExp, totalExp, minExp, maxExp, totalRecords } =
    stats.expensesStats || {};
  const { averageInc, totalInc, minInc, maxInc } = stats.incomeStats || {};

  return (
    <div className="graph-container">
      <h1 className="title">Expense Tracker</h1>

      {/* Graph Section */}
      <div className="chart-container">
        <div className="chart-item">
          <h2>Expense Categories</h2>
          <Pie data={expenseData} />
        </div>

        <div className="chart-item">
          <h2>Income Sources</h2>
          <Pie data={incomeData} />
        </div>

        <div className="chart-item">
          <h2>Profit</h2>
          <Bar data={profitData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-container">
        <h2>Statistics</h2>
        <div className="stats-box">
          <div className="stat-card">
            <h3>Average Expense</h3>
            <p>{averageExp ? `₹${averageExp.toFixed(2)}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Total Expense</h3>
            <p>{totalExp ? `₹${totalExp.toFixed(2)}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Min Expense</h3>
            <p>{minExp ? `₹${minExp}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Max Expense</h3>
            <p>{maxExp ? `₹${maxExp}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Total Expense Records</h3>
            <p>{totalRecords || "N/A"}</p>
          </div>

          <div className="stat-card">
            <h3>Average Income</h3>
            <p>{averageInc ? `₹${averageInc.toFixed(2)}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Total Income</h3>
            <p>{totalInc ? `₹${totalInc.toFixed(2)}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Min Income</h3>
            <p>{minInc ? `₹${minInc}` : "N/A"}</p>
          </div>
          <div className="stat-card">
            <h3>Max Income</h3>
            <p>{maxInc ? `₹${maxInc}` : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
