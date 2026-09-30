const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

const tasksFile = path.join(__dirname, "..", "tasks.json");

// GET /tasks
router.get("/", async (req, res) => {
    try {
        const data = await fs.readFile(tasksFile, "utf8");
        const tasks = JSON.parse(data);

        res.json(tasks);
    } catch (error) {
        console.error("Error reading tasks:", error);

        res.status(500).json({
            error: "Failed to read tasks"
        });
    }
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
    try {
        const data = await fs.readFile(tasksFile, "utf8");
        const tasks = JSON.parse(data);

        const taskId = Number(req.params.id);

        if (!Number.isInteger(taskId)) {
            return res.status(400).json({
                error: "Task ID must be a number"
            });
        }

        const task = tasks.find((task) => task.id === taskId);

        if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        console.error("Error reading task:", error);

        res.status(500).json({
            error: "Failed to read tasks"
        });
    }
});

module.exports = router;

// POST /tasks
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({
                error: "Title and description are required"
            });
        }

        // Read existing tasks
        const data = await fs.readFile(tasksFile, "utf8");
        const tasks = JSON.parse(data);

        // Generate a new ID
        const newId =
            tasks.length > 0
                ? Math.max(...tasks.map((task) => task.id)) + 1
                : 1;

        // Create new task
        const newTask = {
            id: newId,
            title: title.trim(),
            description: description.trim(),
            completed: false
        };

        // Add task to array
        tasks.push(newTask);

        // Save updated tasks
        await fs.writeFile(
            tasksFile,
            JSON.stringify(tasks, null, 2),
            "utf8"
        );

        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error creating task:", error);

        res.status(500).json({
            error: "Failed to create task"
        });
    }
});

// PUT /tasks/:id
router.put("/:id", async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        // Validate ID
        if (!Number.isInteger(taskId)) {
            return res.status(400).json({
                error: "Task ID must be a number"
            });
        }

        const { title, description, completed } = req.body;

        // Validate fields
        if (
            typeof title !== "string" ||
            typeof description !== "string" ||
            !title.trim() ||
            !description.trim()
        ) {
            return res.status(400).json({
                error: "Title and description are required"
            });
        }

        if (typeof completed !== "boolean") {
            return res.status(400).json({
                error: "Completed must be a boolean"
            });
        }

        // Read tasks
        const data = await fs.readFile(tasksFile, "utf8");
        const tasks = JSON.parse(data);

        // Find task
        const taskIndex = tasks.findIndex(
            (task) => task.id === taskId
        );

        if (taskIndex === -1) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        // Update task
        tasks[taskIndex] = {
            id: taskId,
            title: title.trim(),
            description: description.trim(),
            completed
        };

        // Save updated tasks
        await fs.writeFile(
            tasksFile,
            JSON.stringify(tasks, null, 2),
            "utf8"
        );

        res.json(tasks[taskIndex]);
    } catch (error) {
        console.error("Error updating task:", error);

        res.status(500).json({
            error: "Failed to update task"
        });
    }
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
    try {
        const taskId = Number(req.params.id);

        // Validate ID
        if (!Number.isInteger(taskId)) {
            return res.status(400).json({
                error: "Task ID must be a number"
            });
        }

        // Read tasks
        const data = await fs.readFile(tasksFile, "utf8");
        const tasks = JSON.parse(data);

        // Find task
        const taskIndex = tasks.findIndex(
            (task) => task.id === taskId
        );

        if (taskIndex === -1) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        // Remove task
        const deletedTask = tasks.splice(taskIndex, 1)[0];

        // Save updated tasks
        await fs.writeFile(
            tasksFile,
            JSON.stringify(tasks, null, 2),
            "utf8"
        );

        res.json({
            message: "Task deleted successfully",
            task: deletedTask
        });
    } catch (error) {
        console.error("Error deleting task:", error);

        res.status(500).json({
            error: "Failed to delete task"
        });
    }
});