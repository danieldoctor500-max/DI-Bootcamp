const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;
const GRID_SIZE = 10;
const OBSTACLES = [
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 2, y: 4 },
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 6, y: 5 },
  { x: 4, y: 7 },
  { x: 7, y: 4 },
  { x: 8, y: 1 },
  { x: 8, y: 2 },
  { x: 1, y: 8 }
];

const users = new Map();
const games = new Map();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function clonePosition(position) {
  return { x: position.x, y: position.y };
}

function isObstacle(x, y) {
  return OBSTACLES.some((cell) => cell.x === x && cell.y === y);
}

function isInsideBoard(x, y) {
  return x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE;
}

function isAdjacent(first, second) {
  const dx = Math.abs(first.x - second.x);
  const dy = Math.abs(first.y - second.y);
  return dx + dy === 1;
}

function createPlayer(id, username, basePosition, startPosition) {
  return {
    id,
    username,
    base: clonePosition(basePosition),
    position: clonePosition(startPosition),
    hasWon: false
  };
}

function createGame(player1Id, player2Id, player1Name, player2Name) {
  const gameId = makeId("game");
  const game = {
    id: gameId,
    status: "in_progress",
    turn: "p1",
    winner: null,
    boardSize: GRID_SIZE,
    obstacles: OBSTACLES.map((cell) => ({ ...cell })),
    players: {
      p1: createPlayer(player1Id, player1Name, { x: 0, y: 0 }, { x: 1, y: 0 }),
      p2: createPlayer(player2Id, player2Name, { x: GRID_SIZE - 1, y: GRID_SIZE - 1 }, { x: GRID_SIZE - 2, y: GRID_SIZE - 1 })
    },
    log: [
      `${player1Name} and ${player2Name} started a new battle on a ${GRID_SIZE}x${GRID_SIZE} grid.`
    ]
  };

  games.set(gameId, game);
  return game;
}

function getCurrentPlayer(game) {
  return game.players[game.turn];
}

function getOpponentKey(game) {
  return game.turn === "p1" ? "p2" : "p1";
}

function resolveMove(game, direction) {
  if (game.status !== "in_progress") {
    return { ok: false, message: "The game is over." };
  }

  const currentKey = game.turn;
  const currentPlayer = game.players[currentKey];
  const opponentKey = currentKey === "p1" ? "p2" : "p1";
  const opponent = game.players[opponentKey];

  const deltas = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  const delta = deltas[direction];

  if (!delta) {
    return { ok: false, message: "Direction must be one of: up, down, left, right." };
  }

  const nextX = currentPlayer.position.x + delta.x;
  const nextY = currentPlayer.position.y + delta.y;

  if (!isInsideBoard(nextX, nextY)) {
    return { ok: false, message: "That move goes outside the board." };
  }

  if (isObstacle(nextX, nextY)) {
    return { ok: false, message: "You cannot move through an obstacle." };
  }

  if (nextX === opponent.position.x && nextY === opponent.position.y) {
    return { ok: false, message: "You cannot move onto the opponent's current position." };
  }

  currentPlayer.position = { x: nextX, y: nextY };

  const bases = {
    p1: { x: 0, y: 0 },
    p2: { x: GRID_SIZE - 1, y: GRID_SIZE - 1 }
  };

  const targetBase = bases[currentKey];
  const enemyBase = bases[opponentKey];

  if (nextX === enemyBase.x && nextY === enemyBase.y) {
    game.status = "finished";
    game.winner = currentKey;
    currentPlayer.hasWon = true;
    game.log.push(`${currentPlayer.username} captured ${opponent.username}'s base.`);
    return { ok: true, winner: currentKey, message: `${currentPlayer.username} wins!` };
  }

  let attackReady = false;
  if (isAdjacent(currentPlayer.position, enemyBase)) {
    attackReady = true;
  }

  game.turn = opponentKey;
  game.log.push(`${currentPlayer.username} moved ${direction}. ${attackReady ? `${currentPlayer.username} is adjacent to ${opponent.username}'s base and can attack.` : ""}`.trim());

  return {
    ok: true,
    winner: null,
    currentTurn: game.turn,
    attackReady,
    message: attackReady ? `${currentPlayer.username} is now attacking the enemy base.` : `${currentPlayer.username} moved successfully.`
  };
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Strategy game API is running." });
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const trimmedUsername = username.trim();
  if (!trimmedUsername) {
    return res.status(400).json({ error: "Username cannot be empty." });
  }

  const existingUser = [...users.values()].find((user) => user.username.toLowerCase() === trimmedUsername.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ error: "That username is already registered." });
  }

  const user = {
    id: makeId("user"),
    username: trimmedUsername,
    password
  };

  users.set(user.id, user);
  res.status(201).json({ id: user.id, username: user.username });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const user = [...users.values()].find(
    (entry) => entry.username.toLowerCase() === username.trim().toLowerCase() && entry.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  res.json({ id: user.id, username: user.username });
});

app.post("/api/game/new", (req, res) => {
  const { player1Id, player2Id, player2Name } = req.body || {};

  const player1 = users.get(player1Id);

  if (!player1) {
    return res.status(404).json({ error: "Player 1 not found." });
  }

  let player2 = null;
  if (player2Id) {
    player2 = users.get(player2Id);
  }

  const opponentName = player2 ? player2.username : (typeof player2Name === "string" ? player2Name.trim() : "CPU");

  if (!opponentName) {
    return res.status(400).json({ error: "A second player name is required when not using a registered account." });
  }

  const game = createGame(player1.id, player2 ? player2.id : "cpu", player1.username, opponentName);
  res.status(201).json({ game });
});

app.get("/api/game/:gameId", (req, res) => {
  const game = games.get(req.params.gameId);

  if (!game) {
    return res.status(404).json({ error: "Game not found." });
  }

  res.json({ game });
});

app.post("/api/game/:gameId/move", (req, res) => {
  const { direction } = req.body || {};
  const game = games.get(req.params.gameId);

  if (!game) {
    return res.status(404).json({ error: "Game not found." });
  }

  if (!direction || typeof direction !== "string") {
    return res.status(400).json({ error: "Direction is required." });
  }

  const moveResult = resolveMove(game, direction.toLowerCase());

  if (!moveResult.ok) {
    return res.status(400).json({ error: moveResult.message, game });
  }

  res.json({ game, move: moveResult });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Strategy game server running at http://localhost:${PORT}`);
});
