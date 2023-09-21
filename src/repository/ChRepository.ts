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
    client: string,
    isOpen: boolean
  ) {
    const limit = 10;

    const chsPaginate = await this.model
      .find({
        $and: [
          { client: { $regex: ".*" + client + ".*", $options: "i" } },
          { isOpen: isOpen },
          { depositDate: { $gte: startDate.toISOString() } },
          { depositDate: { $lte: endDate.toISOString() } },
        ],
      })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ depositDate: "desc" });

    const countItems = await (await this.model.find({})).length;

    let totalValue = 0;
    await this.model
      .aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$value" },
          },
        },
      ])
      .then((result) => {
        if (result.length > 0) {
          totalValue = result[0].total;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return {
      countItems,
      totalPages: Math.ceil(countItems / limit),
      currentPage: page,
      chsPaginate,
      totalValue: totalValue,
    };
  }

  public async closeChs(): Promise<any> {
    const now = new Date();
    return await this.model.updateMany(
      { depositDate: { $lte: now.toISOString() } },
      { $set: { isOpen: false } }
    );
  }
}

export { ChRepository };
