import { Router, Response, response } from "express";
import { ChService } from "../service/ChService";
import { interfaceCreateCh } from "../interface/ChInterface";

const router = Router();

class ChController {
  private router: Router;
  private authMiddleware: any;
  private chService: ChService;

  constructor() {
    this.router = router;
    this.authMiddleware = require("../middlewares/auth");
    this.chService = new ChService();
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/create", async (req: any, res: Response) => {
      this.authMiddleware(req, res);
      try {
        const newCh: interfaceCreateCh = req.body;

        const createCh = await this.chService.createCh(newCh);

        return res.status(200).send({ success: "Ch successfully created" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.delete("/delete/:id", async (req: any, res: Response) => {
      this.authMiddleware(req);
      try {
        const chId = req.params.id;

        const deleteCh = await this.chService.deleteCh(chId);

        return res.status(200).send({ success: "Ch successfully deleted" });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });

    this.router.post("/paginate", async (req: any, res: Response) => {
      this.authMiddleware(req);
      try {
        const page: number =
          req.body.page && parseInt(req.body.page) > 0
            ? parseInt(req.body.page)
            : 1;

        const startDate: Date = new Date(req.body.startDate);
        const endDate: Date = new Date(req.body.endDate);
        const client: string = req.body.client;

        const chs = await this.chService.paginate(
          page,
          startDate,
          endDate,
          client
        );

        return res.status(200).send(chs);
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "Internal Server Error" });
      }
    });
  }
}

const routes = new ChController();
routes.useRoutes();

const chControllerRoutes = routes.getRouter();

export { chControllerRoutes };
