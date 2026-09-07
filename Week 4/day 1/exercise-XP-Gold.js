// ========================================
// EXERCISE 4.1
// ========================================

const array = [[1], [2], [3], [[[4]]], [[[5]]]];

const flattenedArray = array.flat(2);

console.log(flattenedArray);


// ========================================
// EXERCISE 4.2
// ========================================

const greeting = [
    ["Hello", "young", "grasshopper!"],
    ["you", "are"],
    ["learning", "fast!"]
];

const newGreeting = greeting.map(sentence => sentence.join(" "));

console.log(newGreeting);


// ========================================
// EXERCISE 4.3
// ========================================

const greetingString = greeting
    .map(sentence => sentence.join(" "))
    .join(" ");

console.log(greetingString);


// ========================================
// EXERCISE 4.4
// ========================================

const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];

const result = trapped.flat(Infinity);

console.log(result);