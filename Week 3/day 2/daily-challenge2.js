// Ask the user for words separated by commas
let input = prompt("Enter several words separated by commas:");

// Convert the input into an array
let words = input.split(",").map(word => word.trim());

// Find the longest word
let longestWord = 0;

for (let word of words) {
    if (word.length > longestWord) {
        longestWord = word.length;
    }
}

// Create the border
let border = "*".repeat(longestWord + 4);

// Display the top border
console.log(border);

// Display each word
for (let word of words) {
    console.log(`* ${word.padEnd(longestWord)} *`);
}

// Display the bottom border
console.log(border);