import { TodoList } from "./todo.js";

const todoList = new TodoList();

todoList.addTask("Learn Node.js");
todoList.addTask("Practice JavaScript");
todoList.addTask("Build a Node.js project");
todoList.addTask("Push the project to GitHub");

todoList.markComplete(0);
todoList.markComplete(1);

console.log("My Todo List:");
todoList.listTasks();