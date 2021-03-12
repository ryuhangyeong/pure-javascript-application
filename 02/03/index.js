import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";

import registry from "./registry.js";

registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector(".todoapp");
    const newMain = registry.renderRoot(main, state);
    main.replaceWith(newMain);
  });
};

/*
  개발자 도구를 켜고 렌더링된 DOM을 살펴보면 모든 돔이 갱신되는 것을 알 수 있다.
 */
window.setInterval(() => {
  state.todos = getTodos();
  render(); // 가상 루트 요소를 만든 다음 실제 요소를 새로 생성된 요소로 바꾼다. 이 방법은 소규모에서는 상관없지만 대규모에서 성능 저하의 원인이 된다.
}, 5000);

render();
