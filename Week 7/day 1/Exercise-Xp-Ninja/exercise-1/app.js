const express = require("express");
const greetingRouter = require("./routes/greeting");

const app = express();
const PORT = 3000;

// Middleware for processing form data
app.use(express.urlencoded({ extended: true }));

// Mount the router
app.use("/", greetingRouter);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
    console.log(`Emoji Greeting App running at http://localhost:${PORT}`);
});