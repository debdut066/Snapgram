const redis = require('ioredis');
const { createNotification } = require("../models/notification/notificationModel")
const redisPubClient = new redis(process.env.REDIS_URI);
const redisSubClient = new redis(process.env.REDIS_URI);

function subscriber(){
    try {
        redisSubClient.subscribe('NOTIFICATION', (err, count)=>{
            if (err) {
                console.error("Failed to subscribe: %s", err.message);
              } else {
                // `count` represents the number of channels this client are currently subscribed to.
                console.log(
                  `Subscribed successfully! This client is currently subscribed to ${count} channels.`
                );
              }
        })
        redisSubClient.on("message",async (channel, message) => {
            if(channel === "NOTIFICATION"){
                await createNotification(JSON.parse(message).data)
            }
        });
    } catch (error) {
        console.log(error)
    }
}

async function publisher(channelName, data){
    try {
        await redisPubClient.publish(channelName, JSON.stringify({ data }));
    } catch (error) {
        console.log(error);
    }
}

module.exports = { 
    publisher,
    subscriber
};