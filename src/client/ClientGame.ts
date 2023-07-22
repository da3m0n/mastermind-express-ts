import MessageHandler from "./MessageHandler";

export default class ClientGame {
  private messageHandler_: MessageHandler;

  constructor() {
    this.messageHandler_ = new MessageHandler();
  }

  async checkNumbers(nums: any) {
    let answer = await this.messageHandler_.rpc("check", nums);
    console.log("send numbers to server", answer);
    return { res: answer.res, state: answer.state, solution: answer.solution };
  }
}
