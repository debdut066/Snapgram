
const { default: mongoose } = require("mongoose");
const { uploadImage } = require("../helpers/helpers")
const Comment = require("../schema/comment/commentSchema");
const Post = require("../schema/post/postSchema")
const createError = require('http-errors');

const createComment = async (userId, postId, content, file) => {
    try {
        let comment;
        const post = await Post.findById(postId);
        if(!post){
            return createError.BadRequest("the post doesn't exist anymore")
        }

        if(file){
            let imageUrl = await uploadImage(file);
            if(imageUrl){
                comment = new Comment({
                    _id : new mongoose.Types.ObjectId(),
                    creator : userId,
                    post : postId,
                    image : imageUrl,
                    content,
                })
            }
        }else{
            comment = new Comment({
                _id : new mongoose.Types.ObjectId(),
                creator : userId,
                post : postId,
                content,
            })
        }
        const response = await comment.save();
        return response;

    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createComment
}