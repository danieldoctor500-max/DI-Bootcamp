let currentEmoji = null;

let currentScore = 0;

let playerName = "";

const startScreen =
    document.getElementById("start-screen");

const gameScreen =
    document.getElementById("game-screen");

const resultScreen =
    document.getElementById("result-screen");

const playerNameInput =
    document.getElementById("player-name");

const startButton =
    document.getElementById("start-button");

const playerDisplay =
    document.getElementById("player-display");

const scoreElement =
    document.getElementById("score");

const emojiElement =
    document.getElementById("emoji");

const optionsElement =
    document.getElementById("options");

const guessForm =
    document.getElementById("guess-form");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("next-button");

const finishButton =
    document.getElementById("finish-button");

const finalScoreElement =
    document.getElementById("final-score");

const restartButton =
    document.getElementById("restart-button");

const leaderboardList =
    document.getElementById("leaderboard-list");


// Start game
startButton.addEventListener("click", () => {

    const name = playerNameInput.value.trim();

    if (!name) {
        alert("Please enter your name.");

        return;
    }

    playerName = name;

    currentScore = 0;

    playerDisplay.textContent =
        `Player: ${playerName}`;

    scoreElement.textContent =
        "Score: 0";

    startScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    loadQuestion();
});


// Load random question
async function loadQuestion() {

    feedbackElement.textContent = "";

    nextButton.classList.add("hidden");

    try {

        const response =
            await fetch("/api/question");

        const question =
            await response.json();

        currentEmoji = question.emoji;

        emojiElement.textContent =
            question.emoji;

        optionsElement.innerHTML = "";

        question.options.forEach(option => {

            const button =
                document.createElement("button");

            button.type = "button";

            button.textContent = option;

            button.classList.add("option");

            button.addEventListener("click", () => {

                document
                    .querySelectorAll(".option")
                    .forEach(button => {
                        button.classList.remove(
                            "selected"
                        );
                    });

                button.classList.add("selected");
            });

            optionsElement.appendChild(button);
        });

    } catch (error) {

        feedbackElement.textContent =
            "Could not load the question.";
    }
}


// Submit guess
guessForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const selected =
        document.querySelector(".option.selected");

    if (!selected) {

        feedbackElement.textContent =
            "Please select an answer.";

        return;
    }

    const guess =
        selected.textContent;

    try {

        const response =
            await fetch("/api/guess", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    emoji: currentEmoji,
                    guess: guess
                })
            });

        const result =
            await response.json();

        feedbackElement.textContent =
            result.message;

        if (result.correct) {

            currentScore++;

            scoreElement.textContent =
                `Score: ${currentScore}`;
        }

        document
            .querySelectorAll(".option")
            .forEach(button => {
                button.disabled = true;
            });

        nextButton.classList.remove("hidden");

    } catch (error) {

        feedbackElement.textContent =
            "Something went wrong.";
    }
});


// Next emoji
nextButton.addEventListener("click", () => {
    loadQuestion();
});


// Finish game
finishButton.addEventListener("click", async () => {

    await saveScore();

    gameScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

    finalScoreElement.textContent =
        `${playerName}, your final score is ${currentScore}.`;

    loadLeaderboard();
});


// Save score
async function saveScore() {

    try {

        await fetch("/api/score", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: playerName,
                score: currentScore
            })
        });

    } catch (error) {

        console.error(
            "Could not save score:",
            error
        );
    }
}


// Load leaderboard
async function loadLeaderboard() {

    try {

        const response =
            await fetch("/api/leaderboard");

        const leaderboard =
            await response.json();

        leaderboardList.innerHTML = "";

        if (leaderboard.length === 0) {

            leaderboardList.innerHTML =
                "<li>No scores yet.</li>";

            return;
        }

        leaderboard.forEach((player, index) => {

            const item =
                document.createElement("li");

            item.textContent =
                `${player.name} - ${player.score} points`;

            leaderboardList.appendChild(item);
        });

    } catch (error) {

        leaderboardList.innerHTML =
            "<li>Could not load leaderboard.</li>";
    }
}


// Restart game
restartButton.addEventListener("click", () => {

    currentScore = 0;

    resultScreen.classList.add("hidden");

    gameScreen.classList.remove("hidden");

    scoreElement.textContent =
        "Score: 0";

    loadQuestion();
});


// Load leaderboard when page opens
loadLeaderboard();