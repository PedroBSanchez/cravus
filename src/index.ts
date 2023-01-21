import { config } from "dotenv";
import express from "express";
import { itemControllerRoutes } from "./controller/itemController";
import { orderControllerRoutes } from "./controller/orderController";
import { userControllerRoutes } from "./controller/userController";
import { connectToDatabase } from "./database/Mongo";

const cors = require("cors");

const main = async () => {
  console.log("Hello World!!!");
  config();
  const app = express();
  app.use(express.json());
  app.use(cors());

  //Rotas//

  app.use("/api/users", userControllerRoutes);
  app.use("/api/items", itemControllerRoutes);
  app.use("/api/orders", orderControllerRoutes);

  ////////

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
  await connectToDatabase();
};

main();
