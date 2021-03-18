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
    // main.replaceWith(newMain);
    applyDiff(document.body, main, newMain);
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

/*
 * @params 현재 DOM 노드
 * @params 실제 DOM 노드
 * @params 새로운 가상 DOM 노드의 부모
 */
const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) return true;

  const differentAttribute = Array.from(n1Attributes).find((attribute) => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) return true;

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContext !== node2.textContext
  ) {
    return true;
  }

  return false;
};
