import Utils from "./Utils";
import Peg from "./Peg";
import CodePegs from "./CodePegs";

export default class Board {
  constructor(rows: number, cols: number) {
    // this.utils = new Utils();

    const grid = document.getElementById("grid") as HTMLDivElement;

    for (let i = 0; i < rows; i++) {
      const rowDiv = Utils.createDom("div", {
        class: "row-div",
      }) as HTMLDivElement;
      let pegDiv = Utils.createDom("div", {
        class: "code-peg-div",
      }) as HTMLDivElement;
      let hintsDiv = Utils.createDom("div", {
        class: "hints",
      }) as HTMLDivElement;

      for (let j = 0; j < 4; j++) {
        const peg: Peg = new Peg(50, "ffffff", "code-peg");
        // pegDiv.appendChild(
        //   peg.createElement2({
        //     class: "code-peg",
        //   })
        // );
        pegDiv.appendChild(peg.createElement());
      }

      for (let j = 0; j < 4; j++) {
        // let name = "hint" + (j + 1);
        // let hintPeg2 = Utils.createDom("div", {
        //   id: "hint-peg-" + (j + 1),
        //   class: "hint-peg " + name,
        // }) as HTMLDivElement;

        const hintPeg: Peg = new Peg(10, "#ffffff", "hint-peg");
        hintsDiv.appendChild(
          hintPeg.createElement2({
            id: "hint-peg-" + (j + 1),
            class: "hint-peg",
            style: "width: 10px; height: 10px",
          })
        );
        // hintsDiv.appendChild(hintPeg2.createElement());
      }
      rowDiv.appendChild(pegDiv);
      rowDiv.appendChild(hintsDiv);
      grid.appendChild(rowDiv);
    }
    new CodePegs();
  }

  clearGrid(): void {
    const grid = document.getElementById("grid") as HTMLDivElement;
    const btn = document.getElementById("newGameBtn") as HTMLButtonElement;

    btn.addEventListener();
    grid.innerHTML = "";
  }
}
