import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      required: true,

      userId: {
        type: String,
        required: false,
        default: ''
      },

    },
    subscribers: {
      type: Array,
      required: true,

      userId: {
        type: String,
        required: true,
        default: ''
      },

    },
    imageUrl: {
      type: Array,
      required: false
    }
  },
  {
    timestamps: true,
  },
);



export default mongoose.model('User', UserSchema);
