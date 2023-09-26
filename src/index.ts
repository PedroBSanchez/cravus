import { config } from "dotenv";
import express from "express";
import { clientControllerRoutes } from "./controller/clientController";
import { itemControllerRoutes } from "./controller/itemController";
import { orderControllerRoutes } from "./controller/orderController";
import { userControllerRoutes } from "./controller/userController";
import { connectToDatabase } from "./database/Mongo";
import { chControllerRoutes } from "./controller/chController";
import { StartCron } from "./cron/StartCron";
import { CounterModel } from "./database/schemas/CounterSchema";
import { Model } from "mongoose";

const cors = require("cors");

const main = async () => {
  console.log("Hello World!!!");
  config();
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Verificar Contadores //
  const counterModel: any = CounterModel;
  const countersArray = ["clientCounter", "itemCounter", "orderCounter"];

  countersArray.forEach(async (counter) => {
    let counterInDb: any = await counterModel.findOne({ name: counter });

    if (!counterInDb) {
      console.log("Counter " + counter + " Created");
      await counterModel.create({ name: counter, seq: 1 });
    }
  });

  //Rotas//

  app.use("/api/users", userControllerRoutes);
  app.use("/api/items", itemControllerRoutes);
  app.use("/api/orders", orderControllerRoutes);
  app.use("/api/clients", clientControllerRoutes);
  app.use("/api/chs", chControllerRoutes);

  ////////

  StartCron.start();

  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
  await connectToDatabase();
};

main();
