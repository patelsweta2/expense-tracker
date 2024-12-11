import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createExpense } from "../redux/slices/expenseSlice"; // Adjust path accordingly

const ExpenseForm = () => {
  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    amount: "",
    category: "",
    description: "",
    date: new Date(),
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.expense); // Corrected the state reference

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setExpenseData((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the createExpense action
    const resultAction = await dispatch(createExpense(expenseData));

    if (createExpense.fulfilled.match(resultAction)) {
      alert("Expense added successfully!");
      setExpenseData({
        expenseName: "",
        amount: "",
        category: "",
        description: "",
        date: new Date(),
      });
    } else {
      alert(
        "Failed to add expense: " +
          (resultAction.payload || resultAction.error.message)
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
      <div>
        {error && (
          <p className="text-red-500">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}{" "}
      </div>

      {/* Show error from expense slice */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Expense Name</label>
          <input
            type="text"
            name="expenseName" // Corrected name
            value={expenseData.expenseName} // Corrected value
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
            value={expenseData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category" // Fixed the incorrect 'source' to 'category'
            value={expenseData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <DatePicker
            selected={expenseData.date}
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
