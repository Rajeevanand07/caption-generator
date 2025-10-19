const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authRoutes = require("./route/auth.route");
const postRoutes = require("./route/post.route");

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
