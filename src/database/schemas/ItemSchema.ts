import { model, Schema } from "mongoose";
import { Item } from "../../models/Item";

const moment = require("moment-timezone");
const ItemSchema = new Schema<Item>(
  {
    description: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    code: { type: Number, default: 0 },
    createdAt: { type: Date, default: moment(new Date()).utc(-3) },
    isActive: { type: Boolean, default: true },
  },
  { collection: "Items" }
);

const ItemModel = model<Item>("Items", ItemSchema);

export { ItemModel, ItemSchema };
