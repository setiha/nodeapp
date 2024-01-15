import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const userSettingsSchema = mongoose.Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  dark_mode: {
    type: Boolean,
    default: false,
  },
  profile_private: {
    type: Boolean,
    default: false,
  },
  two_factor_auth_enabled: {
    type: Boolean,
    default: false,
  },
});
