import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    post: {
      type: Array,

      text: {
        type: String,
        required: true,
        default: '',
      },
      videoPost: {
        type: String,
        required: true,
        default: '',
      },
      imagesPost: {
        type: Array,
        required: true,
        default: [],
      },
      commentPost: {
        type: Array,
        required: true,
        default: [],
      },
      likePost: {
        type: Number,
        required: true,
        default: '0',
      },
      dislikePost: {
        type: Number,
        required: true,
        default: '0',
      },
      date: {
        type: String,
        required: true
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: '_id',
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

export default mongoose.model('Post', PostSchema);
