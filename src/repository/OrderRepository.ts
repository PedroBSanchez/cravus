import { DeleteResult, ObjectId } from "mongodb";
import { Model, UpdateWriteOpResult } from "mongoose";
import { ClientModel } from "../database/schemas/ClientSchema";
import { CounterModel } from "../database/schemas/CounterSchema";
import { ItemModel } from "../database/schemas/ItemSchema";
import { OrderModel } from "../database/schemas/OrderSchema";
import { UsersModel } from "../database/schemas/UserSchema";
import { Client } from "../models/Client";
import { Item } from "../models/Item";
import { Order } from "../models/Order";
import { User } from "../models/User";

const moment = require("moment-timezone");

class OrderRepository {
  private model: Model<Order>;
  private itemModel: Model<Item>;
  private counterModel: any;
  private userModel: Model<User>;
  private clientModel: Model<Client>;

  public constructor() {
    this.model = OrderModel;
    this.itemModel = ItemModel;
    this.counterModel = CounterModel;
    this.userModel = UsersModel;
    this.clientModel = ClientModel;
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

  public async findUser(userId: any): Promise<any> {
    const idSeller: any = userId.id;
    return await this.userModel.findOne({ _id: idSeller }, "name email");
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
        "client.name": { $regex: ".*" + client + ".*", $options: "i" },
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ cretedAt: -1 });

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

  public async findDayOrders(userId: string): Promise<any> {
    let dateMidnight = new Date();
    dateMidnight.setHours(0, 0, 0, 0);
    dateMidnight = new Date(moment(dateMidnight).utc(-3));
    let dateNow = new Date(moment(new Date()).utc(-3));

    const idObject = new ObjectId(userId);

    console.log(userId);
    return await this.model
      .find({
        $and: [
          { createdAt: { $gte: dateMidnight } },
          { createdAt: { $lte: dateNow } },
          { "seller._id": idObject },
        ],
      })
      .sort({ createdAt: -1 });
  }

  public async findClient(clientId: string): Promise<any> {
    return await this.clientModel.findOne({ _id: clientId });
  }

  public async findOrderById(id: string): Promise<any> {
    return await this.model.findOne({ _id: id });
  }

  public async restoreItemAmount(code: string, amount: number): Promise<any> {
    const itemToRestore = await this.itemModel.findOne({ code: code });

    if (!itemToRestore) {
      return { error: "Item not found" };
    }

    return await this.itemModel.updateOne(
      { code: code },
      {
        $set: {
          amount: itemToRestore.amount + amount,
        },
      }
    );
  }

  public async findByDate(start: Date, end: Date): Promise<any> {
    return await this.model.find({
      $and: [{ createdAt: { $gte: start } }, { createdAt: { $lte: end } }],
    });
  }
}

export { OrderRepository };
