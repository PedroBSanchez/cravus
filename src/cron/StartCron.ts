import cron from "node-cron";
import { CloseChs } from "./CloseChs";

class StartCron {
  constructor() {}

  public static start() {
    cron.schedule("0 21 * * *", () => {
      CloseChs();
    });
  }
}

export { StartCron };
