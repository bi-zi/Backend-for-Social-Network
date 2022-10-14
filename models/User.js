import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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

      id: {
        type: String,
        required: false,
        default: ''
      },


      index: {
        type: Number,
        required: false,
        default: ''
      },
      index2: {
        type: Number,
        required: false,
        default: ''
      },

    },

    subscribers: {
      type: Array,
      required: true,

      id: {
        type: String,
        required: true,
        default: ''
      },

      authUserId: {
        type: String,
        required: true,
        default: ''
      },

    },

    imageUrl: {
      type: Array,
      required: false
    },

    pagination: {
      type: Number,
      required: false,
    }

  },


  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
