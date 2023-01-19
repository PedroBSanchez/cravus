import { create } from "ts-node";

class Item {
  public code: number;
  public description: string;
  public value: number;
  public amount: number;
  public createdAt: Date;

  constructor(
    code: number,
    description: string,
    value: number,
    amount: number,
    createdAt: Date
  ) {
    this.code = code;
    this.description = description;
    this.value = value;
    this.amount = amount;
    this.createdAt = createdAt;
  }
}

export { Item };
