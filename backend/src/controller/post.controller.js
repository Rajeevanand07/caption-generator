const { generateCaption } = require("../service/ai.service");

async function createPost(req, res) {
  const file = req.file;
  const base64Image = new Buffer.from(file.buffer).toString("base64");
  const caption = await generateCaption(base64Image);

  res
    .status(201)
    .json({ message: "Post created successfully", caption: caption });
}

module.exports = {
  createPost,
};
