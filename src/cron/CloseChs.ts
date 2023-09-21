import { ChRepository } from "../repository/ChRepository";

const CloseChs = async () => {
  console.log("Atualizando Cheques");

  const chRepository: ChRepository = new ChRepository();

  await chRepository.closeChs();
};

export { CloseChs };
