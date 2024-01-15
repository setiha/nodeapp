import {
  createFile,
  downloadFile,
  downloadFilesByModel,
} from "../controllers/fileController.js";

export const registerFileRoutes = (app) => {
  app.post("/files", createFile);
  app.get("/files/:id", downloadFile);
  app.get("/files-by-model", downloadFilesByModel);
};
