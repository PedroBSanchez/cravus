import { interfaceCreateCh } from "../interface/ChInterface";
import { ChRepository } from "../repository/ChRepository";

class ChService {
  private repository: ChRepository;

  constructor() {
    this.repository = new ChRepository();
  }

  public async createCh(ch: interfaceCreateCh) {
    return await this.repository.createCh(ch);
  }

  public async deleteCh(chId: string) {
    const deleteCh: any = await this.repository.removeCh(chId);

    if (deleteCh.deletedCount <= 0) {
      return { error: "Ch not found" };
    }

    return { sucess: "Ch successfully deleted" };
  }

  public async paginate(
    page: number,
    startDate: Date,
    endDate: Date,
    client: string
  ) {
    return await this.repository.paginate(page, startDate, endDate, client);
  }
}

export { ChService };
