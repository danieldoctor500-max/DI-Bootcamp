const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const emojis = [
    { emoji: "😀", name: "Smile" },
    { emoji: "🐶", name: "Dog" },
    { emoji: "🌮", name: "Taco" },
    { emoji: "🍕", name: "Pizza" },
    { emoji: "🚗", name: "Car" },
    { emoji: "⚽", name: "Football" },
    { emoji: "🐱", name: "Cat" },
    { emoji: "🍎", name: "Apple" },
    { emoji: "🌞", name: "Sun" },
    { emoji: "❤️", name: "Heart" },
    { emoji: "🎸", name: "Guitar" },
    { emoji: "🐟", name: "Fish" },
    { emoji: "🚀", name: "Rocket" },
    { emoji: "🌈", name: "Rainbow" },
    { emoji: "🍔", name: "Burger" }
];

const leaderboard = [];

// Get a random emoji and multiple-choice options
app.get("/api/question", (req, res) => {
    const randomIndex = Math.floor(Math.random() * emojis.length);

    const correctEmoji = emojis[randomIndex];

    const incorrectOptions = emojis
        .filter(item => item.name !== correctEmoji.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const options = [
        correctEmoji.name,
        ...incorrectOptions.map(item => item.name)
    ].sort(() => Math.random() - 0.5);

    res.json({
        emoji: correctEmoji.emoji,
        options: options
    });
});

// Check an answer
app.post("/api/guess", (req, res) => {
    const { emoji, guess } = req.body;

    const correctEmoji = emojis.find(
        item => item.emoji === emoji
    );

    if (!correctEmoji) {
        return res.status(400).json({
            message: "Invalid emoji."
        });
    }

    const correct = correctEmoji.name === guess;

    res.json({
        correct: correct,
        correctAnswer: correctEmoji.name,
        message: correct
            ? "Correct! Great job!"
            : `Wrong! The correct answer was ${correctEmoji.name}.`
    });
});

// Save score
app.post("/api/score", (req, res) => {
    const { name, score } = req.body;

    if (!name || score === undefined) {
        return res.status(400).json({
            message: "Name and score are required."
        });
    }

    leaderboard.push({
        name: name,
        score: Number(score)
    });

    leaderboard.sort((a, b) => b.score - a.score);

    res.json({
        message: "Score saved successfully."
    });
});

// Get leaderboard
app.get("/api/leaderboard", (req, res) => {
    res.json(leaderboard.slice(0, 10));
});

// Start server
app.listen(PORT, () => {
    console.log(
        `Emoji Guessing Game is running at http://localhost:${PORT}`
    );
});