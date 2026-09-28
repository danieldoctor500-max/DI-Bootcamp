const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory todo database
const todos = [
    {
        id: 1,
        title: "Learn Express.js",
        completed: false
    },
    {
        id: 2,
        title: "Build a REST API",
        completed: true
    }
];

// GET all todos
app.get("/api/todos", (req, res) => {
    res.status(200).json(todos);
});

// GET one todo
app.get("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Todo ID must be a number"
        });
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    res.status(200).json(todo);
});

// CREATE a todo
app.post("/api/todos", (req, res) => {
    const { title, completed = false } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (typeof title !== "string") {
        return res.status(400).json({
            message: "Title must be a string"
        });
    }

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be true or false"
        });
    }

    const newTodo = {
        id: todos.length > 0
            ? Math.max(...todos.map((todo) => todo.id)) + 1
            : 1,
        title: title.trim(),
        completed
    };

    if (!newTodo.title) {
        return res.status(400).json({
            message: "Title cannot be empty"
        });
    }

    todos.push(newTodo);

    res.status(201).json({
        message: "Todo created successfully",
        todo: newTodo
    });
});

// UPDATE a todo
app.put("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Todo ID must be a number"
        });
    }

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const { title, completed } = req.body;

    if (title === undefined || completed === undefined) {
        return res.status(400).json({
            message: "Title and completed are required"
        });
    }

    if (typeof title !== "string") {
        return res.status(400).json({
            message: "Title must be a string"
        });
    }

    if (typeof completed !== "boolean") {
        return res.status(400).json({
            message: "Completed must be true or false"
        });
    }

    if (!title.trim()) {
        return res.status(400).json({
            message: "Title cannot be empty"
        });
    }

    todo.title = title.trim();
    todo.completed = completed;

    res.status(200).json({
        message: "Todo updated successfully",
        todo
    });
});

// DELETE a todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Todo ID must be a number"
        });
    }

    const todoIndex = todos.findIndex(
        (todo) => todo.id === id
    );

    if (todoIndex === -1) {
        return res.status(404).json({
            message: "Todo not found"
        });
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    res.status(200).json({
        message: "Todo deleted successfully",
        todo: deletedTodo
    });
});

// Invalid route handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Todo API running at http://localhost:${PORT}`);
});