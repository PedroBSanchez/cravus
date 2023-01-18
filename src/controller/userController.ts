import { Router } from "express";
import { Request, Response } from "express";
import {
  InterfaceCreateUser,
  InterfaceLogin,
} from "../interface/UserInterface";
import { UserService } from "../service/UserService";

const router = Router();

class UserController {
  private router: Router;
  private userService: UserService;
  private authMiddleware: any;

  constructor(router: Router) {
    this.router = router;
    this.userService = new UserService();
    this.authMiddleware = require("../middlewares/auth");
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/create", async (req: any, res) => {
      const newUser: InterfaceCreateUser = req.body;

      const createNewUser = await this.userService.create(newUser);

      if (createNewUser.error) return res.status(400).send(createNewUser.error);

      createNewUser.password = undefined;
      console.log(createNewUser);

      return res.status(200).send(createNewUser);
    });

    this.router.post("/login", async (req: any, res) => {
      const loginParam: InterfaceLogin = req.body;
      const login = await this.userService.login(loginParam);

      if (login.error) {
        return res.status(400).json(login.error);
      }

      login.user.password = undefined;

      return res.status(200).json(login);
    });

    this.router.get("/getall", async (req: any, res) => {
      this.authMiddleware(req, res);
      const users = await this.userService.getAll();

      if (users.error) {
        return res.status(400).send(users);
      }

      return res.status(200).send(users);
    });
  }
}

const routes = new UserController(router);

routes.useRoutes();

const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
