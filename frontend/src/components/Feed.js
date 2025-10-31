import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [userName, setUserName] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // ✅ Safe JSON parse helper
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  // ✅ Logout function (to pass into Navbar)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const storedUser = localStorage.getItem("user");
      const user = safeParse(storedUser);
      if (user) {
        setUserName(user.name || user.email || "User");
      } else {
        // If invalid JSON, log out safely
        handleLogout();
      }
    }
  }, [token, navigate]);

  // ✅ Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(res.data)) {
        setPosts(res.data);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  // ✅ Create a new post
  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter something before posting.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { userName, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts([res.data, ...posts]);
      setText("");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    }
  };

  // ✅ Like a post (frontend-only)
  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post._id === id
          ? { ...post, likes: (post.likes || 0) + 1, liked: true }
          : post
      )
    );
  };

  // ✅ Delete a post
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((post) => post._id !== id));
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Try again.");
    }
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />

      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0A66C2" }}>Welcome, {userName}! 👋</h2>
        <p style={{ color: "gray" }}>Share your thoughts with everyone</p>

        {/* ✅ Create Post Form */}
        <form
          onSubmit={handlePost}
          style={{
            marginTop: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "15px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <textarea
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              resize: "none",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontFamily: "inherit",
            }}
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            type="submit"
            style={{
              background: "#0A66C2",
              color: "white",
              border: "none",
              padding: "10px 16px",
              marginTop: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Post
          </button>
        </form>

        {/* ✅ All Posts */}
        <div style={{ marginTop: "30px" }}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "15px",
                  textAlign: "left",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <strong style={{ color: "#0A66C2" }}>{post.userName}</strong>
                <p style={{ marginTop: "8px", marginBottom: "6px" }}>
                  {post.text}
                </p>
                <small style={{ color: "gray" }}>
                  {new Date(post.createdAt).toLocaleString()}
                </small>

                {/* ✅ Buttons */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "15px",
                  }}
                >
                  {/* Like button */}
                  <button
                    onClick={() => handleLike(post._id)}
                    disabled={post.liked}
                    style={{
                      background: post.liked ? "#e8f0fe" : "#f3f2ef",
                      color: post.liked ? "#0A66C2" : "black",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    👍 Like ({post.likes || 0})
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={{
                      background: "#fff5f5",
                      color: "red",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: "gray", marginTop: "20px" }}>
              No posts yet. Be the first to share something!
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Feed;
