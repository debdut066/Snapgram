const { default: mongoose } = require("mongoose");
const Notification = require("../../schema/notification/notificationSchema")

const createNotification = async (data) => {
    try{
        const newNotification = Notification({
            _id : new mongoose.Types.ObjectId(),
            ...data
        }) 

        const result = await newNotification.save();
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    createNotification
}
