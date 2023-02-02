import { model, Schema } from "mongoose";
import { User } from "../../models/User";
import Bcrypt from "bcrypt";
const moment = require("moment-timezone");
const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    created_at: { type: Date, default: moment(Date.now()).utc(-3) },
  },
  {
    collection: "Users",
  }
);

UserSchema.pre("save", async function (next) {
  const hash = await Bcrypt.hash(this.password, 10);

  this.password = hash;

  next();
});

const UsersModel = model<User>("Users", UserSchema);

export { UsersModel, UserSchema };
