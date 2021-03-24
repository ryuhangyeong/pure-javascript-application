// View
import getTodos from "./getTodos.js";
import todosView from "./view/todos.js";
import counterView from "./view/counter.js";
import filtersView from "./view/filters.js";
import appView from "./view/app.js";

// 버츄얼 돔
import applyDiff from "./applyDiff.js";

// 레지스트리 함수
import registry from "./registry.js";

/*
	레지스트리 등록, 사전에 VIEW 함수를 받음
	{
		app: function (targetElement, state) {
	
		},
		todos: function (targetElement, state) {
	
		},
		counter: function (targetElement, state) {
	
		},
		filters: function (targetElement, state) {
	
		}
	}
 */
registry.add("app", appView); // 두번째 인자는 DOM 결과
registry.add("todos", todosView);
registry.add("counter", counterView);
registry.add("filters", filtersView);

// 상태
const state = {
  todos: getTodos(),
  currentFilter: "All",
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

render();
