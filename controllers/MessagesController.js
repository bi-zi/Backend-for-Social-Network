import MessagesModel from '../models/Messages.js';

export const getMessages = async (req, res) => {
  try {
    const posts = await MessagesModel.findOne({ user: req.params.id })
    res.json([posts]);
  } catch (err) {

    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};


export const createMessages = async (req, res) => {
  try {

    const doc = new MessagesModel({
      correspondence: [],

      user: req.body.user

    });

    const post = await doc.save();



    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};


export const pushChat = async (req, res) => {
  try {
    let d = new Date();
    await MessagesModel.findOneAndUpdate({ "user": req.body.user }, {
      $push: { "correspondence": { messages: [{ withWho: req.body.withWho, date: d }], withWho: req.body.withWho } }
    }),
      MessagesModel.findOneAndUpdate({ "user": req.body.withWho }, {
        $push: { "correspondence": { messages: [{ withWho: req.body.user, date: d }], withWho: req.body.user } }
      },
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: 'Не удалось вернуть статью',
            });
          }

          if (!doc) {
            return res.status(404).json({
              message: 'Статья не найдена',
            });
          }

          res.json(doc);
        });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};

export const addMessage = async (req, res) => {
  try {
    let d = new Date();
    const yourIndex = `correspondence.${req.body.yourIndex}.messages`
    const hisIndex = `correspondence.${req.body.hisIndex}.messages`

    await MessagesModel.findOneAndUpdate({ "user": req.body.user },
      {
        $push: {
          [yourIndex]:
            { message: req.body.message, date: d, userId: req.body.userId, withWho: req.body.withWho }
        }
      })
    MessagesModel.findOneAndUpdate({ "user": req.body.withWho },
      {
        $push: {
          [hisIndex]:
            { message: req.body.message, date: d, userId: req.body.userId, withWho: req.body.user }
        }
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось вернуть статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json(doc);
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать статью',
    });
  }
};
