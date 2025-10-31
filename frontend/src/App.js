// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* ✅ Default route — redirect to login if not logged in */}
        <Route path="/" element={<Navigate to={token ? "/feed" : "/login"} />} />

        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/create" element={<CreatePost />} />

        {/* Optional: catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
