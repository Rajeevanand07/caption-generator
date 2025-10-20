const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { createPost,getPosts } = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.post("/", 
  authMiddleware, // token availability and validity check (req.user = user)
  upload.single("image"), // multer middleware to handle multipart/form-data (req.file)
  createPost
);
router.get("/", getPosts);

module.exports = router;
