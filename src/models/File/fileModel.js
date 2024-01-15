import mongoose from "mongoose";
import { fileSchema } from "./fileSchema.js";

export const File = mongoose.model("File", fileSchema, "files");
