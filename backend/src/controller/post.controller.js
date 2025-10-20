const { generateCaption } = require("../service/ai.service");
const { uploadFile } = require("../service/storage.service");
const jwt = require("jsonwebtoken");
const postModel = require("../model/post.model");
const { v4: uuidv4 } = require("uuid");

async function createPost(req, res) {
  const file = req.file;
  const tone = req.body.tone;

  const base64Image = new Buffer.from(file.buffer).toString("base64");
  const [image, caption] = await Promise.all([
    uploadFile(base64Image, uuidv4()),
    generateCaption(base64Image, tone),
  ]);

  const newPost = await postModel.create({
    image: image.url,
    caption: caption,
    user: req.user._id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
}

async function getPosts(req, res) {
  const token = req.cookies?.token;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userPosts = await postModel
      .find({ user: decoded.id })
      .sort({ createdAt: -1 });
    res.status(200).json({ posts: userPosts });
  }
}

module.exports = {
  createPost,
  getPosts,
};
