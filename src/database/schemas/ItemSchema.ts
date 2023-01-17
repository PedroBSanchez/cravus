import { model, Schema } from "mongoose";
import { Item } from "../../models/Item";

const ItemSchema = new Schema<Item>(
  {
    code: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Items" }
);

const ItemModel = model<Item>("Items", ItemSchema);

export { ItemModel, ItemSchema };
