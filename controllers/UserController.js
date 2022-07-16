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


export const updateUser = async (req, res) => {
  try {


   const user= await UserSchema.findOne({ email: req.body.email }).updateOne({ $push: { avatarUrl: req.body.avatarUrl, } });






    res.json({
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить fdf',
    });
  }
};
