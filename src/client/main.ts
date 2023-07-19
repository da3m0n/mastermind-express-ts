import "../css/style.css";
import Board from "./Board";
import Board2 from "./Board2";

const initApp = (): void => {
  console.log("load page");
  // const board: Board = new Board();
  const board = new Board2(6, 4);
  board.createBoard(document.getElementById("board-wrapper") as HTMLElement);
};

document.addEventListener("DOMContentLoaded", initApp);
console.log(import.meta.env.VITE_PORT);
