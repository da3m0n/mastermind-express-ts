import Utils from "./Utils";

export default class Peg {
  private size_: number;
  private color_: string;
  private className_: string;

  constructor(size: number, color: string = "#ffffff", className: string) {
    this.className_ = className;
    this.size_ = size;
    this.color_ = color;
  }

  createElement(): HTMLElement {
    const peg = Utils.createDom("div", { class: this.className_ });
    peg.style.width = this.size_.toString() + "px";
    peg.style.height = this.size_.toString() + "px";

    peg.style.backgroundColor = "#ffffff";

    return peg;
  }

  createElement2(attrs: { [key: string]: string }): HTMLDivElement {
    const peg = Utils.createDom("div", {
      class: this.className_,
    }) as HTMLDivElement;

    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        peg.setAttribute(key, attrs[key]);
      }
    }
    return peg;
  }
}
