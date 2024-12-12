import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "../redux/slices/expenseSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Expenses List</h2>
      {error && <p className="text-red-500">{JSON.stringify(error)}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Expense Name</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses?.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense._id}>
                    <td className="border px-4 py-2">{expense.expenseName}</td>
                    <td className="border px-4 py-2">{expense.amount}</td>
                    <td className="border px-4 py-2">{expense.category}</td>
                    <td className="border px-4 py-2">{expense.description}</td>
                    <td className="border px-4 py-2">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md mr-2 mb-2 transition duration-300">
                        Update
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md mb-2 transition duration-300">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="border px-4 py-2 text-center">
                    No incomes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
