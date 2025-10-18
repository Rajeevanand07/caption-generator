const { default: mongoose } = require("mongoose");
const momgoose = require("mongoose");

const postSchema = new momgoose.Schema({
  image: String,
  caption: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
});

const postModel = momgoose.model("Post", postSchema);
module.exports = postModel;