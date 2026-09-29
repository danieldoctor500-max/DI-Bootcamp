const express = require("express");

const postRoutes = require("./server/routes/postRoutes");

const app = express();

const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Blog post routes
app.use("/posts", postRoutes);

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running"
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
    console.log(`Blog API running at http://localhost:${PORT}`);
});