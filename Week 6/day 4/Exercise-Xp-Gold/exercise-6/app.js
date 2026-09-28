const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your full name: ", (fullName) => {
    const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

    if (namePattern.test(fullName)) {
        console.log("Valid name.");
    } else {
        console.log("Invalid name.");
    }

    rl.close();
});