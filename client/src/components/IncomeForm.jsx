import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createIncome, updateIncome } from "../redux/slices/incomeSlice"; // Adjust path accordingly

const IncomeForm = ({ existingIncomeData }) => {
  const [incomeData, setIncomeData] = useState({
    incomeName: "",
    amount: "",
    source: "",
    description: "",
    date: new Date(),
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.income);

  // If existingIncomeData is passed, populate the form for updating
  useEffect(() => {
    if (existingIncomeData) {
      setIncomeData(existingIncomeData);
    }
  }, [existingIncomeData]);

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
    let resultAction;
    if (existingIncomeData) {
      // Update income
      resultAction = await dispatch(updateIncome(incomeData));
    } else {
      // Create new income
      resultAction = await dispatch(createIncome(incomeData));
    }

    if (
      createIncome.fulfilled.match(resultAction) ||
      updateIncome.fulfilled.match(resultAction)
    ) {
      alert(
        existingIncomeData
          ? "Income updated successfully!"
          : "Income added successfully!"
      );
      setIncomeData({
        incomeName: "",
        amount: "",
        source: "",
        description: "",
        date: new Date(),
      });
    } else {
      alert(
        "Failed to " +
          (existingIncomeData ? "update" : "add") +
          " income: " +
          resultAction.payload || resultAction.error.message
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">
        {existingIncomeData ? "Update Income" : "Add Income"}
      </h2>
      <div>
        {error && (
          <p className="text-red-500">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}
      </div>
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
          className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600"
        >
          {loading
            ? "Submitting..."
            : existingIncomeData
            ? "Update Income"
            : "Add Income"}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
