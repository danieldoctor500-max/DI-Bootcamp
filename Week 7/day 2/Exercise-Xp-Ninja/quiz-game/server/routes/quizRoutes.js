const express = require("express");

const {
    getQuestions,
    getQuestion,
    checkAnswer
} = require("../controllers/quizController");

const router = express.Router();

router.get("/questions", getQuestions);

router.get("/questions/:id", getQuestion);

router.post("/questions/:id/answer", checkAnswer);

module.exports = router;