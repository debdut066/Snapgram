const { default : mongoose } = require("mongoose")
const Trending = require("../../schema/trending/trendingSchema")

async function createOrUpdateTrending(hastag){
    try {
        const isExist = await Trending.find({ hastag: hastag });
        console.log("isExist", isExist)
        if(isExist.length === 0){
            console.log("hastag", hastag)
            let trending = Trending({
                _id : new mongoose.Types.ObjectId(),
                hastag: hastag,
                count : 1
            })
            await trending.save();
        }else{
            console.log("Reaching")
            await Trending.findOneAndUpdate(
                { hastag: hastag },
                { $inc : { count : 1 }}
            );
        }
        return "inserted";
    } catch (error) {
        console.log("error", error)
        throw error.message;
    }
}

module.exports = { 
    createOrUpdateTrending
}