import {
  checkToken,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  logInUser,
  updateUser,
} from "../controllers/userController.js";

export const registerUserRoutes = (app) => {
  app.get("/users", getAllUsers);
  app.get("/users/:id", getUserById);
  app.post("/users", createUser);
  app.patch("/users/:id", updateUser);
  app.delete("/users/:id", deleteUser);
  app.post("/users/login", logInUser);
  app.post("/check-token", checkToken);
};
