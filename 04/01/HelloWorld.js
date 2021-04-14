export default class HelloWorld extends HTMLElement {
  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color") ?? "black";
  }

  set color(value) {
    this.setAttribute("color", value);
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.div = document.createElement("div");
      this.div.textContent = "Hello World!";
      this.div.style.color = this.color;
      this.appendChild(this.div);
    });
  }

  disconnectCallback() {
    console.log("disconnectCallback");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (!this.div) return;
    if (name === "color") this.div.style.color = newValue;
  }
}
