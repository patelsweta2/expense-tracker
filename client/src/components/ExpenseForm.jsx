import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createExpense } from "../redux/slices/expenseSlice"; // Adjust path accordingly
import { useNavigate } from "react-router-dom";

const ExpenseForm = () => {
  const [incomeData, setIncomeData] = useState({
    incomeName: "",
    amount: "",
    source: "",
    description: "",
    date: new Date(),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.income);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setIncomeData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the createIncome action
    const resultAction = await dispatch(createExpense(incomeData));

    if (createIncome.fulfilled.match(resultAction)) {
      alert("Expense added successfully!");
      navigate("/"); // Redirect after success
    } else {
      alert(
        "Failed to add income: " + resultAction.payload ||
          resultAction.error.message
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Income</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Income Name</label>
          <input
            type="text"
            name="incomeName"
            value={incomeData.incomeName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={incomeData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Source</label>
          <input
            type="text"
            name="source"
            value={incomeData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={incomeData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <DatePicker
            selected={incomeData.date}
            onChange={handleDateChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          {loading ? "Submitting..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
