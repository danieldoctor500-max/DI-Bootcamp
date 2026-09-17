"use strict";
// EXERCISE 1: INTERSECTION TYPES
// WITH TYPE GUARDS
function getProperty(user, propertyName) {
    if (propertyName in user) {
        return user[propertyName];
    }
    return undefined;
}
const adminUser = {
    name: "Alice",
    email: "alice@example.com",
    adminLevel: 5
};
console.log(getProperty(adminUser, "name"));
console.log(getProperty(adminUser, "email"));
console.log(getProperty(adminUser, "adminLevel"));
console.log(getProperty(adminUser, "age"));
// EXERCISE 2: TYPE CASTING WITH GENERICS
function castToType(value, constructor) {
    return constructor(value);
}
const numberValue = castToType("123", Number);
const booleanValue = castToType("true", Boolean);
console.log(numberValue);
console.log(typeof numberValue);
console.log(booleanValue);
console.log(typeof booleanValue);
// EXERCISE 3: TYPE ASSERTIONS
// WITH GENERIC CONSTRAINTS
function getArrayLength(array) {
    const items = array;
    return items.length;
}
const numbers = [
    10,
    20,
    30,
    40
];
const words = [
    "Apple",
    "Banana",
    "Orange"
];
console.log(getArrayLength(numbers));
console.log(getArrayLength(words));
class Box {
    items = [];
    add(item) {
        this.items.push(item);
    }
    get(index) {
        return this.items[index];
    }
}
// Storage for strings
const stringBox = new Box();
stringBox.add("Apple");
stringBox.add("Banana");
stringBox.add("Orange");
console.log(stringBox.get(0));
console.log(stringBox.get(1));
// Storage for numbers
const numberBox = new Box();
numberBox.add(100);
numberBox.add(200);
numberBox.add(300);
console.log(numberBox.get(0));
console.log(numberBox.get(2));
class Queue {
    items = [];
    add(item) {
        this.items.push(item);
    }
    remove() {
        return this.items.shift();
    }
}
// Queue with numbers
const numberQueue = new Queue();
numberQueue.add({ value: 10 });
numberQueue.add({ value: 20 });
numberQueue.add({ value: 30 });
console.log(numberQueue.remove());
console.log(numberQueue.remove());
// Queue with strings
const stringQueue = new Queue();
stringQueue.add({ value: "Apple" });
stringQueue.add({ value: "Banana" });
stringQueue.add({ value: "Orange" });
console.log(stringQueue.remove());
console.log(stringQueue.remove());
