import {
  createPost,
  deletePost,
  getPosts,
  getUserPosts,
  updatePost,
} from "../controllers/postController.js";
import { modelExists } from "../middleware/modelExistsMiddleware.js";

export const registerPostRoutes = (app) => {
  app.get("/posts", getPosts);
  app.post("/posts/:id", modelExists("Post"), updatePost);
  app.delete("/posts/:postId", modelExists("Post", "postId"), deletePost);
  app.get("/users/:id/posts", getUserPosts);
  app.post("/users/:id/posts", createPost);
};
