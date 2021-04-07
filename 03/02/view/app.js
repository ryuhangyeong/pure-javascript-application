let template;

const allTodosCompleted = (todos) => {
  if (todos.length === 0) {
    return false;
  }
  /*
    find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
    이 구문은 false인 값의 객체를 반환하고 false인 값이 없다면 undefined 반환
    false인 값이 있다는 말은 todo가 모두 완료되지 않았다(false)
    false인 값이 없다는 말은 todo가 모두 완료되어서 undefined을 반환하고 !undefined는 true이다.
    이게 좀 이상한게 객체를 부정연산자로 쓰는 로직이 합리적인지 잘 모르겠다.
  */
  return !todos.find((t) => !t.completed);
};

/*
  true인 값이 있다는 말은 최소 하나는 완료된 상태라는 것(false)
  true인 값이 없다는 말은 완료된게 하나도 없다는 말이므로 undefined 반환하고 !undefined는 true이다.
 */
const noCompletedItemIsPresent = (todos) => !todos.find((t) => t.completed);

const getTemplate = () => {
  if (!template) {
    template = document.getElementById("todo-app");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = (targetElement, events) => {
  const { clearCompleted, completeAll, addItem } = events;

  targetElement.querySelector(".new-todo").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addItem(e.target.value);
      e.target.value = "";
    }
  });

  targetElement
    .querySelector("input.toggle-all")
    .addEventListener("click", completeAll);

  targetElement
    .querySelector(".clear-completed")
    .addEventListener("click", clearCompleted);
};

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true);

  newApp.innerHTML = "";
  newApp.appendChild(getTemplate());

  if (noCompletedItemIsPresent(state.todos)) {
    // 하나도 완료된게 없다면
    newApp.querySelector(".clear-completed").classList.add("hidden");
  } else {
    newApp.querySelector(".clear-completed").classList.remove("hidden");
  }

  newApp.querySelector("input.toggle-all").checked = allTodosCompleted(
    state.todos
  );

  addEvents(newApp, events);

  return newApp;
};
