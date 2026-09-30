const express = require("express");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/tasks", tasksRouter);

// Basic home route
app.get("/", (req, res) => {
    res.json({
        message: "Task Management API is running"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});