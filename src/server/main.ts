// import { defineConfig, loadEnv } from "vite";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import * as http from "http";
import { WebSocket } from "ws";
import path from "path";
import ServerGame from "./ServerGame";
import * as mongoose from "mongoose";
import { config } from "../config/config";
import bcrypt from "bcrypt";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const viewsDir = path.resolve(__dirname, "../views");
const store = new session.MemoryStore();

app.use(
  session({
    secret: config.server.sharedSecret,
    saveUninitialized: false,
    resave: false,
    store,
  })
);

// const PORT = 3000;
import { User } from "../models/User";

mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("Connected to MongoDB....");
  })
  .catch((err: any) => {
    console.error("error", err);
  });

// app.get("", async (req: Request, res: Response) => {
//   try {
//     const token = req.headers.authorization;
//     return req.next();
//   } catch (e) {
//     return req.next();
//   }
// });

declare module "express-session" {
  export interface SessionData {
    userId: { [key: string]: any };
  }
}

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("XXXXXXXXXX", req.session.userId);
  if (req.session.userId) {
    next();
  } else {
    res.redirect("/login");
  }
};

// app.use(express.json());
// console.log("path", path.resolve(__dirname, "../client"));
app.use("/mm", isAuth, express.static(path.resolve(__dirname, "../client")));

app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome heer");
});

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
app.get("/login", (req: Request, res: Response) => {
  res.sendFile(viewsDir + "/login.html");
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/login");
  }
  console.log(`session data - ` + JSON.stringify(req.session));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/login");
  }

  req.session.userId = user.id;

  // res.json({ status: "ok", data: "" }); // cause Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  return res.redirect("/mm");
});

app.get("/register", (req: Request, res: Response) => {
  res.sendFile(viewsDir + "/register.html");
});

app.post("/register", async (req: Request, res: Response) => {
  console.log("in register...", req.body);
  const { username, email, password: plainTextPassword } = req.body;
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  // const { username, email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    // return res.redirect("/register");
  }
  try {
    const response = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully...", response);
    // return res.json({ status: "ok" });
    return res.redirect("/login");
  } catch (error: any) {
    console.log("error", JSON.stringify(error));
    if (error.code === 11000) {
      return res.json({ status: "error", error: "Username already in use." });
    }
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
