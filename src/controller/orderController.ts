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

    this.router.get("/paginate", async (req: any, res) => {
      this.authMiddleware(req, res);
      const page: number =
        req.query.page && parseInt(req.query.page) > 0
          ? parseInt(req.query.page)
          : 1;
      const city = req.query.city ? req.query.city : "";
      const client = req.query.client ? req.query.client : "";

      const ordersPaginate = await this.orderService.paginate(
        city,
        client,
        page
      );

      return res.status(200).send(ordersPaginate);
    });

    this.router.delete("/delete/:id", async (req: any, res) => {
      this.authMiddleware(req, res);
      const id: string = req.params.id;

      const deleteOrder = await this.orderService.delete(id);

      if (deleteOrder.error) {
        return res.status(400).send({ error: "Failed to delete order" });
      }

      return res.status(200).send({ success: "Order deleted successfully" });
    });

    this.router.get("/dayorders", async (req: any, res) => {
      this.authMiddleware(req, res);

      const userId: any = req.userId;

      const dayOrders = await this.orderService.findDayOrders(userId.id);

      return res.status(200).send(dayOrders);
    });
  }
}

const routes = new OrderController();

routes.useRoutes();

const orderControllerRoutes = routes.getRouter();

export { orderControllerRoutes };
