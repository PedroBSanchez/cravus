import { DeleteResult } from "mongodb";
import { Model, UpdateWriteOpResult } from "mongoose";
import { CounterModel } from "../database/schemas/CounterSchema";
import { ItemModel } from "../database/schemas/ItemSchema";
import { OrderModel } from "../database/schemas/OrderSchema";
import { UsersModel } from "../database/schemas/UserSchema";
import { Item } from "../models/Item";
import { Order } from "../models/Order";
import { User } from "../models/User";

class OrderRepository {
  private model: Model<Order>;
  private itemModel: Model<Item>;
  private counterModel: Model<any>;
  private userModel: Model<User>;

  public constructor() {
    this.model = OrderModel;
    this.itemModel = ItemModel;
    this.counterModel = CounterModel;
    this.userModel = UsersModel;
  }

  public async createOrder() {}

  public async findUser(userId: string) {
    return await this.userModel.findOne({ _id: userId }, "name email");
  }
}

export { OrderRepository };
