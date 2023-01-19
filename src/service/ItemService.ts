import { ItemRepository } from "../repository/ItemRepository";

class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  public async create(): Promise<any> {}
}

export { ItemService };
