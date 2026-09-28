const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],
        answer: "CSS"
    },
    {
        question: "Which language is commonly used to make web pages interactive?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: "JavaScript"
    },
    {
        question: "What does API stand for?",
        options: [
            "Application Programming Interface",
            "Application Program Internet",
            "Advanced Programming Input",
            "Automated Programming Interface"
        ],
        answer: "Application Programming Interface"
    },
    {
        question: "Which command starts a Node.js application?",
        options: [
            "start node",
            "run node",
            "node app.js",
            "npm start-node"
        ],
        answer: "node app.js"
    }
];

// Get all quiz questions
app.get("/api/questions", (req, res) => {
    const quizQuestions = questions.map(question => ({
        question: question.question,
        options: question.options
    }));

    res.json(quizQuestions);
});

// Check an answer
app.post("/api/answer", (req, res) => {
    const { questionIndex, answer } = req.body;

    if (
        questionIndex === undefined ||
        answer === undefined
    ) {
        return res.status(400).json({
            message: "Question index and answer are required."
        });
    }

    const question = questions[questionIndex];

    if (!question) {
        return res.status(404).json({
            message: "Question not found."
        });
    }

    const correct = answer === question.answer;

    res.json({
        correct,
        correctAnswer: question.answer,
        message: correct
            ? "Correct answer!"
            : "Wrong answer!"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Quiz game is running at http://localhost:${PORT}`);
});