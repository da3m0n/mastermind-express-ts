export default class Utils {
  static removeChildren(el: HTMLElement | null) {
    if (el) {
      while (el.children.length > 0) {
        el.removeChild(el.firstChild as HTMLElement);
      }
    }
  }
  static createDom(type: string, props: any, ...cells: any[]): HTMLElement {
    let row = document.createElement(type) as HTMLElement;

    if (typeof props == "string") {
      row.setAttribute("class", props);
    } else if (props) {
      for (let p in props) {
        row.setAttribute(p, props[p]);
      }
    }

    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell === undefined) {
        cell = document.createTextNode("undefined");
      } else if (typeof cell !== "object") {
        cell = document.createTextNode(cell.toString());
      }
      row.appendChild(cell);
    }
    return row;
  }

  static makeUrl(name: string): string {
    let url = window.location.protocol === "http:" ? "ws://" : "wss://";
    return url + window.location.host + "/" + name;
  }
}
