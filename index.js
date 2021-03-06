import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, aboutValidation, sliderValidation } from './validations.js';
import { handleValidationErrors, checkAuth } from './utils/index.js';

import { AuthController, UserController, AboutController, SliderController, PostController } from './controllers/index.js';




const app = express();


app.use(express.json({limit: '1mb'}), cors());


app.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
app.get('/auth/me', checkAuth, AuthController.getMe);



app.get('/user/all', UserController.getAllUsers)
app.get('/user/one/:id', UserController.getOneUser)
app.patch('/user/:id', checkAuth, handleValidationErrors, UserController.updateUser);
app.patch("/user/subscribe/:id", handleValidationErrors, UserController.subscribeUser)
app.patch("/user/unsubscribe/:id", handleValidationErrors, UserController.unsubscribeUser)
app.patch("/user/friend/:id", checkAuth, handleValidationErrors, UserController.acceptFriend)
app.patch("/user/deleteFriend/:id", checkAuth, handleValidationErrors, UserController.deleteFriend)



app.get('/about/all', AboutController.getAbout);
app.post('/about', checkAuth, aboutValidation, handleValidationErrors, AboutController.createAbout);
app.patch('/about/:id', checkAuth, aboutValidation, handleValidationErrors, AboutController.updateAbout);



app.get('/slider/all', SliderController.getSlider);
app.post('/slider',checkAuth, sliderValidation, handleValidationErrors, SliderController.createSlider);
app.patch('/slider/push/:id',checkAuth, sliderValidation, handleValidationErrors, SliderController.pushSlider);
app.patch('/slider/delete/:id', checkAuth, handleValidationErrors, SliderController.deleteImgInSlider);



app.get('/post/userPostsAll/:id', handleValidationErrors, PostController.userPostsAll);
app.post('/post/createPost', checkAuth, handleValidationErrors, PostController.createPost);
app.patch('/post/PostPush/:id', checkAuth, handleValidationErrors, PostController.pushPost);
app.patch('/post/like/:id', handleValidationErrors, PostController.likePost);
app.patch('/post/dislike/:id', handleValidationErrors, PostController.dislikePost);
app.patch('/post/commentPush/:id', handleValidationErrors, PostController.pushComment);
app.patch('/post/deleteComment/:id', handleValidationErrors, PostController.deleteComment);
app.patch('/post/deletePost/:id', checkAuth, handleValidationErrors, PostController.deleteUserPost);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});


// app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
// app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
// app.delete('/posts/:id', checkAuth, PostController.remove);
// app.patch(
//   '/posts/:id',
//   checkAuth,
//   postCreateValidation,
//   handleValidationErrors,
//   PostController.update,
// );

// app.use('/uploads', express.static('uploads'));
// app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
//   res.json({
//     url: `/uploads/${req.file.originalname}`,
//   });
// });
