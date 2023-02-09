import { ItemModel } from "../database/schemas/ItemSchema";
import { InterfaceOrder } from "../interface/OrderInterface";
import { OrderRepository } from "../repository/OrderRepository";

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async create(newOrder: InterfaceOrder, userId: object): Promise<any> {
    //Pegar informações do Vendedor
    const seller = await this.orderRepository.findUser(userId);

    var orderItems: any = [];

    if (!seller) {
      return { error: "Seller not found" };
    }

    //Dar Baixa em cada item o pedido

    if (newOrder.items.length <= 0) {
      return { error: "Order without items" };
    }

    let newOrderObject: any = {
      city: newOrder.city,
      client: newOrder.client,
      items: [],
      total: 0,
      seller: seller,
      code: 0,
    };

    const promiseOrders = new Promise((resolve: any, reject) => {
      newOrder.items.map(async (item: any) => {
        await this.orderRepository.itemWriteOff(item).then((itemFound: any) => {
          newOrderObject.items.push({
            code: itemFound.code,
            description: itemFound.description,
            value: itemFound.value,
            amount: item.amount,
          });
          newOrderObject.total =
            newOrderObject.total + itemFound.value * item.amount;
        });
        resolve();
      });
    });

    promiseOrders.then(() => {
      console.log(newOrderObject);
      this.orderRepository.createOrder(newOrderObject);
    });

    //Calcular valor total do pedido

    // Criar pedido

    return { success: "Order Created succesfully" };
  }

  public async paginate(
    city: string,
    client: string,
    page: number
  ): Promise<any> {
    const ordersPaginate = await this.orderRepository.paginate(
      city,
      client,
      page
    );

    return ordersPaginate;
  }

  public async delete(id: string): Promise<any> {
    const deleteOrder = await this.orderRepository.delete(id);

    if (deleteOrder.deletedCount != 1) {
      return { error: "Order not found" };
    } else {
      return deleteOrder;
    }
  }

  public async findDayOrders(userId: string): Promise<any> {
    const dayOrders = await this.orderRepository.findDayOrders(userId);

    return dayOrders;
  }

  private async sumPrice(
    price: number,
    amount: number,
    itemPrice: number
  ): Promise<number> {
    return price + amount * itemPrice;
  }
}

export { OrderService };
