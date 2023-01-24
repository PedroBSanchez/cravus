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

    var totalPrice = { price: 0 };
    newOrder.items.forEach(async (item: any) => {
      const orderItem = await this.orderRepository.itemWriteOff(item);

      const orderItemObject = {
        description: orderItem.description,
        code: orderItem.code,
        amount: item.amount,
        value: orderItem.value,
      };

      if (orderItem) {
        await orderItems.push(orderItemObject);
      }
    });

    console.log(totalPrice.price);
    //Calcular valor total do pedido

    // Criar pedido

    let newOrderObject = {
      city: newOrder.city,
      client: newOrder.client,
      items: orderItems,
      total: totalPrice.price,
      seller: seller,
      code: 0,
    };

    const createOrder = await this.orderRepository.createOrder(newOrderObject);

    return createOrder;
  }
}

export { OrderService };
