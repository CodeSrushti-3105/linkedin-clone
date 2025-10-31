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
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token); // save token
      alert("Login successful!");
      navigate("/feed"); // ✅ redirect to feed
    } catch (err) {
      console.error(err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Signup here
        </span>
      </p>
    </div>
  );
}

export default Login;
