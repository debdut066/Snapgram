const { createClient } = require('redis');

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 11414
    }
});

async function redisConnect(){
    await redisClient.connect()
}

module.exports = {
    redisClient,
    redisConnect
}