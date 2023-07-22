import Utils from "./Utils";
import Peg from "./Peg";
// import Game from "./game";
// import ServerGame from "../server/ServerGame";
import ClientGame from "./ClientGame";

interface IPeg {
  pegColor: string;
  pegTextColor: string;
}

export default class Board {
  // private gamePlayPegs_: string | undefined;
  private readonly rows_: number;
  private readonly cols_: number;
  // private pegColors_: { pegColor: string; pegTextColor: string }[];
  private readonly pegColors_: IPeg[];
  private rootDiv_: HTMLElement | null;
  private curRow_: number;
  private curCol_: number;
  private guesses_ = new Set();
  private codePegsRow_: any[];
  private rowsDiv_: any[];
  private game_: ClientGame;

  constructor(rows: number, cols: number) {
    this.rows_ = rows;
    this.cols_ = cols;
    this.rootDiv_ = null;
    this.pegColors_ = [
      { pegColor: "#18e7e7", pegTextColor: "#0aabab" },
      { pegColor: "#07f007", pegTextColor: "#039c03" },
      { pegColor: "#ff0000", pegTextColor: "#a10404" },
      { pegColor: "#065798eb", pegTextColor: "#0486ee" },
      { pegColor: "#ffff00", pegTextColor: "#b2b230" },
      { pegColor: "#9c27b0", pegTextColor: "#d83ef2" },
      { pegColor: "#0e7c8c", pegTextColor: "#d7ced9" },
    ];
    this.curRow_ = 0;
    this.curCol_ = 0;
    this.guesses_ = new Set();
    this.codePegsRow_ = [];
    this.rowsDiv_ = [];

    // this.game_ = new Game();
    this.game_ = new ClientGame();

    document.addEventListener("keypress", this.handleKeyboardInput());
  }

  private handleKeyboardInput() {
    return async (e: KeyboardEvent) => {
      const num = parseInt(e.key);

      if (num >= 1 && num <= 7 && !this.guesses_.has(num)) {
        this.guesses_.add(num);
        const codePegRow = this.codePegsRow_[this.curRow_];
        const rowDiv = this.rowsDiv_[this.curRow_];
        const cell = codePegRow[this.curCol_];

        const attributes = {
          style:
            "background: " +
            this.pegColors_[num - 1].pegColor +
            "; color: " +
            this.pegColors_[num - 1].pegTextColor,
        };
        this.decorateCodePeg(cell.pegDiv, num, attributes);
        cell.num = num;
        if (this.curCol_ === this.cols_ - 1) {
          console.log("send data to server to check");
          const res = await this.game_.checkNumbers(
            codePegRow.map((x: any) => x.num)
          );

          this.updateHints(res.res, rowDiv);

          console.log("res", res);
          this.curRow_++;
          this.guesses_.clear();
        }
        this.curCol_ = (this.curCol_ + 1) % this.cols_;
        // this.decorateCodePeg();
      }
    };
  }

  createBoard(rootDiv: HTMLElement) {
    this.rootDiv_ = rootDiv;
    this.recreateBoard();
  }
  recreateBoard() {
    const cd = Utils.createDom;
    const rootDiv = this.rootDiv_ as HTMLElement;
    // const rowsDiv = [];
    Utils.removeChildren(rootDiv);

    const boardDiv = cd("div", { class: "board" }) as HTMLDivElement;
    const playGrid = cd("div", { class: "play-grid" }) as HTMLDivElement;
    const codePegsDiv = cd("div", { class: "code-pegs" }) as HTMLDivElement;
    const solutionDiv = cd("div", { class: "solutionDiv" });
    const footerDiv = cd("div", { class: "footerDiv" }) as HTMLDivElement;
    const rootEl = rootDiv as HTMLDivElement;

    const peg: Peg = new Peg(50, "ffffff", "code-peg");

    rootEl.appendChild(boardDiv);

    for (let i = 0; i < this.rows_; i++) {
      const row: any = [];
      const rowDiv = cd("div", { class: "row-div" }) as HTMLDivElement;
      const guessPegsDiv = cd("div", {
        class: "guess-pegs-div",
      }) as HTMLDivElement;
      const hintsDiv = cd("div", { class: "hints" }) as HTMLDivElement;

      this.codePegsRow_.push(row);

      for (let j = 0; j < this.cols_; j++) {
        const name = "hint" + (j + 1);
        const hintPeg = cd("div", {
          id: "hint-peg-" + (j + 1),
          class: "hint-peg " + name,
        }) as HTMLDivElement;

        const pegDiv = peg.createElement();
        row.push({ pegDiv, value: null });
        hintsDiv.appendChild(hintPeg);
        guessPegsDiv.appendChild(pegDiv);
        rowDiv.appendChild(guessPegsDiv);
        rowDiv.append(hintsDiv);
      }
      this.rowsDiv_.push({ rowDiv });
      playGrid.appendChild(rowDiv);
    }

    for (let i = 0; i < this.pegColors_.length; i++) {
      const num = i + 1;
      const color = this.pegColors_[i];

      const pegBtn = cd("div", { class: "code-peg" }) as HTMLDivElement;
      const attributes = {
        "data-key": num,
        value: num,
        style:
          "background: " + color.pegColor + "; color: " + color.pegTextColor,
      };

      this.decorateCodePeg(pegBtn, num, attributes);

      codePegsDiv.appendChild(pegBtn);
    }

    const newGameBtn = cd(
      "button",
      { id: "newGameBtn" },
      "New Game"
    ) as HTMLButtonElement;

    newGameBtn.addEventListener("click", async (e) => {
      this.recreateBoard();
    });

    for (let i = 0; i < this.cols_; i++) {
      solutionDiv.append(peg.createElement());
    }

    footerDiv.appendChild(solutionDiv);
    footerDiv.appendChild(newGameBtn);
    boardDiv.appendChild(playGrid);
    boardDiv.appendChild(codePegsDiv);
    rootDiv.appendChild(footerDiv);
  }

  decorateCodePeg(el: HTMLDivElement, num: number, attributes: any) {
    return Object.keys(attributes).forEach((attr: string) => {
      el.setAttribute(attr, attributes[attr]);
      el.innerHTML = num.toString();
    });
  }

  private updateHints(hints: string[], currRow: { rowDiv: HTMLElement }) {
    const row = currRow.rowDiv.querySelectorAll("div[id]");
    console.log("row", row);
    row.forEach((r, i) => {
      let hint = hints[i];
      if (hint === "x") {
        // peg.setAttribute("class", "exact");
        r.classList.add("exact");
      } else if (hint === "c") {
        // peg.setAttribute("class", "close");
        r.classList.add("close");
      }
    });
  }
}
