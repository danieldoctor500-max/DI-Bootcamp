let questions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

const questionNumberElement =
    document.getElementById("question-number");

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const submitButton =
    document.getElementById("submit-button");

const feedbackElement =
    document.getElementById("feedback");

const scoreElement =
    document.getElementById("score");

const quizElement =
    document.getElementById("quiz");

const resultElement =
    document.getElementById("result");

const finalScoreElement =
    document.getElementById("final-score");

// Load questions from Express
async function loadQuestions() {
    try {
        const response = await fetch("/api/questions");

        questions = await response.json();

        displayQuestion();
    } catch (error) {
        questionElement.textContent =
            "Failed to load quiz questions.";
    }
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestion];

    selectedAnswer = null;

    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent =
        question.question;

    optionsElement.innerHTML = "";

    feedbackElement.textContent = "";

    question.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;

        button.classList.add("option");

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".option")
                .forEach(button => {
                    button.classList.remove("selected");
                });

            button.classList.add("selected");

            selectedAnswer = option;
        });

        optionsElement.appendChild(button);
    });

    scoreElement.textContent =
        `Score: ${score}`;
}

// Submit answer
submitButton.addEventListener("click", async () => {

    if (selectedAnswer === null) {
        feedbackElement.textContent =
            "Please select an answer.";

        return;
    }

    try {

        const response = await fetch("/api/answer", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                questionIndex: currentQuestion,
                answer: selectedAnswer
            })
        });

        const result = await response.json();

        if (result.correct) {
            score++;

            feedbackElement.textContent =
                "Correct!";
        } else {
            feedbackElement.textContent =
                `Wrong! Correct answer: ${result.correctAnswer}`;
        }

        scoreElement.textContent =
            `Score: ${score}`;

        submitButton.disabled = true;

        setTimeout(() => {

            submitButton.disabled = false;

            currentQuestion++;

            if (currentQuestion < questions.length) {
                displayQuestion();
            } else {
                showResult();
            }

        }, 1200);

    } catch (error) {

        feedbackElement.textContent =
            "Something went wrong. Please try again.";
    }
});

// Display final score
function showResult() {

    quizElement.classList.add("hidden");

    resultElement.classList.remove("hidden");

    finalScoreElement.textContent =
        `You scored ${score} out of ${questions.length}.`;
}

// Restart quiz
function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    resultElement.classList.add("hidden");

    quizElement.classList.remove("hidden");

    displayQuestion();
}

// Start quiz
loadQuestions();