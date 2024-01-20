const createError = require("http-errors")
const userModel = require("../../models/user/userModel")

async function userProfile(req, res, next){
    try{
        if(!req.params.id){
            throw createError.Conflict("userId missing!!");
        }else{
            const response = await userModel.userProfile(req.params.id);
            return res.status(200).json(response);
        }
    }catch(error){
        next(error);
    }
}

async function updateProfile(req, res, next){
    try {
        let { name, username, bio, email } = req.body;
        if(!req.params.id){
            throw createError.Conflict("userId missing!!");
        }else{
            let reqData = {
                file : req.files === null ? null : req.files.file,
                name,
                username,
                email,
                bio,
                user : req.user,
                userId : req.params.id
            }
            const response = await userModel.updateProfile(reqData);
            return res.status(200).json(response);
        }
    } catch (error) {
        next(error);
    }
}

async function savedPosts(req, res, next){
    try {
        const savedPosts = await userModel.getSavedPost(req.user._id);
        return res.status(200).json(savedPosts);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    userProfile,
    updateProfile,
    savedPosts
}