import UserSchema from '../models/User.js';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
  try {

    const users = await UserSchema.find().populate('_id').exec();
    res.json(users);

  } catch (err) {

    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }

};

export const getOneUser = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId
    const id = req.params.id
    const user = await UserSchema.find({ "_id": ObjectId(id) })

    res.json(user);

  } catch (err) {

    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }

};

export const updateUser = async (req, res) => {
  try {
    const aboutId = req.userId;
    const id = req.params.id
    let ObjectId = mongoose.Types.ObjectId
    UserSchema.updateOne({ "_id": aboutId }, { $set: { imageUrl: req.body.imageUrl } }, (err, doc) => {
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
      message: 'Не удалось обновить fdf',
    });
  }
};

export const subscribeUser = async (req, res) => {
  try {
    const aboutId = req.userId;
    UserSchema.updateOne({ "_id": req.body.id }, { $push: { subscribers: req.body.authUserId }, }, (err, doc) => {
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
      message: 'Не удалось обновить fdf',
    });
  }
};

export const unsubscribeUser = async (req, res) => {
  try {
    const aboutId = req.userId;
    const index = req.body.index
    const subInd = `subscribers.${index}`
    const id = req.body.id

    await UserSchema.findOneAndUpdate({ "_id": id }, { $unset: { [subInd]: 1 } }),
      UserSchema.findOneAndUpdate({ "_id": id }, { $pull: { "subscribers": null } },

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
      message: 'Не удалось обновить fdf',
    });
  }
};


export const acceptFriend = async (req, res) => {
  try {
    const aboutId = req.userId;
    const index = req.body.index
    const subInd = `subscribers.${index}`
    const id = req.body.id

    await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $unset: { [subInd]: 1 } }),
      await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $pull: { "subscribers": null } }),
      await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $push: { "friends": id } }),
      UserSchema.findOneAndUpdate({ "_id": id }, { $push: { "friends": aboutId } },
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
      message: 'Не удалось обновить fdf',
    });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const aboutId = req.userId;
    const index = req.body.index
    const index2 = req.body.index2

    const subInd = `friends.${index}`
    const subInd2 = `friends.${index2}`
    const id = req.body.id

    await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $unset: { [subInd2]: 1 } })
    await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $pull: { "friends": null } })
    await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $push: { "subscribers": id } }),
    UserSchema.findOneAndUpdate({ "_id": id }, { $pull: { "friends": null } },
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
      message: 'Не удалось обновить fdf',
    });
  }
};
