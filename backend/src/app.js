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
    origin:[ "http://localhost:5173","https://caption-generator-red-eight.vercel.app"], 
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
