import { CounterModel } from "../database/schemas/CounterSchema";
import { Client } from "../models/Client";
import { Model, UpdateWriteOpResult } from "mongoose";
import { DeleteResult, UpdateResult } from "mongodb";
import { ClientModel } from "../database/schemas/ClientSchema";
import {
  InterfaceCreateClient,
  InterfaceEditClient,
} from "../interface/ClientInterface";

class ClientRepository {
  private model: Model<Client>;
  private counterModel: any;

  constructor() {
    this.model = ClientModel;
    this.counterModel = CounterModel;
  }

  public async create(newClient: InterfaceCreateClient): Promise<any> {
    let seq: any = await this.counterModel.findOne({ name: "clientCounter" });
    console.log(seq.seq);
    await this.counterModel.updateOne(
      { name: "clientCounter" },
      { $set: { seq: seq.seq + 1 } }
    );

    newClient.code = seq.seq;

    return await this.model.create(newClient);
  }

  public async getAll(clientName: string): Promise<any> {
    return await this.model
      .find({
        name: { $regex: ".*" + clientName + ".*", $options: "i" },
      })
      .sort({ name: 1 });
  }

  public async edit(
    editClient: InterfaceEditClient,
    clientId: string
  ): Promise<UpdateResult> {
    return await this.model.updateOne(
      { _id: clientId },
      { $set: { name: editClient.name, phone: editClient.phone } }
    );
  }

  public async delete(clientId: string): Promise<DeleteResult> {
    return await this.model.deleteOne({ _id: clientId });
  }
}

export { ClientRepository };
