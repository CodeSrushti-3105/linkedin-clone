import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./components/Feed";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/feed"
          element={token ? <Feed /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
