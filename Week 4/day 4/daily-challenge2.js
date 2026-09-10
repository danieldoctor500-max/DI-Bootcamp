const readline = require("readline");


// ============================================================
// MORSE JSON
// ============================================================

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;


// ============================================================
// 1. toJs()
// Converts the Morse JSON string into a JavaScript object
// ============================================================

function toJs() {

    return new Promise((resolve, reject) => {

        try {

            const morseJS = JSON.parse(morse);

            if (Object.keys(morseJS).length === 0) {

                reject("The Morse object is empty.");

            } else {

                resolve(morseJS);

            }

        } catch (error) {

            reject("The Morse JSON is invalid.");

        }

    });

}


// ============================================================
// 2. toMorse()
// Gets a word/sentence from the user and translates it
// ============================================================

function toMorse(morseJS) {

    return new Promise((resolve, reject) => {

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Enter a word or sentence: ", (userInput) => {

            rl.close();

            if (!userInput || userInput.trim() === "") {

                reject("Please enter a word or sentence.");
                return;

            }

            const morseTranslation = [];

            for (let character of userInput.toLowerCase()) {

                // Ignore spaces
                if (character === " ") {
                    continue;
                }

                // Check if character exists
                if (!morseJS.hasOwnProperty(character)) {

                    reject(
                        `The character "${character}" does not exist in the Morse object.`
                    );

                    return;

                }

                morseTranslation.push(morseJS[character]);

            }

            resolve(morseTranslation);

        });

    });

}


// ============================================================
// 3. joinWords()
// Joins the Morse translation using line breaks
// ============================================================

function joinWords(morseTranslation) {

    console.log("\nMorse Translation:\n");

    console.log(morseTranslation.join("\n"));

}


// ============================================================
// 4. CHAIN THE THREE FUNCTIONS
// ============================================================

toJs()

    .then(morseJS => {
        return toMorse(morseJS);
    })

    .then(morseTranslation => {
        joinWords(morseTranslation);
    })

    .catch(error => {
        console.log("\nError:", error);
    });