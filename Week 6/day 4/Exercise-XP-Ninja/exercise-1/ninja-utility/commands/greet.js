const chalk = require("chalk");

function greet(name = "Ninja") {
    console.log(chalk.green.bold(`Hello, ${name}!`));
    console.log(chalk.blue("Welcome to the Ninja Utility."));
}

module.exports = greet;