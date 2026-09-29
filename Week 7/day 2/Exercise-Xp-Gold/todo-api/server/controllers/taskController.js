const taskModel = require("../models/taskModel");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();

        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve tasks"
        });
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const task = await taskModel.getTaskById(id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve task"
        });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, completed = false } = req.body;

        if (!title || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be a boolean"
            });
        }

        const result = await taskModel.createTask({
            title: title.trim(),
            completed
        });

        res.status(201).json(result[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task"
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const { title, completed } = req.body;

        if (title === undefined && completed === undefined) {
            return res.status(400).json({
                message: "Provide a title or completed value"
            });
        }

        if (title !== undefined &&
            (typeof title !== "string" || !title.trim())) {
            return res.status(400).json({
                message: "Title must be a non-empty string"
            });
        }

        if (completed !== undefined && typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be a boolean"
            });
        }

        const updateData = {};

        if (title !== undefined) {
            updateData.title = title.trim();
        }

        if (completed !== undefined) {
            updateData.completed = completed;
        }

        const result = await taskModel.updateTask(id, updateData);

        if (result.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json(result[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task"
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Invalid task ID"
            });
        }

        const deletedRows = await taskModel.deleteTask(id);

        if (deletedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: `Task ${id} deleted successfully`
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task"
        });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};