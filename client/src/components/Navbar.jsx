import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold">Expense Tracker</div>

        {/* Hamburger Icon (mobile view) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items (Desktop view) */}
        <div
          className={`hidden md:flex space-x-6 mx-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/dashboard" className="hover:text-gray-300 text-lg">
            Dashboard
          </Link>
          <Link to="/income" className="hover:text-gray-300 text-lg">
            Income
          </Link>
          <Link to="/expense" className="hover:text-gray-300 text-lg">
            Expense
          </Link>
        </div>

        {/* Login Button */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogoutClick}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu (on hamburger click) */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-gray-800 text-white p-4 space-y-4`}
      >
        <Link to="/home" className="block hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/income" className="block hover:text-gray-300">
          Income
        </Link>
        <Link to="/expense" className="block hover:text-gray-300">
          Expense
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
