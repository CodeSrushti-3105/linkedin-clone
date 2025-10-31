import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  // ✅ Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(Array.isArray(res.data) ? res.data : []); // ensure array
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };
    fetchPosts();
  }, [token]);

  // ✅ Create new post
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { userName: "Srushti", text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([res.data, ...posts]);
      setText("");
    } catch (err) {
      console.error("Error creating post", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", textAlign: "center" }}>
      {/* ✅ Header with Logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>LinkedIn Feed 📰</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "crimson",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* ✅ Post Form */}
      <form onSubmit={handlePost}>
        <textarea
          rows="3"
          style={{ width: "100%", padding: "10px" }}
          placeholder="What’s on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button type="submit" style={{ marginTop: "10px" }}>
          Post
        </button>
      </form>

      {/* ✅ Posts List */}
      <div style={{ marginTop: "30px" }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "15px",
                textAlign: "left",
              }}
            >
              <strong>{post.userName}</strong>
              <p>{post.text}</p>
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No posts yet. Start by creating one!</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
