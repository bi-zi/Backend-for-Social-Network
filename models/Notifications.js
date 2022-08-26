import mongoose from 'mongoose';

const NotificationsSchema = new mongoose.Schema(
  {
    deleteNotifications: {
      type: String,
      required: false
    },

    id: {
      type: String,
      required: false
    },

    index: {
      type: Number,
      required: false
    },

    friendRequest: {
      type: Array,
      fromWho: {
        type: String,
        required: true,
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);



export default mongoose.model('Notifications', NotificationsSchema);

