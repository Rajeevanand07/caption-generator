async function createPost(req, res) {
  const image = req.file;
  res.status(201).json({ message: "Post created successfully"});
  
}

module.exports = {
  createPost
};