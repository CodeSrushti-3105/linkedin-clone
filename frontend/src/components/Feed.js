import React, { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      }
    };
    fetchPosts();
  }, [token]);

  // ✅ Create post
  const handlePost = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/posts",
        { userName: "Srushti", text },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPosts((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      setError("Error creating post. Check console for details.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", textAlign: "center" }}>
      <h2>LinkedIn Feed 📰</h2>

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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginTop: "30px" }}>
        {Array.isArray(posts) && posts.length > 0 ? (
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
          <p>No posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default Feed;
