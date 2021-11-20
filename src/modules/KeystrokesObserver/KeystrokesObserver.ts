type CB = () => void;

const charsToListenTo = [":", " ", "a", "n", "y"];

export default class KeystrokesObserver {
  listeners: CB[] = [];
  buffer: string = "";
  onKey(char: string) {
    this.buffer += char;
    if (!charsToListenTo.includes(char)) this.buffer = "";
    if (/: *any/.test(this.buffer)) {
      this.listeners.forEach((a) => a());
      this.buffer = "";
    }
  }
  on(type: "any", cb: CB) {
    this.listeners.push(cb);
  }
}
