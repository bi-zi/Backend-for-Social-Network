import { text } from 'express';
import PostModel from '../models/Post.js';
import mongoose from 'mongoose';

export const userPostsAll = async (req, res) => {
  try {
    const aboutId = req.userId;
    const posts = await PostModel.find().populate(aboutId).exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const createPost = async (req, res) => {
  try {

    const doc = new PostModel({
      post: [
        {
          text: req.body.text,
          imagesPost: req.body.imagesPost,
          videoPost: req.body.videoPost,
          commentPost: req.body.commentPost,
          likePost: req.body.likePost,
          dislikePost: req.body.dislikePost,
          viewsCount: req.body.viewsCount,
          id: mongoose.Types.ObjectId()
        }
      ],
      user: req.userId,
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


export const pushPost = async (req, res) => {
  try {
    const aboutId = req.userId;

    await PostModel.updateOne({
      user: aboutId,
    },
      {
        $push: {
          post: {

            text: req.body.text,
            imagesPost: req.body.imagesPost,
            videoPost: req.body.videoPost,
            commentPost: req.body.commentPost,
            likePost: req.body.likePost,
            dislikePost: req.body.dislikePost,
            viewsCount: req.body.viewsCount,
            id: mongoose.Types.ObjectId()

          }
        }
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


export const likePost = async (req, res) => {
  try {
    const aboutId = req.userId;
    const user = await PostModel.findOneAndUpdate(
      {
        aboutId,
      }, {
      post: { ...PostModel }
    }
    )


    // await PostModel.updateOne({
    //   user: aboutId,
    // },
    //   {
    //       post: {
    //         text: req.body.text,
    //         imagesPost: req.body.imagesPost,
    //         videoPost: req.body.videoPost,
    //         commentPost: req.body.commentPost,
    //         likePost: req.body.likePost,
    //         dislikePost: req.body.dislikePost,
    //         viewsCount: req.body.viewsCount,
    //         id: mongoose.Types.ObjectId()
    //       }

    //   },
    // );

    res.json({
      user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать информацию',
    });
  }
};


export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
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
      },
    ).populate('user');
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};




export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: 'Не удалось удалить статью',
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Статья не найдена',
          });
        }

        res.json({
          success: true,
        });
      },
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};
