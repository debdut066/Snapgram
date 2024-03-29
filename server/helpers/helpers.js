const User = require("../schema/user/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const createError = require("http-errors")

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

async function doesUserExist (data) {
    try {
        let { email, username } = data;

        const isUser = await User.find({
            $or : [{ email : email }, { username : username }]
        }).select('-liked -bio -fl -fr -liked -p_c, -saved');

        return isUser;

    } catch (error) {
        throw createError.BadRequest(error.message);
    }
}

async function hashPassword (password){
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        console.log(error)
        throw createError.BadRequest({ msg : "Something went wrong "});
    }
}

async function comparePassword (password, user){
    try {
        const result = await bcrypt.compare(password, user.password);
        return result;
    } catch (error) {
        throw createError.BadRequest({ msg : "Something went wrong "})
    }
}

async function generateToken (data){
    try {
        const token = jwt.sign({
            _id : data._id,
            name : data.name,
            username : data.username,
        },
        process.env.SECRET_KEY,
        { expiresIn : "30d"}
        );
        
        return token;
    } catch (error) {
        console.log("error",error)
    }
}

async function uploadImage(file){
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        return result.url;
    } catch (error) {
        console.log("error",error)
        return false;
    }
}

module.exports = {
    doesUserExist,
    hashPassword,
    comparePassword,
    generateToken,
    uploadImage
}