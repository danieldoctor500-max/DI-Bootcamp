const express = require("express");

const taskRoutes = require("./server/routes/taskRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Todo API is running"
    });
});

app.use("/api/todos", taskRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Todo API running on http://localhost:${PORT}`);
});