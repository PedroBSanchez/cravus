import { Router } from "express";
import { Request, Response } from "express";
import {
  InterfaceCreateItem,
  InterfaceEditItem,
} from "../interface/ItemsInterface";
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
    this.router.post("/create", async (req: any, res) => {
      this.authMiddleware(req, res);

      const newItem: InterfaceCreateItem = req.body;

      const createItem = await this.itemService.create(newItem);

      if (createItem) return res.status(200).send(createItem);

      return res.status(400).send({ error: "Failed to create item" });
    });

    this.router.delete("/delete/:id", async (req: any, res) => {
      this.authMiddleware(req, res);

      const id: string = req.params.id;

      const deleteItem = await this.itemService.delete(id);

      if (deleteItem.error) {
        return res.status(400).send(deleteItem);
      }

      return res.status(200).send({ success: "Item deleted successfully " });
    });

    this.router.get("/paginate", async (req: any, res) => {
      this.authMiddleware(req, res);
      const description: string = req.query.description || "";
      const page: number =
        req.query.page && parseInt(req.query.page) > 0
          ? parseInt(req.query.page)
          : 1;

      const items = await this.itemService.paginate(description, page);

      return res.status(200).send(items);
    });

    this.router.put("/edit", async (req: any, res) => {
      this.authMiddleware(req, res);
      const editParams: InterfaceEditItem = req.body;

      const edit = await this.itemService.edit(editParams);

      if (edit.error) {
        return res.status(400).send(edit);
      }

      return res.status(200).send({ success: "Item edited successfully" });
    });

    this.router.get("/getall", async (req: any, res) => {
      this.authMiddleware(req, res);

      return await this.itemService.getAll();
    });
  }
}

const routes = new ItemController(router);

routes.useRoutes();

const itemControllerRoutes = routes.getRouter();

export { itemControllerRoutes };
