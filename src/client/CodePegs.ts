import Utils from "./Utils";

export default class CodePegs {
  constructor() {
    const pegColors_ = [
      { pegColor: "#18e7e7", pegTextColor: "#0aabab" },
      { pegColor: "#07f007", pegTextColor: "#039c03" },
      { pegColor: "#ff0000", pegTextColor: "#a10404" },
      { pegColor: "#065798eb", pegTextColor: "#0486ee" },
      { pegColor: "#ffff00", pegTextColor: "#b2b230" },
      { pegColor: "#9c27b0", pegTextColor: "#d83ef2" },
      { pegColor: "#0e7c8c", pegTextColor: "#d7ced9" },
    ];

    const codePegsDiv = document.getElementById("code-pegs") as HTMLDivElement;

    let codePegs = Utils.createDom("div", {
      class: "code-pegs",
    }) as HTMLDivElement;

    for (let i = 0; i < pegColors_.length; i++) {
      const num = i + 1;
      const color = pegColors_[i];

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
    // return codePegs;
  }

  decorateCodePeg(el: HTMLDivElement, num: number, attributes: {}) {
    return Object.keys(attributes).forEach((attr) => {
      el.setAttribute(attr, attributes[attr]);
      el.innerHTML = num;
    });
  }
}
