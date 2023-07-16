import "../css/style.css";
import Board from "./Board";

const initApp = (): void => {
  console.log("load page");
  // const board: Board = new Board();
  new Board(6, 4);
};

document.addEventListener("DOMContentLoaded", initApp);
console.log(import.meta.env.VITE_PORT);
