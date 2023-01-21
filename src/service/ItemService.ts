import { createNew } from "typescript";
import {
  InterfaceCreateItem,
  InterfaceEditItem,
} from "../interface/ItemsInterface";
import { ItemRepository } from "../repository/ItemRepository";

class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  public async create(newItem: InterfaceCreateItem): Promise<any> {
    const createNewItem = await this.itemRepository.create(newItem);

    return createNewItem;
  }

  public async delete(id: string): Promise<any> {
    const deleteItem = await this.itemRepository.delete(id);

    if (deleteItem.deletedCount != 1) {
      return { error: "Item not found" };
    } else {
      return deleteItem;
    }
  }

  public async paginate(description: string, page: number): Promise<any> {
    const itemsPaginate = await this.itemRepository.paginate(description, page);

    return itemsPaginate;
  }

  public async edit(editParams: InterfaceEditItem): Promise<any> {
    const edit = await this.itemRepository.edit(editParams);

    if (edit.modifiedCount < 1) {
      return { error: "Item not found" };
    }

    return edit;
  }
}

export { ItemService };
