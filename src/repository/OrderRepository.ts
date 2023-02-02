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

  public async createOrder(newOrder: any) {
    let seq: any = await this.counterModel.findOne({ name: "orderCounter" });

    await this.counterModel.updateOne(
      { name: "orderCounter" },
      { $set: { seq: seq.seq + 1 } }
    );

    newOrder.code = seq.seq;

    return await this.model.create(newOrder);
  }

  public async findUser(userId: object): Promise<any> {
    return await this.userModel.findOne({ id: userId }, "name email");
  }

  public async itemWriteOff(item: any) {
    //Encontrar item no estoque verificar valor e dar baixa
    const itemFound = await this.itemModel.findOne({ code: item.code });

    if (itemFound) {
      //Dar Baixa e retornar item

      await this.itemModel.updateOne(
        { _id: itemFound.id },
        { $set: { amount: itemFound.amount - item.amount } }
      );
    }
    return itemFound;
  }

  public async paginate(
    city: string,
    client: string,
    page: number
  ): Promise<any> {
    const limit = 10;

    const ordersPaginate = await this.model
      .find({
        city: { $regex: ".*" + city + ".*", $options: "i" },
        client: { $regex: ".*" + client + ".*", $options: "i" },
      })
      .limit(limit)
      .skip((page - 1) * limit);

    const countItems = await this.model.count();

    return {
      countItems,
      totalPages: Math.ceil(countItems / limit),
      currentPage: page,
      ordersPaginate,
    };
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.model.deleteOne({ _id: id });
  }
}

export { OrderRepository };
