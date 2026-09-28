const fs = require("fs");

function readFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, "utf8");

        console.log("File content:");
        console.log(content);
    } catch (error) {
        console.log("Error reading file:", error.message);
    }
}

module.exports = readFile;