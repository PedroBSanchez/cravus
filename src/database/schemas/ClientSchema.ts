import { model, Schema } from "mongoose";
import { Client } from "../../models/Client";

const moment = require("moment-timezone");

const ClientSchema = new Schema<Client>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: moment(new Date()).utc(-3) },
    code: { type: Number, default: 0 },
  },
  {
    collection: "Clients",
  }
);

const ClientModel = model<Client>("Clients", ClientSchema);

export { ClientModel, ClientSchema };
