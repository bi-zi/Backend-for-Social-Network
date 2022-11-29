import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
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

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
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
        type: Schema.Types.ObjectId,
        ref: '_id',
        required: false,
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
        type: Schema.Types.ObjectId,
        ref: '_id',
        required: false,
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


    wasOnline: {
      type: String,
      required: true,
    },

    online: {
      type: Boolean,
      required: true,
      default: false,
    },

    isActivated: {
      type: Boolean,
      default: false,
    },

    activationLink: {
      type: String,
    },


  },

  {
    timestamps: true,
  },
);

export default model('User1', UserSchema);
