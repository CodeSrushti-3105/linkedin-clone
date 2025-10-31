const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middleware/auth");

// ✅ GET all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "name");
    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ CREATE a post
router.post("/", auth, async (req, res) => {
  try {
    const { text, userName } = req.body;

    if (!text || !userName) {
      return res.status(400).json({ message: "Text and userName are required" });
    }

    const newPost = new Post({
      user: req.user.id,
      userName,
      text,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
