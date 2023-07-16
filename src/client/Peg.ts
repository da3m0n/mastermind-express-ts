import Utils from "./Utils";

export default class Peg {
  private _size: number;
  private _color: string;
  private _className: string;

  constructor(size: number, color: string = "#ffffff", className: string) {
    this._className = className;
    this._size = size;
    this._color = color;
  }

  createElement(): HTMLElement {
    const peg = Utils.createDom("div", { class: this._className });
    peg.style.width = this._size.toString() + "px";
    peg.style.height = this._size.toString() + "px";

    peg.style.backgroundColor = "#ffffff";

    return peg;
  }

  createElement2(attrs: { [key: string]: string }): HTMLDivElement {
    const peg = Utils.createDom("div", {
      class: this._className,
    }) as HTMLDivElement;

    for (const key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        peg.setAttribute(key, attrs[key]);
      }
    }
    return peg;
  }
}
