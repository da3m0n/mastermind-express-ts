// import { defineConfig, loadEnv } from "vite";
import express from "express";
import ViteExpress from "vite-express";
import * as http from "http";
import { WebSocket } from "ws";
import path from "path";
import ServerGame from "./ServerGame";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const PORT = 3000;

let game = undefined;

app.use("/", express.static(path.resolve(__dirname, "../client")));

type callbackfunction = (p: any) => any;

wss.on("connection", (ws: WebSocket) => {
  let game = new ServerGame();
  let messageMap = new Map<string, callbackfunction>([
    [
      "create",
      () => {
        // game.create
        game = new ServerGame();
        return true;
      },
    ],
    ["check", game.check],
    ["getHints", game.getHints],
    ["newGame", game.newGame],
  ]);

  ws.on("message", (message: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      let result = JSON.parse(message);
      let action = messageMap.get(result.type);

      if (action) {
        let res = { seq: result.seq, data: action.call(game, result.data) };
        ws.send(JSON.stringify(res));
      }
    }
  });
});

app.get("/hello", (_, res) => {
  res.send("Hello Vite + TypeScript!");
  game = new ServerGame();
});

server.listen(PORT, () => {
  console.log(`Server iss listening on ${PORT}...`);
});

ViteExpress.bind(app, server);

// ViteExpress.listen(app, PORT, () =>
//   console.log("Server iss listening on port 3000...")
// );
