import mongoose from 'mongoose';

const MessagesSchema = new mongoose.Schema(
  {

    yourIndex: {
      type: String,
      required: false,
    },

    hisIndex: {
      type: String,
      required: false,
    },

    correspondence: {
      type: Array,
      messages: {
        type: Array,
        message: {
          type: Array,
          required: true,
          default: ''
        },
        messageDate: {
          type: String,
          required: true,
          default: ''
        },
        messageId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        userId: {
          type: String,
          required: true,
        }
      },

      withWho: {
        type: String,
        required: true,
      }
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);



export default mongoose.model('Messages', MessagesSchema);
