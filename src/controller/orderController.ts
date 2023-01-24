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
    this.router.post("/create", async (req: any, res) => {
      this.authMiddleware(req, res);

      const newOrder: InterfaceOrder = req.body;

      const userId: any = req.userId;

      const orderSave = await this.orderService.create(newOrder, userId);

      if (orderSave.error) {
        return res.status(400).send(orderSave);
      }

      return res.status(200).send({ success: "Order created successfully" });
    });
  }
}

const routes = new OrderController();

routes.useRoutes();

const orderControllerRoutes = routes.getRouter();

export { orderControllerRoutes };
