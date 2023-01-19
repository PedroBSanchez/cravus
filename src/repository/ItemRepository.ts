import { Model } from "mongoose";
import { ItemModel } from "../database/schemas/ItemSchema";
import { Item } from "../models/Item";

class ItemRepository {
  private model: Model<Item>;

  constructor() {
    this.model = ItemModel;
  }

  public async create() {}
}

export { ItemRepository };
