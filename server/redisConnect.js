const redis = require('ioredis');

const redisClient = new redis({
    port : 11414,
    host : process.env.REDIS_HOST,
    password : process.env.REDIS_PASSWORD,
    // db : "debdut-free-db" 
});

async function redisConnect(){
    redisClient.on("connect", ()=>{
        console.log("redis connected")
    })

    redisClient.on("error", ()=>{
        console.log("redis error")
    })
}

module.exports = {
    redisClient,
    redisConnect
}