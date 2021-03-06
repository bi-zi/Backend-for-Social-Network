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
    let d = new Date();
    d = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;

    const doc = new PostModel({
      post: [
        {
          text: req.body.text,
          videoPost: req.body.videoPost,
          imagesPost: req.body.imagesPost,
          commentPost: [],
          likePost: 0,
          dislikePost: 0,
          date: d,
          _id: mongoose.Types.ObjectId()
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
    let d = new Date();
    d = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;

    await PostModel.updateOne({
      user: aboutId,
    },
      {
        $push: {
          post: {

            text: req.body.text,
            videoPost: req.body.videoPost,
            imagesPost: req.body.imagesPost,
            commentPost: [],
            likePost: 0,
            dislikePost: 0,
            date: d,
            _id: mongoose.Types.ObjectId()
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
    let ObjectId = mongoose.Types.ObjectId
    const id = req.body._id
    const aboutId = req.userId;
    PostModel.updateOne({ aboutId, "post._id": ObjectId(id) }, { $inc: { "post.$.likePost": 1 } },
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

export const dislikePost = async (req, res) => {
  try {
    let ObjectId = mongoose.Types.ObjectId
    const id = req.body._id
    const aboutId = req.userId;
    let a = "62d7ce16aa9c6f1def4d4eaf"
    PostModel.updateOne({ aboutId, "post._id": ObjectId(id) }, { $inc: { "post.$.dislikePost": 1 } },
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

export const pushComment = async (req, res) => {
  try {
    let ObjectId = mongoose.Types.ObjectId
    const id = req.body._id
    const aboutId = req.userId;

    let d = new Date();
    d = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;


    PostModel.updateOne(
      {
        aboutId,
        "post._id": ObjectId(id)
      },
      {
        $push:
        {
          "post.$.commentPost": {
            fullName: req.body.fullName,
            avatar: req.body.avatar,
            commentText: req.body.commentText,
            commentDate: req.body.commentDate,
            userId: req.body.userId
          },
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
      message: 'Не удалось создать информацию',
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const aboutId = req.userId;
    let ObjectId = mongoose.Types.ObjectId

    const postId = req.body.postId
    const index = req.body.index
    const id = req.params.id
    const path = `post.$.commentPost.${index}`

    // await UserSchema.findOneAndUpdate({ "_id": aboutId }, { $unset: { [subInd2]: 1 } })
    // UserSchema.findOneAndUpdate({ "_id": aboutId }, { $pull: { "friends": null } },

    await PostModel.findOneAndUpdate({ "post._id": ObjectId(postId) }, { $unset: { [path]: 1 } }),
      PostModel.findOneAndUpdate({ "post._id": ObjectId(postId) }, { $pull: { "post.$.commentPost": null } },
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



export const deleteUserPost = async (req, res) => {
  try {
    const index = req.body.deleteId
    const aboutId = req.userId;
    const postInd = `post.${index}`

    await PostModel.updateOne({ "user": aboutId }, { $unset: { [postInd]: 1 } })
    PostModel.updateOne({ "user": aboutId }, { $pull: { "post": null } },
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
