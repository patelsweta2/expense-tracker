import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/userSlice"; // Make sure to import the action

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing loading and error from the Redux state
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterRedirect = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = await dispatch(registerUser(formData));

    if (action.type === "user/register/fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md focus:outline-none"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="text-green-600 hover:underline"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
