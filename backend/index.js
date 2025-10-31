const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config(); // load .env variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
