const createError = require("http-errors")
const userModel = require("../../models/user/userModel")

const userProfile = async (req, res, next) => {
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

module.exports = {
    userProfile
}