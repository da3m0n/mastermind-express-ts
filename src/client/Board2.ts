import Utils from "./Utils";
import Peg from "./Peg";

interface IPeg {
  pegColor: string;
  pegTextColor: string;
}

export default class Board2 {
  // private gamePlayPegs_: string | undefined;
  private readonly rows_: number;
  private readonly cols_: number;
  // private pegColors_: { pegColor: string; pegTextColor: string }[];
  private readonly pegColors_: IPeg[];

  constructor(rows: number, cols: number) {
    this.rows_ = rows;
    this.cols_ = cols;

    this.pegColors_ = [
      { pegColor: "#18e7e7", pegTextColor: "#0aabab" },
      { pegColor: "#07f007", pegTextColor: "#039c03" },
      { pegColor: "#ff0000", pegTextColor: "#a10404" },
      { pegColor: "#065798eb", pegTextColor: "#0486ee" },
      { pegColor: "#ffff00", pegTextColor: "#b2b230" },
      { pegColor: "#9c27b0", pegTextColor: "#d83ef2" },
      { pegColor: "#0e7c8c", pegTextColor: "#d7ced9" },
    ];
  }

  createBoard(root: string) {
    const rootDiv = document.getElementById(root) as HTMLDivElement;

    const boardDiv = Utils.createDom("div", {
      class: "board",
    }) as HTMLDivElement;

    const playGrid = Utils.createDom("div", {
      class: "play-grid",
    }) as HTMLDivElement;

    const codePegsDiv = Utils.createDom("div", {
      class: "code-pegs",
    }) as HTMLDivElement;

    const solutionDiv = Utils.createDom("div", {
      class: "solutionDiv",
    }) as HTMLDivElement;

    const footerDiv = Utils.createDom("div", {
      class: "footerDiv",
    }) as HTMLDivElement;

    const peg: Peg = new Peg(50, "ffffff", "code-peg");

    const rootEl = document.getElementById(root) as HTMLDivElement;
    rootEl.appendChild(boardDiv);

    for (let i = 0; i < this.rows_; i++) {
      const rowDiv = Utils.createDom("div", {
        class: "row-div",
      }) as HTMLDivElement;
      let guessPegsDiv = Utils.createDom("div", {
        class: "guess-pegs-div",
      }) as HTMLDivElement;
      let hintsDiv = Utils.createDom("div", {
        class: "hints",
      }) as HTMLDivElement;

      for (let j = 0; j < this.cols_; j++) {
        let name = "hint" + (j + 1);
        let hintPeg = Utils.createDom("div", {
          id: "hint-peg-" + (j + 1),
          class: "hint-peg " + name,
        }) as HTMLDivElement;

        hintsDiv.appendChild(hintPeg);
        guessPegsDiv.appendChild(peg.createElement());
        rowDiv.appendChild(guessPegsDiv);
        rowDiv.append(hintsDiv);
        // rowDiv.appendChild(hintPeg2);
      }
      playGrid.appendChild(rowDiv);
    }

    for (let i = 0; i < this.pegColors_.length; i++) {
      const num = i + 1;
      const color = this.pegColors_[i];

      let pegBtn = Utils.createDom("div", {
        class: "code-peg",
      }) as HTMLDivElement;
      const attributes = {
        "data-key": num,
        value: num,
        style:
          "background: " + color.pegColor + "; color: " + color.pegTextColor,
      };

      this.decorateCodePeg(pegBtn, num, attributes);

      codePegsDiv.appendChild(pegBtn);
    }

    const newGameBtn = Utils.createDom(
      "button",
      { id: "newGameBtn" },
      "new Game"
    ) as HTMLButtonElement;

    const tempText = Utils.createDom("p", {}) as HTMLLabelElement;

    for (let i = 0; i < this.cols_; i++) {
      solutionDiv.append(peg.createElement());
    }
    solutionDiv.appendChild(tempText);

    footerDiv.appendChild(solutionDiv);
    footerDiv.appendChild(newGameBtn);
    boardDiv.appendChild(playGrid);
    boardDiv.appendChild(codePegsDiv);
    rootDiv.appendChild(footerDiv);

    newGameBtn.addEventListener("click", (e) => {
      console.log("clickity click");
      rootDiv.innerHTML = "";
      this.createBoard("board-wrapper");
    });
  }

  makeFooter() {}
  decorateCodePeg(el: HTMLDivElement, num: number, attributes: {}) {
    return Object.keys(attributes).forEach((attr) => {
      el.setAttribute(attr, attributes[attr]);
      el.innerHTML = num;
    });
  }
}
