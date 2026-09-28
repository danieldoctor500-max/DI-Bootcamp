const express = require('express');

const router = express.Router();

const todos = [
    {
        id: 1,
        title: 'Learn Express',
        completed: false
    },
    {
        id: 2,
        title: 'Practice Express Router',
        completed: false
    }
];

// GET /todos
router.get('/', (req, res) => {
    res.json(todos);
});

// POST /todos
router.post('/', (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: 'Todo title is required'
        });
    }

    const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        title,
        completed: false
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
});

// PUT /todos/:id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).json({
            message: 'Todo not found'
        });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
        todo.title = title;
    }

    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

// DELETE /todos/:id
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Todo not found'
        });
    }

    const deletedTodo = todos.splice(index, 1)[0];

    res.json({
        message: 'Todo deleted successfully',
        todo: deletedTodo
    });
});

module.exports = router;