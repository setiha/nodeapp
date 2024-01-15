import mongoose from "mongoose";
import { postSchema } from "./postSchema.js";

export const Post = mongoose.model("Post", postSchema, "posts");
