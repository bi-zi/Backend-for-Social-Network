import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {

    login: {
      type: String,
      required: false,
      unique: true,
    },

    firstName: {
      type: String,
      required: false,
    },

    lastName: {
      type: String,
      required: false,
    },

    gender: {
      type: String,
      required: false,
    },

    birdayDate: {
      type: String,
      required: false,
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
      required: false,

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
      required: false,

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
        required: false,
      },

      sizeUpTo: {
        type: String,
        required: false,
      },

      sizeAfter: {
        type: String,
        required: false,
      }
    },


    wasOnline: {
      type: String,
      required: false,
    },

    online: {
      type: Boolean,
      required: false,
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
