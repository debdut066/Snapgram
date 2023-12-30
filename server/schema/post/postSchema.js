const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    creator : { type : mongoose.Types.ObjectId, ref: "User" },
    likes : [{ type : mongoose.Types.ObjectId, ref: "User" }],
    caption : { type : String, maxlength: 2200 },
    tags : [{ type : String, default : "" }],
    imageUrl : { type : String, default : "" },
    location : { type : String, default : "" }
},
{ timestamps : true }
);

module.exports =  mongoose.model("Post", postSchema);