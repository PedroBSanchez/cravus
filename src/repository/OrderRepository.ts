import { DeleteResult } from "mongodb";
import { Model, UpdateWriteOpResult } from "mongoose";
import { CounterModel } from "../database/schemas/CounterSchema";
import { ItemModel } from "../database/schemas/ItemSchema";
import { OrderModel } from "../database/schemas/OrderSchema";
import { Item } from "../models/Item";
import { Order } from "../models/Order";

class OrderRepository {
  private model: Model<Order>;
  private itemModel: Model<Item>;

  public constructor() {
    this.model = OrderModel;
    this.itemModel = ItemModel;
  }

  public async createOrder() {}
}

export { OrderRepository };
