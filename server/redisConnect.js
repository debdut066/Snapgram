const { createClient } = require('redis');

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: 'redis-11414.c301.ap-south-1-1.ec2.cloud.redislabs.com',
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