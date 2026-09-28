const { readFile, writeFile } = require("./fileManager");

const content = readFile("Hello World.txt");

console.log("Content from Hello World.txt:");
console.log(content);

writeFile("Bye World.txt", "Writing to the file");

console.log("Content successfully written to Bye World.txt.");