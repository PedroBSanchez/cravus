import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";

export const connectToDatabase = async (): Promise<any> => {
  mongoose.set("strictQuery", true);
  const mongo_url = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:27017`;
  await mongoose.connect(mongo_url, (error) => {
    if (error) {
      return console.log("Error to connect to database (MongoDB)\n" + error);
    }
    return console.log(" ## Connect to database (MongoDB) ##");
  });
};
