// import { defineConfig, loadEnv } from "vite";
import express from "express";
import ViteExpress from "vite-express";
import * as http from "http";
import { WebSocket } from "ws";
import path from "path";
import ServerGame from "./ServerGame";
import * as mongoose from "mongoose";
import { config } from "../config/config";
import bcrypt, { hash } from "bcrypt";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const viewsDir = path.resolve(__dirname, "../views");

// const PORT = 3000;
import { User } from "../models/User";
import bodyParser from "body-parser";

let game = undefined;

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.error("error", err);
  });

// app.use(express.json());
app.use("/", express.static(path.resolve(__dirname, "../client")));
app.use(express.urlencoded({ extended: true }));

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
// app.set("views", "./views");
app.get("/login", (req_, res) => {
  // res.send(
  //   "Hello Vite + TypeScript!" +
  //     " " +
  //     __dirname +
  //     " > " +
  //     path.resolve(__dirname, "../views")
  // );
  // res.render("login.html");
  res.sendFile(viewsDir + "/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(viewsDir + "/register.html");
});

app.post("/register", async (req, res) => {
  console.log("in register", req.body);
  // const { username, email, password: plainTextPassword } = req.body;
  // const password = await bcrypt.hash(plainTextPassword, 10);
  const { username, email } = req.body;

  try {
    const response = await User.create({
      username,
      email,
      // password,
    });
    console.log("User created successfully...", response);
    // return res.json({ status: "ok" });
    return res.redirect("/login");
  } catch (error: any) {
    if (error.code === 11000) {
      console.log("error", JSON.stringify(error));
      return res.json({ status: "error", error: "Username already in use." });
    }
    console.log("error", JSON.stringify(error));

    return res.json({ status: "error" });
  }
  //**********************************
  // bcrypt.hash(password, 10).then((hashedPassword: string) => {
  //   const user = new User({
  //     username: req.body.username,
  //     password: hashedPassword,
  //   });
  //
  //   user
  //     .save()
  //     .then((result) => {
  //       res.status(201).send({
  //         message: "User created successfully",
  //         result,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: "Error creating user",
  //         err,
  //       });
  //     })
  //     .catch((e) => {
  //       res.status(500).send({
  //         message: "Password was not hashed correctly",
  //         e,
  //       });
  //     });
  // });
});

server.listen(config.server.port, () => {
  console.log(`Server iss listening on ${config.server.port}...`);
});

// const start = async () => {
//   try {
//     await mongoose.connect(
//       "mongodb+srv://${'rowan'}:${l34ANABw9UeHY711}@cluster0.xlkubny.mongodb.net/"
//     );
//     server.listen(PORT, () => {
//       console.log(`Server iss listening on ${PORT}...`);
//     });
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };
ViteExpress.bind(app, server);
// start();
// ViteExpress.listen(app, PORT, () =>
//   console.log("Server iss listening on port 3000...")
// );
