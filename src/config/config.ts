// export default class Util {
//   constructor() {}

//   test() {
//     console.log(import.meta.env.VITE_PORT);
//   }
// }

import dotenv from "dotenv";

require("dotenv").config();

dotenv.config();

const MONGO_USER = process.env.MONGO_USER || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "";
// const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.xlkubny.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const MONGO_URL = `mongodb://127.0.0.1:27017/${DB_NAME}`;
const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const SESSION_SHARED_SECRET = process.env.SESSION_SHARED_SECRET || "";

export const config = {
  mongo: {
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
    sharedSecret: SESSION_SHARED_SECRET,
  },
};

// const VITE_SERVER_PORT = 9090;
// export const config {
//   server: VITE_SERVER_PORT
// }
