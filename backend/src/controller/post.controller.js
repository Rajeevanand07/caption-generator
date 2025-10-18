const { generateCaption } = require("../service/ai.service");
const { uploadFile } = require("../service/storage.service");
const postModel = require("../model/post.model");
const { v4: uuidv4 } = require("uuid");

async function createPost(req, res) {
  const file = req.file;
  const base64Image = new Buffer.from(file.buffer).toString("base64");
  const [image, caption] = await Promise.all([
    uploadFile(base64Image, uuidv4()),
    generateCaption(base64Image),
  ]);

  const newPost = await postModel.create({
    image: image.url,
    caption: caption,
    user: req.user._id,
  });

  res
    .status(201)
    .json({
      message: "Post created successfully",
      post: newPost,
    });
}

module.exports = {
  createPost,
};
