const express = require("express");

const router = express.Router();

const triviaQuestions = [
    {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        answer: "Blue whale"
    },
    {
        question: "How many continents are there?",
        answer: "7"
    },
    {
        question: "What language is primarily used to build web pages?",
        answer: "HTML"
    }
];

let currentQuestion = 0;
let score = 0;
let feedback = "";


// GET /quiz
// Start the quiz and display the current question
router.get("/", (req, res) => {
    if (currentQuestion >= triviaQuestions.length) {
        return res.redirect("/quiz/score");
    }

    const question = triviaQuestions[currentQuestion];

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Trivia Quiz</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: 50px auto;
                    padding: 20px;
                    text-align: center;
                    background: #f4f4f4;
                }

                .quiz-box {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                input {
                    padding: 10px;
                    width: 80%;
                    margin: 15px 0;
                }

                button {
                    padding: 10px 25px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background: #333;
                    color: white;
                }

                .feedback {
                    margin-bottom: 20px;
                    font-weight: bold;
                }
            </style>
        </head>

        <body>
            <div class="quiz-box">
                <h1>Trivia Quiz</h1>

                <p class="feedback">${feedback}</p>

                <h2>Question ${currentQuestion + 1} of ${triviaQuestions.length}</h2>

                <p>${question.question}</p>

                <form method="POST" action="/quiz">
                    <input
                        type="text"
                        name="answer"
                        placeholder="Enter your answer"
                        required
                    >

                    <br>

                    <button type="submit">Submit Answer</button>
                </form>

                <p>Current Score: ${score}</p>
            </div>
        </body>
        </html>
    `);

    feedback = "";
});


// POST /quiz
// Check the answer and move to the next question
router.post("/", (req, res) => {
    const userAnswer = req.body.answer;

    if (!userAnswer) {
        feedback = "Please enter an answer.";
        return res.redirect("/quiz");
    }

    const question = triviaQuestions[currentQuestion];

    if (userAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
        score++;
        feedback = "Correct! Well done.";
    } else {
        feedback = `Incorrect. The correct answer was ${question.answer}.`;
    }

    currentQuestion++;

    if (currentQuestion >= triviaQuestions.length) {
        return res.redirect("/quiz/score");
    }

    res.redirect("/quiz");
});


// GET /quiz/score
// Display final score
router.get("/score", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Quiz Score</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 100px;
                    background: #f4f4f4;
                }

                .score-box {
                    background: white;
                    padding: 40px;
                    max-width: 500px;
                    margin: auto;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }

                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: #333;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>

        <body>
            <div class="score-box">
                <h1>Quiz Complete!</h1>

                <h2>Your Final Score</h2>

                <p>${score} / ${triviaQuestions.length}</p>

                <a href="/quiz/restart">Play Again</a>
            </div>
        </body>
        </html>
    `);
});


// Restart the quiz
router.get("/restart", (req, res) => {
    currentQuestion = 0;
    score = 0;
    feedback = "";

    res.redirect("/quiz");
});


module.exports = router;