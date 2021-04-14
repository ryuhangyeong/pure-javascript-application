import HelloWorld from "./HelloWorld.js";

window.customElements.define("hello-world", HelloWorld);

document.querySelector("button").addEventListener("click", () => {
  document
    .querySelectorAll("hello-world")
    .forEach((helloworld) => (helloworld.color = "blue"));
});
