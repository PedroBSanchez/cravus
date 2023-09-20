import { Model } from "mongoose";
import { ChModel } from "../database/schemas/ChSchema";
import { Ch } from "../models/Ch";
import { interfaceCreateCh } from "../interface/ChInterface";
const moment = require("moment-timezone");

class ChRepository {
  private model: Model<Ch>;

  constructor() {
    this.model = ChModel;
  }

  public async createCh(ch: interfaceCreateCh) {
    const newCh = new Ch(
      ch.client,
      ch.value,
      ch.depositDate,
      true,
      moment(new Date()).utc(0)
    );

    return await this.model.create(newCh);
  }

  public async removeCh(chId: string): Promise<any> {
    return await this.model.deleteOne({ _id: chId });
  }

  public async paginate(
    page: number,
    startDate: Date,
    endDate: Date,
    client: string
  ) {
    const limit = 10;

    const chsPaginate = await this.model
      .find({
        client: { $regex: ".*" + client + ".*", $options: "i" },
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ depositDate: "desc" });

    const countItems = await (await this.model.find({})).length;

    return {
      countItems,
      totalPages: Math.ceil(countItems / limit),
      currentPage: page,
      chsPaginate,
    };
  }
}

export { ChRepository };
