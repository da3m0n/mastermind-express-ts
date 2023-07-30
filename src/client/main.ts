import "../css/style.css";
import Board from "./Board";

const initApp = (): void => {
  const board = new Board(6, 4);
  board.createBoard(document.getElementById("board-wrapper") as HTMLElement);
};

document.addEventListener("DOMContentLoaded", initApp);
// console.log(import.meta.env.VITE_PORT);
