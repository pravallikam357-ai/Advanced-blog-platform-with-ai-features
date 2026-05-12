const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Routes
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blogs");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// ✅ Start server (ONLY ONCE)
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("Server running on port 5000");
});