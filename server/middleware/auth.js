const jwt = require('jsonwebtoken');
const createError = require("http-errors");

module.exports = async (req, res, next) => {
    try{
        const token = (req.headers.authorization).split("Bearer ")[1];
        if(!token) {
            throw createError.Unauthorized("Token is not present");
        }else{
            const isVerify = await jwt.verify(token, process.env.SECRET_KEY);
            try {
                req.user = isVerify;
                next();
            } catch (error) {
                throw createError.Unauthorized("Token is not valid");
            }
        }
    }catch(error){
        next(error);
    };
};