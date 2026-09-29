const quizModel = require("../models/quizModel");

const getQuestions = async (req, res) => {
    try {
        const questions = await quizModel.getAllQuestions();

        const safeQuestions = questions.map((question) => ({
            id: question.id,
            question: question.question,
            options: question.options
        }));

        res.status(200).json(safeQuestions);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve quiz questions"
        });
    }
};

const getQuestion = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Invalid question ID"
            });
        }

        const question = await quizModel.getQuestionById(id);

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        res.status(200).json({
            id: question.id,
            question: question.question,
            options: question.options
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve question"
        });
    }
};

const checkAnswer = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { answer } = req.body;

        if (!Number.isInteger(id)) {
            return res.status(400).json({
                message: "Invalid question ID"
            });
        }

        if (!answer || typeof answer !== "string") {
            return res.status(400).json({
                message: "Answer is required"
            });
        }

        const question = await quizModel.getQuestionById(id);

        if (!question) {
            return res.status(404).json({
                message: "Question not found"
            });
        }

        const isCorrect =
            answer.trim().toLowerCase() ===
            question.correctAnswer.trim().toLowerCase();

        res.status(200).json({
            correct: isCorrect,
            message: isCorrect
                ? "Correct answer!"
                : `Incorrect. The correct answer is ${question.correctAnswer}.`
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to check answer"
        });
    }
};

module.exports = {
    getQuestions,
    getQuestion,
    checkAnswer
};