import { Router } from "express";
import { InterfaceOrder } from "../interface/OrderInterface";
import { Order } from "../models/Order";
import { OrderService } from "../service/OrderService";

const router = Router();

class OrderController {
  private router: Router;
  private orderService: OrderService;
  private authMiddleware: any;

  constructor() {
    this.router = router;
    this.orderService = new OrderService();
    this.authMiddleware = require("../middlewares/auth");
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.get("/create", async (req: any, res) => {
      this.authMiddleware();
      const newOrder: InterfaceOrder = req.body;
      const userId: string = req.id;

      const orderSave = await this.orderService.create(newOrder, userId);

      return res.status(200).send("ok");
    });
  }
}

const routes = new OrderController();

routes.useRoutes();

const orderControllerRoutes = routes.getRouter();

export { orderControllerRoutes };
