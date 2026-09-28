const { Command } = require("commander");

const greet = require("./commands/greet");
const fetchData = require("./commands/fetch");
const readFile = require("./commands/read");

const program = new Command();

program
    .name("ninja-utility")
    .description("A simple Node.js command-line utility")
    .version("1.0.0");

program
    .command("greet")
    .description("Display a greeting")
    .option("-n, --name <name>", "Name to greet")
    .action((options) => {
        greet(options.name);
    });

program
    .command("fetch")
    .description("Fetch data from an API")
    .action(() => {
        fetchData();
    });

program
    .command("read")
    .description("Read the contents of a file")
    .argument("<file>", "File to read")
    .action((file) => {
        readFile(file);
    });

program.parse();