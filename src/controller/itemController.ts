import { Router } from "express";
import { Request, Response } from "express";
import { ItemService } from "../service/ItemService";

const router = Router();

class ItemController {
  private router: Router;
  private itemService: ItemService;
  private authMiddleware: any;

  public constructor(router: Router) {
    this.router = router;
    this.itemService = new ItemService();
    this.authMiddleware = require("../middlewares/auth");
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.get("/", (req: any, res) => {
      return res.status(200).send("ok");
    });
  }
}

const routes = new ItemController(router);

routes.useRoutes();

const itemControllerRoutes = routes.getRouter();

export { itemControllerRoutes };
