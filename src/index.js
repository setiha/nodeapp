import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressFileUpload from "express-fileupload";
import { registerRoutes } from "./routes/routes.js";
import cluster from "node:cluster"
import process from "node:process"
import os from "os"

if (cluster.isPrimary && os.cpus().length > 1){
  console.log(`Primary processId: ${process.pid}`)
  let clusterInstances = []

  for (let i = 0; i < os.cpus().length; i++) {
    let newClusterInstance = cluster.fork()
    newClusterInstance.on("message", (message) => {
      console.log(message)
    })
    clusterInstances.push(newClusterInstance)
  }
} else {
  dotenv.config();
  let app = express();
  let port = 3000;

  let mongoConnectionUrl = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_URL}/?retryWrites=true&w=majority`;

  app.use(express.json());
  app.use(expressFileUpload());
 
  registerRoutes(app); 

  app.listen(port, async () => {
    try {
      await mongoose.connect(mongoConnectionUrl, { dbName: "test" });
      console.log(`App started on port: ${port} [processId: ${process.pid}]`);
      process.send({ foo: "bar" })
    } catch (error) {
      throw error;
    }
  });
}

// export const events = new EventEmitter()

// events.addListener("userDeleted", async (user) => {
//   // delete user settings
//   await deleteUserSettingsById(user.settings_id)
// })

