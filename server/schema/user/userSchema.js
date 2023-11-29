const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    name : { type : String, trim : true, required : true, maxlength: 2200 },
    email : { type : String, trim : true, required : true },
    password : { type : String, trim : true, required : true },
    username : { type : String, trim : true, required : true, maxlength: 2200 },
    bio : { type : String, default : "", maxlength: 2200 },
    imageUrl : { type : String, default : "" },
    posts : [{ type : mongoose.Types.ObjectId , ref : 'Post'}],
    liked : [{ type : mongoose.Types.ObjectId , ref : 'User'}]
},
{ timestamps : true}
);

module.exports = mongoose.model("User", userSchema);