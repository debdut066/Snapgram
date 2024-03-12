const createError = require("http-errors")
const commentModel = require("../../models/comment/commentModel")

const createComment = async (req, res, next) => {
    try {
        const { content, image, postId } = req.body;

        if(!postId && !content){
            throw createError.Conflict("content or postId missing!!");
        }else{
            const response = await commentModel.createComment(req.user._id, postId, content, image);
            return res.status(200).json(response);
        }
    } catch (error){
        next(error)
    }
}

const getComments = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const page = req.quer.page || 1;
        if(!postId){
            throw createError.Conflict("postId missing!!");
        }else{
            const response = await commentModel.getComments(postId, page);
            return res.status(200).json(response);
        }

    } catch (error) {
        next(error)
    }
}

const likeComment = async (req, res, next) => {
    try {
        let commentId = req.params.id;
        let userId = req.user._id;

        if(!commentId){
            throw createError.Conflict("commentId missing!!");
        }else{
            const response = await commentModel.likeComment(commentId, userId);
            return res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
}

const deleteComment = async (req, res, next) => {
    try {
        let commentId = req.params.commentId;
        let postId = req.body.postId;

        if(!commentId && !postId){
            throw createError.Conflict("commentId missing!!");
        }else{
            const response = await commentModel.deleteComment(postId, commentId);
            return res.status(200).json(response)
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createComment,
    getComments,
    likeComment,
    deleteComment
}

