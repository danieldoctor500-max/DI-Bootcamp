import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readFile() {
    const filePath = path.join(__dirname, "files", "file-data.txt");

    try {
        const content = fs.readFileSync(filePath, "utf8");

        console.log("File content:");
        console.log(content);
    } catch (error) {
        console.log("Error reading file:", error.message);
    }
}

export { readFile };