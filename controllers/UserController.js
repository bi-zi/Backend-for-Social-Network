import UserModel from '../models/User.js';
import UserSchema from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
    const aboutId = req.userId;
    const user = await UserSchema.find().populate(aboutId).exec();
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
    await UserSchema.updateOne({
      user: aboutId,
    },
      { $set: { imageUrl: req.body.imageUrl } },
    );
    res.json({
      "success": true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить fdf',
    });
  }
};
