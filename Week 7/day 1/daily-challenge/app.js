const express = require("express");

const quizRouter = require("./routes/quiz");

const app = express();
const PORT = 3000;

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Mount quiz router
app.use("/quiz", quizRouter);

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>Trivia Quiz Game</h1>
        <p>Test your knowledge!</p>
        <a href="/quiz">Start Quiz</a>
    `);
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
    console.log(`Trivia Quiz server running at http://localhost:${PORT}`);
});