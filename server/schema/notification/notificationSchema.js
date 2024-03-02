const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    _id : { type : mongoose.Schema.Types.ObjectId },
    type: { type: String, required: true },
    actionBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    target: {
      type: { type: String, required: true, enum: ['profile', 'post'] },
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    read: { type: Boolean, default: false },
  },
  { timestamps : true }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
