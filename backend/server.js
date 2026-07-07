// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ==================== Middleware ====================

origin: [
  "http://localhost:5173",
  "https://nutri-sync-311b7x3rz-shashankjoshiiis-projects.vercel.app",
],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());

// ==================== Database Connection ====================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// ==================== Routes ====================

app.get("/", (req, res) => {
  res.send("NutriSync API is running...");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/food", require("./routes/food"));

// ==================== Start Server ====================

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
