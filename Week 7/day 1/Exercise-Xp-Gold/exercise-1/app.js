const express = require("express");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = 3000;

// Middleware for reading JSON request bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Blog API is running"
    });
});

// Mount the posts router
app.use("/posts", postsRouter);

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Blog API running at http://localhost:${PORT}`);
});