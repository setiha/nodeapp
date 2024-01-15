import { longFunction, shortFunction } from "../controllers/testController.js";
import { registerFileRoutes } from "./fileRoutes.js";
import { registerPostRoutes } from "./postRoutes.js";
import { registerUserRoutes } from "./userRoutes.js";
import { registerUserSettingsRoutes } from "./userSettingsRoutes.js";

export const registerRoutes = (app) => {
  registerUserRoutes(app);
  registerUserSettingsRoutes(app);
  registerPostRoutes(app);
  registerFileRoutes(app);

  app.get("/test-long", longFunction)
  app.get("/test-short", shortFunction)
};
