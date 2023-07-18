import Utils from "./Utils";
import Peg from "./Peg";

interface IPeg {
  pegColor: string;
  pegTextColor: string;
}

export default class Board {
  // private gamePlayPegs_: string | undefined;
  private readonly rows_: number;
  private readonly cols_: number;
  // private pegColors_: { pegColor: string; pegTextColor: string }[];
  private pegColors_: IPeg[];

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
    const rootEl = document.getElementById(root) as HTMLDivElement;
    const grid = document.getElementById("grid") as HTMLDivElement;

    for (let i = 0; i < this.rows_; i++) {
      const rowDiv = Utils.createDom("div", {
        class: "row-div",
      }) as HTMLDivElement;
      let pegDiv = Utils.createDom("div", {
        class: "code-peg-div",
      }) as HTMLDivElement;
      let hintsDiv = Utils.createDom("div", {
        class: "hints",
      }) as HTMLDivElement;

      for (let j = 0; j < this.cols_; j++) {
        const peg: Peg = new Peg(50, "ffffff", "code-peg");
        // pegDiv.appendChild(
        //   peg.createElement2({
        //     class: "code-peg",
        //   })
        // );
        pegDiv.appendChild(peg.createElement());
      }

      for (let j = 0; j < this.cols_; j++) {
        let name = "hint" + (j + 1);
        let hintPeg2 = Utils.createDom("div", {
          id: "hint-peg-" + (j + 1),
          class: "hint-peg " + name,
        }) as HTMLDivElement;

        // const hintPeg: Peg = new Peg(10, "#ffffff", "hint-peg");
        // hintsDiv.appendChild(
        //   hintPeg.createElement2({
        //     id: "hint-peg-" + (j + 1),
        //     class: "hint-peg",
        //     style: "width: 10px; height: 10px",
        //   })
        // );
        hintsDiv.appendChild(hintPeg2);
      }
      rowDiv.appendChild(pegDiv);
      rowDiv.appendChild(hintsDiv);
      grid.appendChild(rowDiv);
    }

    const codePegsDiv = document.getElementById("code-pegs") as HTMLDivElement;
    let codePegs = Utils.createDom("div", {
      class: "code-pegs",
    }) as HTMLDivElement;

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

      codePegs.appendChild(pegBtn);
    }
    codePegsDiv.appendChild(codePegs);

    const appWrapper = document.getElementById("app") as HTMLDivElement;
    const footer = document.getElementsByTagName("footer")[0] as HTMLElement;
    const newGameBtn = Utils.createDom(
      "button",
      { id: "newGameBtn" },
      "new Game"
    ) as HTMLButtonElement;
    const bWrapper = document.getElementById("board-wrapper") as HTMLDivElement;
    newGameBtn.addEventListener("click", (e) => {
      console.log("clickity click");
      bWrapper.innerHTML = "";
      this.createBoard("grid");
    });

    footer.appendChild(newGameBtn);
  }

  decorateCodePeg(el: HTMLDivElement, num: number, attributes: {}) {
    return Object.keys(attributes).forEach((attr) => {
      el.setAttribute(attr, attributes[attr]);
      el.innerHTML = num;
    });
  }
}
