// import http from "./http/xhr.js";
// import http from "./http/fetch.js";
import http from "./http/axios.js";

const HEADERS = {
  "Context-Type": "application/json",
};

const BASE_URL = "/api/todos";

const list = () => http.get(BASE_URL);

const create = (text) => {
  const todo = {
    text,
    completed: false,
  };

  return http.post(BASE_URL, todo, HEADERS);
};

const update = (newTodo) => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return http.patch(url, newTodo, HEADERS);
};

const deleteTodo = (id) => {
  const url = `${BASE_URL}/${id}`;
  return http.delete(url, HEADERS);
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
};
