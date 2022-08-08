import NotificationsModel from '../models/Notifications.js';
import mongoose from 'mongoose';

export const getNotifications = async (req, res) => {
  try {

    const posts = await NotificationsModel.findOne({ "user": req.params.id });
    res.json(posts);

  } catch (err) {

    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const createNotifications = async (req, res) => {
  try {
    const doc = new NotificationsModel({

      friendRequest: {
        fromWho: req.body.fromWho,
      },

      user: req.body.user,

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

export const pushNotifications = async (req, res) => {
  try {
    const ObjectId = mongoose.Types.ObjectId

    await NotificationsModel.updateOne({ "user": req.body.id }, {
      $push: {
        "friendRequest": {
          fromWho: req.body.fromWho,
        },
      },
    },

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


export const deleteNotifications = async (req, res) => {
  try {
    let id = req.body.deleteNotifications

    await NotificationsModel.updateOne({ user: id }, {
      $set: { "friendRequest": [] }
    })

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

export const deleteRequest = async (req, res) => {
  try {
    const del = `friendRequest.${req.body.index}`

    await NotificationsModel.updateMany({ user: req.body.id }, { $unset: { [del]: 1 } }),
      NotificationsModel.updateMany({ user: req.body.id }, { $pull: { "friendRequest": null } },
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
      message: 'Не удалось создать информацию',
    });
  }
};
