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
        throw createError.BadRequest({
            msg : "username or email has already been taken"
        })
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
    try{
        const isUser = await doesUserExist({
            email : data.username || "",
            username : data.username || ""
        });
        if(isUser.length === 0){
            throw createError.BadRequest({
                msg : "user not found with this login credentials"
            });
        }else{
            const isPasswordCorrect = await comparePassword(data.password,isUser[0])
            if(!isPasswordCorrect){
                console.log("isPasswordCorrect", isPasswordCorrect)
                throw createError.BadRequest({ msg: "Password is not correct" });
            }else{
                const token = await generateToken(isUser[0]);
                
                return {
                    msg : "Login is successfull",
                    user : isUser[0],
                    token : token,
                }
            }
        }
    }catch(error){
        console.log(error)
        throw createError.InternalServerError({
            msg : "Something went wrong"
        })
    }
}


module.exports = {
    registerUser,
    loginUser
}