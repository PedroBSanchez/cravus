import { model, Schema } from "mongoose";

import { Order } from "../../models/Order";

const moment = require("moment-timezone");

const OrderSchema = new Schema<Order>(
  {
    city: { type: String, required: true },
    client: { type: String, required: true },
    items: { type: [Object], required: true },
    total: { type: Number, required: true },
    createdAt: {
      type: Date,
      default: moment(new Date()).utc(-3),
    },
    seller: { type: Object, required: true },
    code: { type: Number, default: 0 },
  },
  {
    collection: "Orders",
  }
);

const OrderModel = model<Order>("Orders", OrderSchema);
export { OrderModel, OrderSchema };
