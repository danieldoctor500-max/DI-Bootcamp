import { greet } from "./greeting.js";
import { displayMessage } from "./colorful-message.js";
import { readFile } from "./read-file.js";

const message = greet("Daniel");

console.log(message);

displayMessage();

readFile();