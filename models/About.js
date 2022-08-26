import mongoose from 'mongoose'

const AboutSchema = new mongoose.Schema(
  {
    livesIn: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    bornOn: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    relations: {
      type: String,
      required: true,
    },
    studentAt: {
      type: String,
      required: true,
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
)
export default mongoose.model('About', AboutSchema);



