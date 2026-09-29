const express = require("express");
const bookRoutes = require("./server/routes/bookRoutes");

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Book API is running"
    });
});

app.use("/api/books", bookRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Book API is running on port ${PORT}`);
});
