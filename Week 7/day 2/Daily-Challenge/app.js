const express = require("express");
const userRoutes = require("./server/routes/userRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "User Management API is running"
    });
});

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});