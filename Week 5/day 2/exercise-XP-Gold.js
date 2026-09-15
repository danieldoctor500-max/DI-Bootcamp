"use strict";
// Exercise 1: Union Types
function processValue(value) {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    }
    return value.split("").reverse().join("");
}
console.log(processValue(100));
console.log(processValue(250.5));
console.log(processValue("Hello"));
console.log(processValue("TypeScript"));
// Exercise 2: Array Type Annotations
function sumNumbersInArray(values) {
    let total = 0;
    for (const value of values) {
        if (typeof value === "number") {
            total += value;
        }
    }
    return total;
}
console.log(sumNumbersInArray([10, "hello", 20, "world", 30]));
console.log(sumNumbersInArray([5, 10, 15]));
console.log(sumNumbersInArray(["one", "two", "three"]));
function introduceAdvancedUser(user) {
    if (user.address) {
        return `Hello, my name is ${user.name}, I am ${user.age} years old, and I live at ${user.address}.`;
    }
    return `Hello, my name is ${user.name}, and I am ${user.age} years old.`;
}
const userWithAddress = {
    name: "Alice",
    age: 25,
    address: "Nairobi, Kenya"
};
const userWithoutAddress = {
    name: "Bob",
    age: 30
};
console.log(introduceAdvancedUser(userWithAddress));
console.log(introduceAdvancedUser(userWithoutAddress));
// Exercise 4: Optional Parameters
function welcomeUser(name, greeting) {
    const finalGreeting = greeting ?? "Hello";
    return `${finalGreeting}, ${name}!`;
}
console.log(welcomeUser("Alice"));
console.log(welcomeUser("Bob", "Welcome"));
