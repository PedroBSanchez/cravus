import { ItemModel } from "../database/schemas/ItemSchema";
import { InterfaceOrder } from "../interface/OrderInterface";
import { OrderRepository } from "../repository/OrderRepository";
const moment = require("moment-timezone");
class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  public async create(newOrder: InterfaceOrder, userId: object): Promise<any> {
    //Pegar informações do Vendedor
    const seller = await this.orderRepository.findUser(userId);

    const client = await this.orderRepository.findClient(newOrder.client);

    var orderItems: any = [];

    if (!seller) {
      return { error: "Seller not found" };
    }

    if (!client) {
      return { error: "Client not found" };
    }

    //Dar Baixa em cada item o pedido

    if (newOrder.items.length <= 0) {
      return { error: "Order without items" };
    }

    const dateNow = new Date(moment(new Date()).utc(-3));
    let newOrderObject: any = {
      city: newOrder.city,
      client: client,
      items: [],
      total: 0,
      seller: seller,
      code: 0,
      createdAt: dateNow,
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
    page: number,
    startDate: Date,
    endDate: Date
  ): Promise<any> {
    const ordersPaginate = await this.orderRepository.paginate(
      city,
      client,
      page,
      startDate,
      endDate
    );

    return ordersPaginate;
  }

  public async delete(id: string): Promise<any> {
    //Add amount to the products
    const orderToDelete = await this.orderRepository.findOrderById(id);

    if (!orderToDelete) {
      return { error: "Order not found" };
    }

    await Promise.all(
      orderToDelete.items.map(async (item: any, index: number) => {
        await this.orderRepository.restoreItemAmount(item.code, item.amount);
      })
    );

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

  public async selledByMonth(year: number): Promise<any> {
    let monthsToCheck = [
      { month: "01", monthName: "Janeiro", totalSelled: 0 },
      { month: "02", monthName: "Fevereiro", totalSelled: 0 },
      { month: "03", monthName: "Março", totalSelled: 0 },
      { month: "04", monthName: "Abril", totalSelled: 0 },
      { month: "05", monthName: "Maio", totalSelled: 0 },
      { month: "06", monthName: "Junho", totalSelled: 0 },
      { month: "07", monthName: "Julho", totalSelled: 0 },
      { month: "08", monthName: "Agosto", totalSelled: 0 },
      { month: "09", monthName: "Setembro", totalSelled: 0 },
      { month: "10", monthName: "Outubro", totalSelled: 0 },
      { month: "11", monthName: "Novembro", totalSelled: 0 },
      { month: "12", monthName: "Dezembro", totalSelled: 0 },
    ];
    let totalSelledYear = 0;

    //Verificar se o ano é o ano atual
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth() + 1;

    if (year == yearNow && monthNow != 12) {
      monthsToCheck = monthsToCheck.slice(0, monthNow);
    }

    await Promise.all(
      monthsToCheck.map(async (month, index) => {
        //Pegar último dia um mês

        let firstDayMonth = new Date(`${year}-${month.month}-01`);
        let lastDayMonth = new Date(
          `${year}-${month.month}-${new Date(
            year,
            parseInt(month.month),
            0
          ).getDate()}`
        );

        const monthOrders = await this.orderRepository.findByDate(
          firstDayMonth,
          lastDayMonth
        );

        monthOrders.forEach((element: any, index: number) => {
          month.totalSelled += element.total;
        });

        totalSelledYear += month.totalSelled;
      })
    );

    return { totalSelledYear, monthsToCheck, year };
  }

  public async selledInMonth(year: string, month: string): Promise<any> {
    const lastDayMonth = new Date(
      `${year}-${month}-${new Date(
        parseInt(year),
        parseInt(month),
        0
      ).getDate()} 20:59:59`
    );

    let totalSelledMonth = 0;
    let weeks = [
      {
        week: "Semana 1",
        start: new Date(`${year}-${parseInt(month)}-01`),
        end: new Date(`${year}-${month}-07 23:59:59`),
        totalSelled: 0,
      },
      {
        week: "Semana 2",
        start: new Date(`${year}-${month}-08`),
        end: new Date(`${year}-${month}-14 23:59:59`),
        totalSelled: 0,
      },
      {
        week: "Semana 3",
        start: new Date(`${year}-${month}-15`),
        end: new Date(`${year}-${month}-21 23:59:59`),
        totalSelled: 0,
      },
      {
        week: "Semana 4",
        start: new Date(`${year}-${month}-22`),
        end: lastDayMonth,
        totalSelled: 0,
      },
    ];

    await Promise.all(
      weeks.map(async (week, index) => {
        await this.orderRepository
          .findByDate(week.start, week.end)
          .then((orders: any) => {
            if (orders.length > 0) {
              let totalSelledWeek = 0;
              orders.forEach((order: any, index: number) => {
                totalSelledWeek += order.total;
              });

              week.totalSelled = totalSelledWeek;
            }
          });
      })
    ).then(() => {
      weeks.forEach((week) => {
        totalSelledMonth += week.totalSelled;
      });
    });

    return { totalSelledMonth, weeks };
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
