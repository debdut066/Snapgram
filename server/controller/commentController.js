const createError = require("http-errors")
const commentModel = require("../models/commentModel")

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
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createComment,
    getComments
}

