import AboutModel from '../models/About.js';



export const getAbout = async (req, res) => {
  try {
    const about = await AboutModel.find().populate('_id').exec();
    res.json(about);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить информацию',
    });
  }
};

export const createAbout = async (req, res) => {
  try {
    const doc = new AboutModel({
      livesIn: req.body.livesIn,
      from: req.body.from,
      bornOn: req.body.bornOn,
      profession: req.body.profession,
      relations: req.body.relations,
      studentAt: req.body.studentAt,
      user: req.userId,
    });

    const about = await doc.save();

    res.json(about);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать информацию',
    });
  }
};

export const updateAbout = async (req, res) => {
  try {

    await AboutModel.updateOne(
      {
        livesIn: req.body.livesIn,
        from: req.body.from,
        bornOn: req.body.bornOn,
        profession: req.body.profession,
        relations: req.body.relations,
        studentAt: req.body.studentAt,
        user: req.userId,
      },
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить информацию',
    });
  }
};
