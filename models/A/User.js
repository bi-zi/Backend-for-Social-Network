import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {

    login: {
      type: String,
      required: true,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    friends: {
      type: Array,
      required: true,

      user: {
        type: String,
        required: false,
      },

      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id',
        required: true,
      },
    },

    subscribers: {
      type: Array,
      required: true,

      user: {
        type: String,
        required: false,
      },

      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id',
        required: true,
      },
    },

    avatar: {
      image: {
        type: String,
        required: true,
      },

      sizeUpTo: {
        type: String,
        required: true,
      },

      sizeAfter: {
        type: String,
        required: true,
      }
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

    wasOnline: {
      type: String,
      required: true,
    },

  },

  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
