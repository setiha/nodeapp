import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const emailRegEx =
  /1(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      minLength: [2, "The name is too short"],
      maxLength: [200, "The name is too long"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "The email is required"],
      minLength: [5, "The email is too short"],
      maxLength: [200, "The email is too long"],
      // match: [emailRegEx, "The email format is not supported"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      minLength: [
        8,
        "The password is too short, must have at least 8 characters",
      ],
      maxLength: [200, "The password is too long"],
    },
    settings_id: {
      type: ObjectId,
      required: true,
    },
  },
  {
    methods: {
      getPosts: async function () {
        return await mongoose.model("Post").find({ user_id: this._id });
      },
    },
  }
);

export default userSchema;
