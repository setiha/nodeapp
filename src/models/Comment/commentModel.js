import mongoose from "mongoose";
import commentSchema from "./commentSchema.js";

export default Comment = mongoose.model("Comment", commentSchema, "comments");
