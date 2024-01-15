import mongoose from "mongoose";
import { userSettingsSchema } from "./userSettingsSchema.js";

export const UserSettings = mongoose.model(
  "UserSettings",
  userSettingsSchema,
  "user_settings"
);
