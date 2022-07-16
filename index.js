import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';

import mongoose from 'mongoose';

import { registerValidation, loginValidation, postCreateValidation, aboutValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { AuthController, UserController, PostController, AboutController } from './controllers/index.js';


const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());


app.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
app.get('/auth/me', checkAuth, AuthController.getMe);

app.get('/user/all', UserController.getAllUsers)
app.patch('/user/:id', checkAuth, registerValidation, handleValidationErrors, UserController.updateUser);

app.get('/about/all', AboutController.getAbout);
app.post('/about', checkAuth, aboutValidation, handleValidationErrors, AboutController.createAbout);
app.patch('/about/:id', checkAuth, aboutValidation, handleValidationErrors, AboutController.updateAbout);



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
