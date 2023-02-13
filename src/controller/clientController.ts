import { Router } from "express";
import {
  InterfaceCreateClient,
  InterfaceEditClient,
} from "../interface/ClientInterface";
import { ClientService } from "../service/ClientService";

const router = Router();

class ClientController {
  private router: Router;
  private authMiddleware: any;
  private clientService: ClientService;

  constructor() {
    this.router = router;
    this.authMiddleware = require("../middlewares/auth");
    this.clientService = new ClientService();
  }

  getRouter(): Router {
    return this.router;
  }

  useRoutes(): void {
    this.router.post("/create", async (req: any, res) => {
      this.authMiddleware(req, res);

      const newClient: InterfaceCreateClient = req.body;

      const createClient = await this.clientService.create(newClient);

      if (createClient) return res.status(200).send(createClient);

      return res.status(400).send({ error: "Failed to create client" });
    });

    this.router.get("/getall", async (req: any, res) => {
      this.authMiddleware(req, res);

      const clients = await this.clientService.getAll();

      return res.status(200).send(clients);
    });

    this.router.put("/edit/:id", async (req: any, res) => {
      this.authMiddleware(req, res);

      const editClient: InterfaceEditClient = req.body;
      const clientId: string = req.params.id;

      const updateClient = await this.clientService.edit(editClient, clientId);

      if (updateClient.error) {
        return res.status(400).send(updateClient);
      }

      return res.status(200).send({ success: "Client updated successfully" });
    });

    this.router.delete("/delete/:id", async (req: any, res) => {
      this.authMiddleware(req, res);

      const clientId: string = req.params.id;

      const deletedClient = await this.clientService.delete(clientId);

      if (deletedClient.error) {
        return res.status(400).send(deletedClient);
      }

      return res.status(200).send({ success: "Client deleted successfully" });
    });
  }
}

const routes = new ClientController();
routes.useRoutes();

const clientControllerRoutes = routes.getRouter();

export { clientControllerRoutes };
