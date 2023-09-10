import {
  InterfaceCreateItem,
  InterfaceEditAmountItem,
  InterfaceEditItem,
} from "../interface/ItemsInterface";
import { Item } from "../models/Item";
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

  public async getAll(): Promise<any> {
    return await this.itemRepository.getAll();
  }

  public async totalValue(): Promise<any> {
    let valorTotal = 0;
    const allItems = await this.itemRepository.findAll();

    allItems.forEach((item: Item) => {
      valorTotal += item.value * item.amount;
    });

    if (valorTotal <= 0) {
      valorTotal = 0;
    }

    return { total: valorTotal };
  }

  public async editAmount(editParams: InterfaceEditAmountItem): Promise<any> {
    const edit = await this.itemRepository.editAmount(editParams);

    if (edit.modifiedCount < 1) {
      return { error: "Item not found" };
    }

    return edit;
  }
}

export { ItemService };
