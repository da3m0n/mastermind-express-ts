import MessageHandler from "./MessageHandler";

export default class ClientGame {
  private messageHandler_: MessageHandler;

  constructor() {
    this.messageHandler_ = new MessageHandler();
  }

  async checkNumbers(nums: any) {
    let answer = (await this.messageHandler_.rpc("check", nums)) as {
      res: string[];
      state: number;
      solution: number[];
    };
    console.log("send numbers to server", answer);
    return { res: answer.res, state: answer.state, solution: answer.solution };
  }

  async newGame() {
    console.log("start new game...");
    let res = await this.messageHandler_.rpc("newGame", null);
    console.log("res", res);
    return res;
  }
}
