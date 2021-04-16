import httpXhr from "./http/xhr.js";

const HEADERS = {
  "Context-Type": "application/json",
};

const BASE_URL = "/api/todos";

const list = () => httpXhr.get(BASE_URL);

const create = (text) => {
  const todo = {
    text,
    completed: false,
  };

  return httpXhr.post(BASE_URL, todo, HEADERS);
};

const update = (newTodo) => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return httpXhr.patch(url, newTodo, HEADERS);
};

const deleteTodo = (id) => {
  const url = `${BASE_URL}/${id}`;
  return httpXhr.delete(url, HEADERS);
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
};
