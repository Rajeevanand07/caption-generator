const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createPost } = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});
const route = express.Router();

route.post("/", 
  authMiddleware, // token availability and validity check (req.user = user)
  upload.single("image"), // multer middleware to handle multipart/form-data (req.file)
  createPost
);

module.exports = route;
