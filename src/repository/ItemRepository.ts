import { DeleteResult } from "mongodb";
import { Model, UpdateWriteOpResult } from "mongoose";
import { CounterModel } from "../database/schemas/CounterSchema";
import { ItemModel } from "../database/schemas/ItemSchema";
import {
  InterfaceCreateItem,
  InterfaceEditAmountItem,
  InterfaceEditItem,
} from "../interface/ItemsInterface";
import { Item } from "../models/Item";

class ItemRepository {
  private model: Model<Item>;
  private counterModel: any;

  constructor() {
    this.model = ItemModel;
    this.counterModel = CounterModel;
  }

  public async create(newItem: InterfaceCreateItem): Promise<any> {
    //Encontrar counter
    let seq: any = await this.counterModel.findOne({ name: "itemCounter" });

    console.log(seq.seq);
    await this.counterModel.updateOne(
      { name: "itemCounter" },
      { $set: { seq: seq.seq + 1 } }
    );

    newItem.code = seq.seq;
    return await this.model.create(newItem);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.model.deleteOne({ _id: id });
  }

  public async getById(id: string): Promise<any> {
    return await this.model.findOne({ _id: id });
  }

  public async getAll(): Promise<any> {
    return await this.model.find({ isActive: true });
  }

  public async findByDescription(description: string): Promise<any> {
    return await this.model.find({ description: /description/ });
  }

  public async paginate(description: string, page: number): Promise<any> {
    const limit = 10;

    const itemsPaginate = await this.model
      .find({
        description: { $regex: ".*" + description + ".*", $options: "i" },
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ description: "asc" });

    const countItems = await (await this.model.find({})).length;

    return {
      countItems,
      totalPages: Math.ceil(countItems / limit),
      currentPage: page,
      itemsPaginate,
    };
  }

  public async edit(
    editParams: InterfaceEditItem
  ): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne(
      { _id: editParams.id },
      {
        $set: {
          description: editParams.description,
          value: editParams.value,
          isActive: editParams.isActive,
        },
      }
    );
  }

  public async findAll(): Promise<any> {
    return await this.model.find({});
  }

  public async editAmount(
    editParams: InterfaceEditAmountItem
  ): Promise<UpdateWriteOpResult> {
    return await this.model.updateOne(
      { _id: editParams.id },
      {
        $set: {
          amount: editParams.amount,
        },
      }
    );
  }
}

export { ItemRepository };
