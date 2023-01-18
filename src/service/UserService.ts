import {
  InterfaceCreateUser,
  InterfaceLogin,
} from "../interface/UserInterface";
import { UserRepository } from "../repository/UserRepository";
import Bcrypt from "bcrypt";
import Jwt, { verify } from "jsonwebtoken";
import { config } from "dotenv";

class UserService {
  private userRepository: UserRepository;

  public constructor() {
    this.userRepository = new UserRepository();
  }

  public async create(createUser: InterfaceCreateUser): Promise<any> {
    const user = await this.userRepository.findUserByEmail(createUser.email);

    if (user) return { error: "User already exists" };

    const newUser = await this.userRepository.create(createUser);

    return newUser;
  }

  public async login(login: InterfaceLogin): Promise<any> {
    const user = await this.userRepository.findUserByEmail(login.email);
    if (!user) {
      return { error: "User not found" };
    }

    if (!(await Bcrypt.compare(login.password, user.password))) {
      return { error: "Invalid password" };
    }
    // Gerar token
    return { user, token: this.generateToken({ id: user.id }) };
  }

  public async getAll(): Promise<any> {
    const users = await this.userRepository.findAll();

    if (!users || users.length <= 0) {
      return { error: "Users not found" };
    }

    return users;
  }

  private generateToken(params = {}) {
    const secret: any = process.env.JWT_SECRET;
    return Jwt.sign({ id: params }, secret, {
      expiresIn: 86400,
    });
  }
}

export { UserService };
