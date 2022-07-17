import mongoose from 'mongoose';

const SliderSchema = new mongoose.Schema(
{
    sliderImg: {
      type: Array,
      required: false
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



export default mongoose.model('Slider', SliderSchema);
