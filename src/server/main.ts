// import { defineConfig, loadEnv } from "vite";
import express from "express";
import ViteExpress from "vite-express";

const app = express();

app.get("/hello", (_, res) => {
  res.send("Hello Vite + TypeScript!");
});

// console.log("QQ", import.meta.env.VITE_PORT);
// process.env = { ...process.env, ...loadEnv() };
ViteExpress.listen(app, 3000, () =>
  console.log("Server iss listening on port 3000...")
);
