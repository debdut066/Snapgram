const Trending = require("../../schema/trending/trendingSchema")

async function createOrUpdateTrending(hastag){
    try {
        console.log("has", hastag)
        await Trending.findOneAndUpdate(
            { hastag },
            { $inc : { count : 1 }},
            { upset : true }
        );
        return "inserted";
    } catch (error) {
        console.log("error", error.message)
        throw error;
    }
}

module.exports = { 
    createOrUpdateTrending
}