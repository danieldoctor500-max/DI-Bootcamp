import chalk from "chalk";

function displayMessage() {
    console.log(chalk.green.bold("Welcome to the Node.js Daily Challenge!"));
    console.log(chalk.blue("You are learning how Node.js modules work."));
}

export { displayMessage };