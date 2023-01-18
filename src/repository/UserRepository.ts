import { Model } from "mongoose";
import { UsersModel } from "../database/schemas/UserSchema";
import { InterfaceCreateUser } from "../interface/UserInterface";
import { User } from "../models/User";

class UserRepository {
  private model: Model<User>;

  public constructor() {
    this.model = UsersModel;
  }

  public async create(user: InterfaceCreateUser): Promise<any> {
    return await this.model.create(user);
  }

  public async findUserByEmail(email: string): Promise<any> {
    return await this.model.findOne({ email: email }).select("+password");
  }

  public async findAll(): Promise<any> {
    return await this.model.find().select("-password");
  }
}

export { UserRepository };
