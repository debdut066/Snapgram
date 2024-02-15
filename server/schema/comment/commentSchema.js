const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // References the related post
    image : { type: String, default : "" }, 
    content: { type: String, required: true, maxlength: 500 }, // Text of the comment
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Users who liked the comment
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Nested comments
  },
    { timestamps : true }
);

module.exports = mongoose.model("Comment", commentSchema);