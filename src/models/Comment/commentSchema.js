import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export default commentSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  post_id: {
    type: ObjectId,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: [3, "Comment must have at least 3 characters"],
    maxLength: [500, "Comment cannot have more than 500 characters"],
  },
});
