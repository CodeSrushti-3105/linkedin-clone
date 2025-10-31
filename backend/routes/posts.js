const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

// ✅ Create a new post
router.post("/", auth, async (req, res) => {
  try {
    const { userName, text } = req.body;
    if (!userName || !text)
      return res.status(400).json({ message: "Missing data" });

    const post = new Post({ userName, text });
    const saved = await post.save();
    res.json(saved);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Server error creating post" });
  }
});

// ✅ Get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error fetching posts" });
  }
});

// ✅ Delete a post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Server error deleting post" });
  }
});

// ✅ Add comment to post
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const { userName, text } = req.body;
    if (!userName || !text)
      return res.status(400).json({ message: "Invalid comment data" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { userName, text, createdAt: new Date() };
    post.comments.push(newComment);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Error adding comment" });
  }
});

// ✅ Get comments of a post
router.get("/:id/comments", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post.comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
});

module.exports = router;
