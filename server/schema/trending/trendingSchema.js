const mongoose = require("mongoose")

const trendingSchema = mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    hastag: { type: String, unique: true, required: true },
    count: { type: Number, default: 0 }
},
{ timestamps : true }
);

module.exports =  mongoose.model("trending", trendingSchema);