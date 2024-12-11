import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expenses />} />
      </Routes>
    </Router>
  );
};

export default App;
