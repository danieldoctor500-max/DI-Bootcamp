const fs = require("fs");

const files = fs.readdirSync(".");

console.log("Files in this directory:");

files.forEach(file => {
    console.log(file);
});