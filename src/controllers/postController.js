import { ObjectId } from "mongodb";
import { Post } from "../models/Post/postModel.js";
import { responseError, responseSuccess } from "../utils/responseFormatting.js";
import { User } from "../models/User/userModel.js";

export const getPosts = async (req, res) => {
  try {
    let result = await Post.find();

    for (let i = 0; i < result.length; i++) {
      result[i]._doc.user = await result[i].getUser();
    }

    responseSuccess(res, result);
  } catch (error) {
    console.log(error);
    responseError(res, "There was an error getting the posts", error, 500);
  }
};

export const getUserPosts = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  try {
    const result = await user.getPosts();
    responseSuccess(res, result);
  } catch (error) {
    responseError(res, "There was an error getting the posts", error, 500);
  }
};

export const createPost = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  const newPost = new Post({
    user_id: id,
    title,
    content,
  });

  try {
    await newPost.save();
    responseSuccess(res, newPost, 201);
  } catch (error) {
    responseError(res, "Invalid data", error, 422);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const content = req.body.content;

  try {
    await Post.updateOne(
      { _id: new ObjectId(id) },
      { title, content },
      { runValidators: true }
    );
    const post = await Post.find({ _id: new ObjectId(id) });
    responseSuccess(res, post, 201);
  } catch (error) {
    responseError(res, "Invalid data", error, 422);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  const post = await Post.findById(id);

  try {
    await Post.deleteOne({ _id: id });
    responseSuccess(res, post, 200);
  } catch (error) {
    responseError(res, "Could not delete post", error, 500);
  }
};
