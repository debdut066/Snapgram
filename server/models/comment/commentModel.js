
const { default: mongoose } = require("mongoose");
const { uploadImage } = require("../../helpers/helpers")
const Comment = require("../../schema/comment/commentSchema");
const Post = require("../../schema/post/postSchema")
const createError = require('http-errors');

const createComment = async (userId, postId, content, file) => {
    try {
        let comment;
        const post = await Post.findById(postId);
        if(!post){
            return createError.BadRequest("the post doesn't exist anymore")
        }

        let commentId = new mongoose.Types.ObjectId()
        if(file){
            let imageUrl = await uploadImage(file);
            if(imageUrl){
                comment = new Comment({
                    _id : commentId,
                    creator : userId,
                    post : postId,
                    image : imageUrl,
                    content,
                })
            }
        }else{
            comment = new Comment({
                _id : commentId,
                creator : userId,
                post : postId,
                content,
            })
        }
        const response = await comment.save();

        await Post.findByIdAndUpdate(
            postId,
            {
                $addToSet : { comment: commentId } ,
                $inc : { c_c : 1 }
            },
        )

        return response;

    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getComments = async (postId) => {
    try {
        const post = await Post.findById(postId);
        if(!post){
            return createError.BadRequest("the post doesn't exist anymore")
        }else{
            let comments = 
                await Comment.find({ post : postId })
                    .populate({ 
                        path : "creator",
                        select : { _id : 1, name: 1, username : 1, imageUrl : 1 }
                    })
                    .sort({ createdAt : -1 })
                    .skip(10 * (1 - 1))
                    .limit(10); 
            
            return comments;
        }

    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createComment,
    getComments
}