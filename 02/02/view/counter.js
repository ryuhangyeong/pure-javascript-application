const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;
  if (length === 1) {
    return "1 Item left"; // 단수
  }
  return `${length} Items left`; // 복수
};

export default (targetElement, { todos }) => {
  const newCounter = targetElement.cloneNode(true); // 자식 노드까지 모두 복제
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};
