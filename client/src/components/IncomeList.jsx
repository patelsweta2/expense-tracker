import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllIncomes } from "../redux/slices/incomeSlice";
// import { Link } from "react-router-dom";

const IncomeList = () => {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.income);
  useEffect(() => {
    dispatch(getAllIncomes());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Incomes List</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Income Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Source</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.length > 0 ? (
              incomes.map((income) => (
                <tr key={income.id}>
                  <td className="border px-4 py-2">{income.incomeName}</td>
                  <td className="border px-4 py-2">{income.amount}</td>
                  <td className="border px-4 py-2">{income.source}</td>
                  <td className="border px-4 py-2">{income.description}</td>
                  <td className="border px-4 py-2">
                    {new Date(income.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-yellow-500 text-white py-1 px-3 rounded-md">
                      Update
                    </button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded-md ml-2">
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
      )}
    </div>
  );
};

export default IncomeList;