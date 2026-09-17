"use strict";
// EXERCISE 1: INTERSECTION TYPES
const personWithAddress = {
    name: "Alice",
    age: 25,
    street: "Moi Avenue",
    city: "Nairobi"
};
console.log(personWithAddress);

// EXERCISE 2: TYPE GUARDS WITH UNION TYPES
function describeValue(value) {
    if (typeof value === "number") {
        return "This is a number";
    }
    else {
        return "This is a string";
    }
}
console.log(describeValue(100));
console.log(describeValue("Hello"));
// EXERCISE 3: TYPE CASTING
let someValue = "Hello TypeScript";
let stringValue = someValue;
console.log(stringValue);
console.log(stringValue.toUpperCase());
// EXERCISE 4: TYPE ASSERTIONS WITH UNION TYPES
function getFirstElement(array) {
    return array[0];
}
const mixedArray1 = [
    "Hello",
    100,
    "World"
];
const mixedArray2 = [
    "TypeScript",
    50,
    75
];
console.log(getFirstElement(mixedArray1));
console.log(getFirstElement(mixedArray2));
// EXERCISE 5: GENERIC CONSTRAINTS
function logLength(value) {
    console.log(`Length: ${value.length}`);
}
logLength("Hello");
logLength([1, 2, 3, 4, 5]);
logLength(["Apple", "Banana", "Orange"]);
function describeEmployee(employee) {
    if (employee.position === "Manager") {
        return `${employee.name} is a Manager in the ${employee.department} department.`;
    }
    if (employee.position === "Developer") {
        return `${employee.name} is a Developer in the ${employee.department} department.`;
    }
    return `${employee.name} works as a ${employee.position} in the ${employee.department} department.`;
}
const manager = {
    name: "Alice",
    age: 35,
    position: "Manager",
    department: "IT"
};
const developer = {
    name: "Bob",
    age: 28,
    position: "Developer",
    department: "Software Development"
};
console.log(describeEmployee(manager));
console.log(describeEmployee(developer));
// EXERCISE 7: TYPE ASSERTIONS
// AND GENERIC CONSTRAINTS
function formatInput(input) {
    const formattedInput = input.toString();
    return formattedInput.trim();
}
console.log(formatInput("Hello TypeScript"));
console.log(formatInput(12345));
console.log(formatInput(true));
