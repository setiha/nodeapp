import {
  deleteUserSettingsRoute,
  getUserSettings,
  updateUserSettings,
} from "../controllers/userSettingsController.js";

export const registerUserSettingsRoutes = (app) => {
  app.get("/users/:id/settings", getUserSettings);
  app.post("/users/:id/settings", updateUserSettings);
  app.delete("/users/:id/settings", deleteUserSettingsRoute);
};
