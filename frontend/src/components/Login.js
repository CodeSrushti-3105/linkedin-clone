import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://linkedin-clone-b4p3.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successful!");
        navigate("/feed");
      } else {
        alert("Invalid response from server. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      alert(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#0A66C2",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          Login
        </button>
      </form>

      {/* ✅ Don’t have account → Signup link */}
      <p style={{ marginTop: "15px" }}>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{
            color: "#0A66C2",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Sign up here
        </span>
      </p>
    </div>
  );
}

export default Login;
