
const { default: mongoose } = require("mongoose");
const { uploadImage } = require("../../helpers/helpers")
const Comment = require("../../schema/comment/commentSchema");
const Post = require("../../schema/post/postSchema")
const createError = require('http-errors');
const { COMMENT_PER_PAGE }  = require("../../constants")

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
                    postId : postId,
                    image : imageUrl,
                    content,
                })
            }
        }else{
            comment = new Comment({
                _id : commentId,
                creator : userId,
                postId : postId,
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

const getComments = async (postId, page) => {
    try {
        const post = await Post.findById(postId);
        if(!post){
            return createError.BadRequest("the post doesn't exist anymore")
        }else{
            let comments = 
                await Comment.find({ postId })
                    .populate({ 
                        path : "creator",
                        select : { _id : 1, name: 1, username : 1, imageUrl : 1 }
                    })
                    .sort({ createdAt : -1 })
                    .skip(COMMENT_PER_PAGE* (page - 1))
                    .limit(COMMENT_PER_PAGE); 
            
            return comments;
        }

    } catch (error) {
        console.log(error)
        throw error;
    }
}

const likeComment = async (commentId, userId) => {
    try {
        const comment = await Comment.findById(commentId);
        const isLikedComment = comment.likes.includes(userId);
        const option = isLikedComment ? "$pull" : "$addToSet";

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { [option] : { likes : userId},
              $inc :  { l_c : isLikedComment ? -1 : 1}     
            },
            { new : true},
        );

        return updatedComment
        
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const deleteComment = async (postId, commentId) => {
    try {
        const post = await Post.findById(postId);
        const isCommentExist = post.comment.includes(commentId);
        
        await Comment.findByIdAndDelete(commentId);
        if(isCommentExist){
            try {
                await Post.findByIdAndUpdate(
                    postId,
                    {   $pull : { comment : commentId },
                        $inc :  { c_c : -1 } 
                    },
                )
            } catch (error) {
                console.log(error)
            }
        }
        return "comment deleted"
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    createComment,
    getComments,
    likeComment,
    deleteComment
}