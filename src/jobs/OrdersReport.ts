import Mail from "../email/Mail";

import { OrderRepository } from "../repository/OrderRepository";
require("dotenv").config();

const orderRepository: OrderRepository = new OrderRepository();

export default async (userId: string, inicio: Date, fim: Date) => {
  console.log(inicio);
  console.log(fim);
  console.log(userId);

  //Buscar informações e montar relatório
};
