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

async function getAllUsers(req, res, next){
    try {
        const Users = await userModel.getUser();
        return res.status(200).json(Users);
    } catch (error) {
        console.log(error)
        next(error);
    }
}

async function searchUsers(req, res, next){
    try {
        let { searchTerm } = req.query;
        if(searchTerm){
            throw createError.Conflict("please enter some thing")
        }else{
            const Users = await userModel.searchUser();
            return res.status(200).json(Users);
        }
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {
    userProfile,
    updateProfile,
    savedPosts,
    getAllUsers,
    searchUsers
}