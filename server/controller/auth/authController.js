const createError = require('http-errors');
const { registerUser, loginUser } = require("../../models/user/userModel")

const register = async (req, res, next) => {
    try{
        if(!req.body.name || !req.body.username || !req.body.email || !req.body.password){
            throw createError.Conflict('missing details')
        }else{
            const response = await registerUser(req.body);
            return res.status(200).json(response);
        }
    }catch(error){
        next(error);
    }
}

const login = async (req, res, next) =>  {
    try{
        if(!req.body.username || !req.body.password){
            throw createError("Name or password is missing")
        }else{
            const response = await loginUser(req.body);
            return res.status(200).json(response);
        }
    }catch(error){
        next(error);
    }
}

module.exports = { 
    register,
    login
}