const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    name : { type : String, trim : true, required : true },
    email : { type : String, trim : true, required : true },
    username : { type : String, trim : true, required : true },
    bio : { type : String, default : "" },
    imageUrl : { type : String, default : "" },
    posts : [{ type : mongoose.Types.ObjectId , ref : 'Post'}],
    liked : [{ type : mongoose.Types.ObjectId , ref : 'User'}]
},
{ timestamps : true}
);

module.exports = mongoose.model("User", userSchema);