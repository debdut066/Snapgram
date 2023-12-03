const { default: mongoose } = require("mongoose");
const { doesUserExist , hashPassword, comparePassword, generateToken } = require("../../helpers/helpers")
const User = require("../../schema/user/userSchema");
const createError = require("http-errors");

const registerUser = async (data) => {
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

            await newUser.save();
            return "registration completed!!"
        }catch(error){
            console.log(error)
            throw createError.InternalServerError({
                msg : "Something wen wrong"
            })
        }
    }
}

const loginUser = async (data) => {
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
            
            return {
                msg : "Login is successfull",
                user : isUser[0],
                token : token,
            }
        }
    }
}

const userProfile = async (userId) => {
    try {
        const result = await User.findById(userId).select('-password');
        return result;
    } catch (error) {
        throw createError.BadRequest(error.message);
    }
}

module.exports = {
    registerUser,
    loginUser,
    userProfile
}