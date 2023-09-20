import { model, Schema } from "mongoose";
import { Ch } from "../../models/Ch";

const moment = require("moment-timezone");

const ChSchema = new Schema<Ch>(
  {
    client: { type: String, required: true },
    value: { type: Number, required: true },
    depositDate: { type: Date, required: true },
    isOpen: { type: Boolean, required: true },
    created_at: { type: Date, default: moment(new Date()).utc(0) },
  },
  { collection: "Chs" }
);

const ChModel = model<Ch>("Chs", ChSchema);

export { ChModel, ChSchema };
