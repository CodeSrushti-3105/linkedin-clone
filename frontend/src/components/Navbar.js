import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAccount, setShowAccount] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Load user info from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
      }
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAccount(false);
      }
    };
    if (showAccount) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAccount]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout successful!");
    if (onLogout) onLogout();
    navigate("/login");
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
        position: "relative",
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
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <button
          onClick={() => navigate("/feed")}
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "6px 12px",
            borderRadius: "5px",
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
          }}
        >
          Create
        </button>

        {/* 👤 Account Icon */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <div
            onClick={() => setShowAccount(!showAccount)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "white",
              color: "#0077b5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              userSelect: "none",
            }}
            title="Account"
          >
            👤
          </div>

          {/* Dropdown Menu */}
          {showAccount && user && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "45px",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "12px",
                width: "200px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "left",
                zIndex: 10,
              }}
            >
              {/* Close Button */}
              <div
                onClick={() => setShowAccount(false)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "8px",
                  color: "gray",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                ❌
              </div>

              <p
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  color: "#0077b5",
                  marginTop: "10px",
                }}
              >
                {user.name}
              </p>
              <p
                style={{
                  margin: "5px 0 10px 0",
                  fontSize: "13px",
                  color: "gray",
                }}
              >
                {user.email}
              </p>

              <button
                onClick={handleLogout}
                style={{
                  background: "crimson",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
