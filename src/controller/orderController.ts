import { Router } from "express";
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
    this.router.get("/create", (req: any, res) => {
      //Receber dados do pedido -> para cada item dar baixa na quantidade

      return res.status(200).send("ok");
    });
  }
}

const routes = new OrderController();

routes.useRoutes();

const orderControllerRoutes = routes.getRouter();

export { orderControllerRoutes };
