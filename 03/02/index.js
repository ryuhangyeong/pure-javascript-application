import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import appView from "./view/app.js";
import applyDiff from "./applyDiff.js";

import registry from "./registry.js";

// 레지스트리 등록
registry.add("app", appView);
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

// 상태
const state = {
  todos: [],
  currentFilter: "All",
};

// 이벤트
const events = {
  addItem: (text) => {
    // 마지막 배열에 text 삽입
    state.todos.push({
      text,
      completed: false,
    });
    render();
  },
  updateItem: (index, text) => {
    // index번째 text 변경
    state.todos[index].text = text;
    render();
  },
  deleteItem: (index) => {
    // index 번째 삭제
    state.todos.splice(index, 1);
    render();
  },
  toggleItemCompleted: (index) => {
    // index 번째의 completed를 들고와서 반전
    const { completed } = state.todos[index];
    state.todos[index].completed = !completed;
    render();
  },
  completeAll: () => {
    // all completed
    state.todos.forEach((t) => {
      t.completed = true;
    });
    render();
  },
  clearCompleted: () => {
    state.todos = state.todos.filter((t) => !t.completed);
    render();
  },
  changeFilter: (filter) => {
    // filter 변경
    state.currentFilter = filter;
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render();
