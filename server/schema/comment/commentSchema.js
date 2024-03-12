const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    creator: { type: mongoose.Types.ObjectId, ref: "User" },
    postId : { type: mongoose.Types.ObjectId, ref: "Post" },
    image : { type: String, default : "" }, 
    content: { type: String, required: true, maxlength: 500 }, // Text of the comment
    l_c : { type : Number, default : 0 },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Users who liked the comment
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Nested comments
  },
    { timestamps : true }
);

module.exports = mongoose.model("Comment", commentSchema);