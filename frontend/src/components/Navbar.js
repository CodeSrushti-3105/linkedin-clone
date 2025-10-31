import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout successful!");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0077b5",
        color: "white",
        padding: "10px 20px",
      }}
    >
      {/* Logo / Title */}
      <h2
        style={{ cursor: "pointer", margin: 0 }}
        onClick={() => navigate("/feed")}
      >
        LinkedIn Clone
      </h2>

      {/* Navigation Buttons */}
      <div>
        <button
          onClick={() => navigate("/feed")}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "6px 12px",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Feed
        </button>

        <button
          onClick={() => navigate("/create")}
          style={{
            background: "white",
            color: "#0077b5",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Create
        </button>

        <button
          onClick={handleLogout}
          style={{
            background: "crimson",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
