import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <Login /> */}
      <Register />
    </div>
  );
};

export default App;
