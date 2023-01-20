import { InterfaceCreateItem } from "../interface/ItemsInterface";
import { ItemRepository } from "../repository/ItemRepository";

class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  public async create(newItem: InterfaceCreateItem): Promise<any> {}
}

export { ItemService };
