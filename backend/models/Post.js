const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema], // ✅ include comments array
});

module.exports = mongoose.model("Post", PostSchema);
