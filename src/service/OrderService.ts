import { InterfaceOrder } from "../interface/OrderInterface";
import { OrderRepository } from "../repository/OrderRepository";

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async create(newOrder: InterfaceOrder, userId: string): Promise<any> {
    //Pegar informações do Vendedor
    //Dar Baixa em cada item o pedido
    // Criar pedido
  }
}

export { OrderService };
