const postModel = require('../../models/post/postModel')

async function createPost(req, res, next){
    try {
        let { caption, location, tags }  = req.body;
        let user = req.user;
        if(!caption && location && tags){
            throw createError.Conflict("missing fields!!");
        }else{
            let reqData = {
                caption,
                file : req.files.file,
                location,
                tags,
                user
            }
            const response = await postModel.createPost(reqData);
            return res.status(200).json(response);
        }

    } catch (error) {
        next(error);
    }
}

async function getRecentPost(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 20;
        const response = await postModel.getPost(page, limit);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}

module.exports = {
    createPost,
    getRecentPost
}