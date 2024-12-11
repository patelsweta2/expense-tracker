import React, { useState } from "react";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";

const Home = () => {
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <div className="mt-14 flex flex-col items-center">
      {/* Buttons */}
      <div className="space-x-4">
        <button
          onClick={() => setShowIncomeForm(true)}
          className=" mt-10 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-800"
        >
          Add Income
        </button>
        <button
          onClick={() => setShowExpenseForm(true)}
          className="mt-10 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Expense
        </button>
      </div>

      {/* Income Form */}
      {showIncomeForm && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => setShowIncomeForm(false)}
            className="absolute top-2 right-2 text-red-500 text-lg font-bold"
          >
            &times;
          </button>
          <IncomeForm />
        </div>
      )}

      {/* Expense Form */}
      {showExpenseForm && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => setShowExpenseForm(false)}
            className="absolute top-2 right-2 text-red-500 text-lg font-bold"
          >
            &times;
          </button>
          <ExpenseForm />
        </div>
      )}
    </div>
  );
};

export default Home;
