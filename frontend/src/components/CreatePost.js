import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { userName: "Srushti", text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post created successfully!");
      navigate("/feed");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
        <h2>Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            style={{ width: "100%", padding: "10px" }}
            placeholder="Share something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            style={{
              marginTop: "10px",
              backgroundColor: "#0077b5",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
