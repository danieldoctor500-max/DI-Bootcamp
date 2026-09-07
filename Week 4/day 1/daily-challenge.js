const gameInfo = [
    {
        username: "john",
        team: "red",
        score: 5,
        items: ["ball", "book", "pen"]
    },
    {
        username: "becky",
        team: "blue",
        score: 10,
        items: ["tape", "backpack", "pen"]
    },
    {
        username: "susy",
        team: "red",
        score: 55,
        items: ["ball", "eraser", "pen"]
    },
    {
        username: "tyson",
        team: "green",
        score: 1,
        items: ["book", "pen"]
    }
];


// Exercise 1
// Get all usernames and add !


const usernames = [];

gameInfo.forEach(player => {
    usernames.push(player.username + "!");
});

console.log("Usernames:", usernames);


// Exercise 2
// Get usernames of players with score > 5


const winners = [];

gameInfo.forEach(player => {
    if (player.score > 5) {
        winners.push(player.username);
    }
});

console.log("Winners:", winners);


// Exercise 3
// Calculate total score


const totalScore = gameInfo.reduce((total, player) => {
    return total + player.score;
}, 0);

console.log("Total score:", totalScore);