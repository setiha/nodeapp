import mongoose from "mongoose";
import { responseError } from "../utils/responseFormatting.js";

export const modelExists = (modelName, urlParamName = "id") => {
  const model = mongoose.model(modelName);

  return async (req, res, next) => {
    const id = req.params[urlParamName];
    if (id == null) {
      throw new Error("Route does not have ID parameter");
    }

    const modelCount = await model.find({ _id: id }).count();
    if (modelCount < 1) {
      responseError(res, "Not found", null, 404);
      return;
    }

    next();
  };
};
