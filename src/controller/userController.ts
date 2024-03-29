import { Router } from "express";
import { Request, Response } from "express";
import {
  InterfaceCreateUser,
  InterfaceLogin,
} from "../interface/UserInterface";
import { UserService } from "../service/UserService";
import Mail from "../email/Mail";
import OrdersReport from "../jobs/OrdersReport";

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

    this.router.get("/tokenverify", async (req: any, res) => {
      this.authMiddleware(req, res);
      return res.status(200).send({ success: "ok" });
    });

    this.router.get("/teste", async (req: any, res) => {
      this.authMiddleware(req, res);

      const userId: any = req.userId;
      OrdersReport(userId.id, new Date(), new Date());
      return res.status(200).send({ success: "ok" });
    });
  }
}

const routes = new UserController(router);

routes.useRoutes();

const userControllerRoutes = routes.getRouter();

export { userControllerRoutes };
