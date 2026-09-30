const state = {
  user: null,
  game: null,
};

const boardElement = document.getElementById("board");
const turnStatus = document.getElementById("turnStatus");
const messageBox = document.getElementById("messageBox");
const currentUserElement = document.getElementById("currentUser");
const opponentNameInput = document.getElementById("opponentName");

function showMessage(text) {
  messageBox.textContent = text;
}

async function apiRequest(url, method = "GET", body = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || "Request failed.");
  }

  return payload;
}

function renderBoard() {
  if (!state.game) {
    boardElement.innerHTML = "";
    return;
  }

  const { boardSize, obstacles, players } = state.game;
  const cells = [];

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      const obstacle = obstacles.some((item) => item.x === x && item.y === y);
      if (obstacle) {
        cell.classList.add("obstacle");
        cell.textContent = "X";
      }

      const p1Base = players.p1.base.x === x && players.p1.base.y === y;
      const p2Base = players.p2.base.x === x && players.p2.base.y === y;

      if (p1Base) {
        cell.classList.add("base-p1");
        cell.textContent = "B1";
      }

      if (p2Base) {
        cell.classList.add("base-p2");
        cell.textContent = "B2";
      }

      if (players.p1.position.x === x && players.p1.position.y === y) {
        cell.classList.add("p1");
        cell.textContent = "P1";
      }

      if (players.p2.position.x === x && players.p2.position.y === y) {
        cell.classList.add("p2");
        cell.textContent = "P2";
      }

      cells.push(cell);
    }
  }

  boardElement.innerHTML = "";
  cells.forEach((cell) => boardElement.appendChild(cell));

  const currentTurnName = state.game.players[state.game.turn].username;
  turnStatus.textContent = `Turn: ${currentTurnName}`;
}

async function registerUser(event) {
  event.preventDefault();

  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value;

  try {
    const result = await apiRequest("/api/register", "POST", { username, password });
    state.user = result;
    currentUserElement.textContent = result.username;
    showMessage(`Registered as ${result.username}.`);
  } catch (error) {
    showMessage(error.message);
  }
}

async function loginUser(event) {
  event.preventDefault();

  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const result = await apiRequest("/api/login", "POST", { username, password });
    state.user = result;
    currentUserElement.textContent = result.username;
    showMessage(`Logged in as ${result.username}.`);
  } catch (error) {
    showMessage(error.message);
  }
}

async function createNewGame() {
  if (!state.user) {
    showMessage("Please register or log in first.");
    return;
  }

  const opponentName = opponentNameInput.value.trim() || "CPU";

  try {
    const result = await apiRequest("/api/game/new", "POST", {
      player1Id: state.user.id,
      player2Name: opponentName,
    });

    state.game = result.game;
    renderBoard();
    showMessage(`Game started: ${state.game.players.p1.username} vs ${state.game.players.p2.username}.`);
  } catch (error) {
    showMessage(error.message);
  }
}

async function sendMove(direction) {
  if (!state.game) {
    showMessage("Start a game first.");
    return;
  }

  try {
    const result = await apiRequest(`/api/game/${state.game.id}/move`, "POST", { direction });
    state.game = result.game;
    renderBoard();

    if (result.move.winner) {
      showMessage(`${state.game.players[result.move.winner].username} wins!`);
      return;
    }

    showMessage(result.move.message);
  } catch (error) {
    showMessage(error.message);
  }
}

document.getElementById("registerForm").addEventListener("submit", registerUser);
document.getElementById("loginForm").addEventListener("submit", loginUser);
document.getElementById("newGameBtn").addEventListener("click", createNewGame);

document.querySelectorAll(".move-btn").forEach((button) => {
  button.addEventListener("click", () => sendMove(button.dataset.direction));
});

renderBoard();
