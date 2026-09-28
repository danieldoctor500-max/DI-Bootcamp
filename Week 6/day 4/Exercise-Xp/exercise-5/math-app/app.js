const _ = require("lodash");
const { add, multiply } = require("./math");

const numbers = [10, 20, 30, 40];

const total = _.sum(numbers);
const largest = _.max(numbers);

console.log("Numbers:", numbers);
console.log("Sum using lodash:", total);
console.log("Largest number:", largest);

console.log("Addition:", add(10, 5));
console.log("Multiplication:", multiply(10, 5));