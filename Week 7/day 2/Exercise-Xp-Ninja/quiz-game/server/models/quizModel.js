const db = require("../config/database");

const getAllQuestions = async () => {
    const questions = await db("questions")
        .select("id", "question", "correctAnswer")
        .orderBy("id");

    for (const question of questions) {
        question.options = await db("questions_options")
            .join(
                "options",
                "questions_options.option_id",
                "options.id"
            )
            .where(
                "questions_options.question_id",
                question.id
            )
            .select("options.id", "options.option");
    }

    return questions;
};

const getQuestionById = async (id) => {
    const question = await db("questions")
        .select("id", "question", "correctAnswer")
        .where("id", id)
        .first();

    if (!question) {
        return null;
    }

    question.options = await db("questions_options")
        .join(
            "options",
            "questions_options.option_id",
            "options.id"
        )
        .where(
            "questions_options.question_id",
            id
        )
        .select("options.id", "options.option");

    return question;
};

module.exports = {
    getAllQuestions,
    getQuestionById
};