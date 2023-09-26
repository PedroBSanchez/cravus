import {
  InterfaceCreateClient,
  InterfaceEditClient,
} from "../interface/ClientInterface";
import { ClientRepository } from "../repository/ClientRepository";

class ClientService {
  private clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  public async create(newClient: InterfaceCreateClient): Promise<any> {
    return await this.clientRepository.create(newClient);
  }

  public async getAll(clientName: string): Promise<any> {
    return await this.clientRepository.getAll(clientName);
  }

  public async edit(
    editClient: InterfaceEditClient,
    clientId: string
  ): Promise<any> {
    const updateClient = await this.clientRepository.edit(editClient, clientId);

    if (updateClient.modifiedCount <= 0) {
      return { error: "Client not found" };
    }

    return updateClient;
  }

  public async delete(clientId: string): Promise<any> {
    const deleteClient = await this.clientRepository.delete(clientId);

    if (deleteClient.deletedCount <= 0) {
      return { error: "Client not found" };
    }

    return deleteClient;
  }
}

export { ClientService };
