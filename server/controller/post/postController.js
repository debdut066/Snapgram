const createError = require('http-errors');
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
        const response = await postModel.getPost(page);
        // return res.status(200).json({ 
        //     data : response
        // });
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        next(error);
    }
}

async function getPost(req, res, next){
    try {
        const postId = req.params.id;
        if(!postId){
            throw createError.Conflict("post doesn't exist anymore")
        }else{
            const response = await postModel.singlePost(postId);
            return res.status(200).json(response);
        }
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function likePost(req, res, next){
    try {
        if(!req.params.id){
            throw createError.BadRequest("Post doesn't exist anymore");
        }else{
            const response = await postModel.likePost(req.params.id, req.user._id);
            res.status(200).json(response)
        }
    } catch (error) {
        next(error);
    }
}

async function deletePost(req, res, next){
    try {
        const postId = req.params.id;
        if(!postId){
            throw createError.Conflict("post doesn't exist anymore")
        }else{
            const response = await postModel.deletePost(postId);
            return res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function editPost(req, res, next){
    try {
        const postId = req.params.id;
        if(!postId){
            throw createError.Conflict("post doesn't exist anymore")
        }else{
            const response = await postModel.editPost(postId, req.body);
            return res.status(200).json(response);
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function searchPost(req, res, next){
    try {
        let { searchTerm } = req.params;
        if(!searchTerm){
            throw createError.Conflict("please enter some thing")
        }else{
            const response = await postModel.searchPost(searchTerm);
            return res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
}

async function savePost(req, res, next){
    try {
        let postId = req.params.id;
        if(!postId){
            throw createError.Conflict("postId not found")
        }else{
            const response = await postModel.savePost(postId, req.user._id);
            return res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPost,
    createPost,
    likePost,
    editPost,
    deletePost,
    getRecentPost,
    searchPost,
    savePost
}