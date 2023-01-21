import { OrderRepository } from "../repository/OrderRepository";

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }
}

export { OrderService };
