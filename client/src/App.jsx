import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Lazy load page components
const Login = React.lazy(() => import("./components/Login"));
const Register = React.lazy(() => import("./components/Register"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Income = React.lazy(() => import("./pages/Income"));
const Expenses = React.lazy(() => import("./pages/Expenses"));
const Home = React.lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expenses />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
