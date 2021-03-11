const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `<li ${completed ? 'class="completed"' : ""}>
	    <div class="view">
	    	<input 
		        ${completed ? "checked" : ""}
		        class="toggle" 
		        type="checkbox">
	    	<label>${text}</label>
	    	<button class="destroy"></button>
	    </div>
	    <input class="edit" value="${text}">
	</li>`;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed); // 완료되지 않은 todo

  const { length } = notCompleted;

  // 완료되지 않은게 하나라면
  if (length === 1) {
    return "1 Item left"; // 단수 처리
  }

  return `${length} Items left`;
};

export default (targetElement, state) => {
  const { currentFilter, todos } = state;

  const element = targetElement.cloneNode(true); // 왜 복제해서 사용하는거지?
  const list = element.querySelector(".todo-list");
  const counter = element.querySelector(".todo-count");
  const filters = element.querySelector(".filters");

  list.innerHTML = todos.map(getTodoElement).join("");

  counter.textContent = getTodoCount(todos);

  Array.from(filters.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });
  return element;
};
