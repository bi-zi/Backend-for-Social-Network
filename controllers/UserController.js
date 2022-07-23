import UserModel from '../models/User.js';
import UserSchema from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
    const id = req.params.id
    const aboutId = req.userId;
    let ObjectId = mongoose.Types.ObjectId
    const user = await UserSchema.find({ aboutId, "_id": ObjectId(id) })
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
    const id = req.params.id
    let ObjectId = mongoose.Types.ObjectId

    UserSchema.updateOne({ "_id": ObjectId(id) }, { $push: { subscribers: req.body.userId }, }, (err, doc) => {
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
