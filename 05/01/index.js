const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const findIndex = require("lodash.findindex");

const PORT = 8080;

const app = express();
let todos = [];

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

app.get("/api/todos", (_, res) => res.json(todos));

app.post("/api/todos", (req, res) => {
  const newTodo = {
    completed: false,
    ...req.body,
    id: uuidv4(),
  };

  todos.push(newTodo);

  res.status(201);
  res.json(newTodo);
});

app.patch("/api/todos/:id", (req, res) => {
  const updateIndex = findIndex(todos, (t) => t.id === req.params.id);

  const oldTodo = todos[updateIndex];

  const newTodo = {
    ...oldTodo,
    ...req.body,
  };

  todos[updateIndex] = newTodo;

  res.json(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id !== req.params.id);

  res.status(204);
});

app.get("/", (_, res) => {
  res.render("index");
});

app.listen(PORT);
