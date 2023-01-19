import { model, Schema } from "mongoose";
import { Item } from "../../models/Item";

const counter = new Schema<any>(
  {
    seq: { type: Number, default: 0 },
  },
  { collection: "Counter" }
);

const counterItemModel = model<any>("Counter", counter);

const ItemSchema = new Schema<Item>(
  {
    code: { type: Number, default: 1 },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "Items" }
);

ItemSchema.pre("save", async (next) => {
  var doc: any = this;
  const itemSeq: any = await counterItemModel.findOne({ _id: "itemCounter" });
  const sequence: number = itemSeq.seq || 1;

  if (itemSeq) {
    doc.code = sequence;
  }

  await counterItemModel.updateOne(
    { _id: "itemCounter" },
    { $set: { seq: sequence + 1 } }
  );
  next();
});
const ItemModel = model<Item>("Items", ItemSchema);

export { ItemModel, ItemSchema };
