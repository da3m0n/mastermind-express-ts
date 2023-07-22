import Utils from "./Utils";

export default class MessageHandler {
  private wss: WebSocket;
  private seq: number;
  private pending: Map<any, any>;
  constructor() {
    const url = Utils.makeUrl("myWebsocket");
    this.wss = new WebSocket(url);
    this.seq = 0;
    this.pending = new Map();
    this.wss.onmessage = (data) => {
      let res = JSON.parse(data.data);
      let handler = this.pending.get(res.seq);
      if (handler) {
        handler(null, res.data);
      }
    };
  }
  rpc(name: string, data: any) {
    let seq = this.seq++;

    return new Promise((resolve, reject) => {
      this.pending.set(
        seq,
        (error: any, data: { res: string[]; state: number }) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        }
      );
      this.wss.send(JSON.stringify({ type: name, data, seq }));
    });
  }
}
