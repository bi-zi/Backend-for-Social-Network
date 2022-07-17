import SliderModel from '../models/Slider.js';

export const getSlider = async (req, res) => {
  try {
    const slider = await SliderModel.find().populate('_id').exec();

    res.json(slider);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить информацию',
    });
  }
};

export const createSlider = async (req, res) => {
  try {

    const doc = new SliderModel({
      sliderImg: req.body.sliderImg,
      user: req.userId,
    });

    const slider = await doc.save();

    res.json(slider);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать информацию',
    });
  }
};

export const pushSlider = async (req, res) => {
  try {
    const aboutId = req.userId;

    await SliderModel.updateOne({
      user: aboutId,
    },
      { $push: { sliderImg: req.body.sliderImg } },
    );
    res.json({
      "success": true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать информацию',
    });
  }
};
