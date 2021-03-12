# 순수 자바스크립트로 구현하기

## 개선

- 구성 요소 기반의 애플리케이션 작성을 위하여 구성 요소 레지스트리를 갖는 렌더링 엔진 구축

## 자바스크립트의 핵심 개념들이 다 녹아져있는 예제

```js
/*
const registry = {
  'todos': (targetElement, { todos }) => {},
  'filters': (targetElement, { currentFilter }) => {},
  'counter': (targetElement, { todos }) => {}
};
*/
const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state) => {
    const element = component(targetElement, state); // target dom 복제본(성능 향상을 위한)

    /*
      target dom 기준으로 아래에 있는 모든 data-component
      root이므로 todos, filters, counter를 찾게 된다. 단 각 각 registry를 등록해야한다.
     */
    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component; // dom 내의 data-component name

      const child = registry[name];
      if (!child) {
        // registry에 등록되었는가를 확인, 없으면 무시
        return;
      }

      // 찾았다면 각 각의 view 함수에 dom 정보와 상태 정보를 매개변수로 넘긴다
      target.replaceWith(child(target, state)); // 등록된 레지스트리의 함수들을 실행
    });

    return element;
  };
};

// 레지스트리 등록 함수
const add = (name, component) => {
  // 키와 대상 function(targetElement, state)
  registry[name] = renderWrapper(component); // 실제 dom 실행은 renderRoot가 실행될 때 실행
};

/*
 * @params 최상위 루트
 * @params 상태
 */
const renderRoot = (root, state) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true); // 최상위 루트 dom 복제본
  };

  return renderWrapper(cloneComponent)(root, state);
};

export default {
  add,
  renderRoot,
};
```

```js
import getTodos from "./getTodos.js";
// dom 반환하는 view 함수
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";

// 구성 요소 메커니즘
import registry from "./registry.js";

/* 
  구성 요소 등록
 */
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

// 상태
const state = {
  todos: getTodos(),
  currentFilter: "All",
};

window.requestAnimationFrame(() => {
  const main = document.querySelector(".todoapp"); // 최상위 루트
  const newMain = registry.renderRoot(main, state);
  main.replaceWith(newMain);
});
```
