import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
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
