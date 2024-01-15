import fs from "fs";
import { responseError, responseSuccess } from "../utils/responseFormatting.js";
import { File } from "../models/File/fileModel.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const createFile = async (req, res) => {
  const myFile = req.files.my_file;
  const model_type = req.body.model_type;
  const model_id = req.body.model_id;
  const role = req.body.role;

  console.log(req.body);

  if (model_type == null || model_id == null) {
    responseError(res, "You must specify a model_type and model_id");
    return;
  }

  try {
    const model = mongoose.model(model_type);
    const matchingModelCount = await model
      .find({ _id: new ObjectId(model_id) })
      .count();
    if (matchingModelCount != 1) {
      responseError(res, "Matching model count different from 1");
      return;
    }
  } catch (error) {
    responseError(res, "Model does not exist");
    return;
  }

  const fileName = myFile.md5 + "_" + myFile.name;

  const file = new File({
    model_type,
    model_id,
    name: fileName,
    mimetype: myFile.mimetype,
  });

  if (!fs.existsSync(file.getFolderPath())) {
    fs.mkdirSync(file.getFolderPath(), { recursive: true });
  }

  // if (fs.existsSync(filePath)) {
  //     responseError(res, "file already exists")
  //     return
  // }

  myFile.mv(file.getPath(), async (err) => {
    if (err) {
      throw err;
    }

    if (role != null) {
      file.role = role;
    }

    try {
      await file.save();
      responseSuccess(res, file, 201);
    } catch (error) {
      fs.unlinkSync(filePath);
      responseError(res, "Cannot upload file", error);
    }
  });
};

export const downloadFile = async (req, res) => {
  const file_id = req.params.id;

  const file = await File.findById(file_id);

  if (file == null) {
    responseError(res, "No file found", null, 404);
    return;
  }

  const fileContent = fs.readFileSync(file.getPath(), { encoding: "base64" });

  responseSuccess(res, { ...file._doc, file_content: fileContent });
};

export const downloadFilesByModel = async (req, res) => {
  const model_type = req.body.model_type;
  const model_id = req.body.model_id;

  let files = await File.find({ model_type, model_id });

  if (files.length == 0) {
    responseError(res, "No files found", null, 404);
    return;
  }

  files = files.map((file) => {
    const fileContent = fs.readFileSync(file.getPath(), { encoding: "base64" });
    console.log(fileContent);
    return {
      ...file._doc,
      file_content: fileContent,
    };
  });

  responseSuccess(res, files);
};
