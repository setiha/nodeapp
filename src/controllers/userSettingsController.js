import { ObjectId } from "mongodb";
import { UserSettings } from "../models/UserSettings/userSettingsModel.js";
import { responseError, responseSuccess } from "../utils/responseFormatting.js";

export const getUserSettings = async (req, res) => {
  const id = req.params.id;

  const result = await UserSettings.find({ user_id: new ObjectId(id) });

  responseSuccess(res, result[0], 200);
};

export const updateUserSettings = async (req, res) => {
  const id = req.params.id;
  const dark_mode = req.body.dark_mode;
  const profile_private = req.body.profile_private;
  const two_factor_auth_enabled = req.body.two_factor_auth_enabled;

  try {
    await UserSettings.updateOne(
      { user_id: new ObjectId(id) },
      {
        dark_mode,
        profile_private,
        two_factor_auth_enabled,
      },
      { runValidators: true }
    );
    const result = await UserSettings.find({ user_id: new ObjectId(id) });

    responseSuccess(res, result[0], 200);
  } catch (error) {
    responseError(res, "Invalid data", error);
  }
};

export const deleteUserSettingsRoute = async (req, res) => {
  const id = req.params.id

  const userSettings = await deleteUserSettingsById(id)

  try {
    responseSuccess(res, userSettings, 200)
  } catch (error) {
    responseError(res, "There has been an error", {}, 500)
  }
};

export const deleteUserSettingsById = async (id) => {
  const userSettings = await UserSettings.findById(id)

  await UserSettings.deleteOne(user)

  return userSettings
}
