const fs = require("fs");

const sourceFile = "source.txt";
const destinationFile = "destination.txt";

const content = fs.readFileSync(sourceFile, "utf8");

fs.writeFileSync(destinationFile, content);

console.log("File copied successfully.");