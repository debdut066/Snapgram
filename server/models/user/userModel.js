const { default: mongoose } = require("mongoose");
const createError = require("http-errors");

const User = require("../../schema/user/userSchema");
const { uploadImage } = require("../../helpers/helpers");
const { redisClient } = require("../../redisConnect");
const { doesUserExist , hashPassword, comparePassword, generateToken } = require("../../helpers/helpers")

async function registerUser(data){
    const isUser = await doesUserExist({
        email : data.email || "",
        username : data.username || ""
    })
    if(isUser.length !== 0){
        throw createError.BadRequest("username or email has already been taken")
    }else{
        try{
            const hash = await hashPassword(data.password);
            const newUser = User({
                _id : new mongoose.Types.ObjectId(),
                name : data.name,
                email : data.email,
                username : data.username,
                password : hash
            })            
            const response = await newUser.save();
            let responseObj = {
                _id : response._id,
                name : response.name,
                username : response.username,
                bio : response.bio,
                imageUrl : response.imageUrl,
                fl_c : 0,
                fr_c : 0,
                createdAt : response.createdAt
            }
            await redisClient.hset(`${data.username}`, responseObj)
            return "registration completed!!"
        }catch(error){
            console.log(error)
            throw createError.InternalServerError({
                msg : "Something wen wrong"
            })
        }
    }
}

async function loginUser (data){
    const isUser = await doesUserExist({
        email : data.username || "",
        username : data.username || ""
    });
    if(isUser.length === 0){
        throw createError.BadRequest("user not found with this login credentials");
    }else{
        const isPasswordCorrect = await comparePassword(data.password,isUser[0])
        if(!isPasswordCorrect){
            throw createError.BadRequest("Password is not correct");
        }else{
            const token = await generateToken(isUser[0]);
            delete isUser.password;
            return {
                msg : "Login is successfull",
                user : isUser[0],
                token : token,
            }
        }
    }
}

async function userProfile(userId){
    try {
        const result = 
            await User
                .findOne({ username : userId })
                .select('-password -liked')
                .populate({
                    path : 'posts',
                    populate : {
                        path : 'creator',
                        select : { _id : 1, name : 1, username : 1, imageUrl : 1 }
                    },
                    options : { limit : 10 }
                })
        return result;
    } catch (error) {
        throw createError.BadRequest(error.message);
    }
}

async function updateProfile(reqData){
    try {
        let { email, file, username, name, userId, bio } = reqData;

        let response;

        if(file){
            const result = await uploadImage(file);
            response = await User.findByIdAndUpdate(userId, 
                { 
                    $set : { 
                        name ,
                        username,
                        email,
                        bio,
                        imageUrl : result
                    } 
                },
                { projection: { name: 1, email : 1, bio : 1 }, new: true }
            )
        }else{
            response = await User.findByIdAndUpdate(userId, 
                { 
                    $set : { 
                        name ,
                        username,
                        email,
                        bio,
                    } 
                },
                { projection: { name: 1, email : 1, bio : 1 }, new: true }
            )
        }
        return "profile updated";
    } catch (error) {
        throw createError.BadRequest(error.message);
    }
}

async function getSavedPost(userId){
    try{
        const posts = 
           await User.findById(userId)
                .select('saved')
                .populate({
                    path :'saved',
                    select : { _id : 1, likes : 1, saved : 1, imageUrl : 1, creator : 1}
                })
        return posts;
    }catch(error){
        throw error;
    }
}

async function getUser(page, limit){
    try {
        const users = 
            await User.find()
                .select({ _id : 1, name : 1, username : 1, imageUrl : 1 })
                .sort({ fl_c : 1 })
                .skip(limit * (page - 1))
                .limit(limit); 
        
        return users;

    } catch (error) {
        throw error;
    }
}

async function searchUser(searchTerm){
    try {
        let regex = new RegExp(searchTerm, "i")
        const userSearch = await User.find({
            username : { $regex : regex }
        }).select({ _id : 1, name : 1, username : 1, imageUrl : 1 })
    
        return userSearch;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
    userProfile,
    updateProfile,
    getSavedPost,
    getUser,
    searchUser
}