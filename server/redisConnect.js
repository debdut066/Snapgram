const redis = require('ioredis');

const redisClient = new redis(process.env.REDIS_URI);


async function redisConnect(){
    redisClient.on("connect", ()=>{
        console.log("redis connected")
    })

    redisClient.on("error", (error)=>{
        console.log("redis error", error)
    })
}

module.exports = {
    redisClient,
    redisConnect
}