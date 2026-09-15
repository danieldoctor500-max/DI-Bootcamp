"use strict";
// Exercise 1: Conditional Types
function mapType(value) {
    if (typeof value === "number") {
        return (value * value);
    }
    return value.length;
}
console.log(mapType(5));
console.log(mapType("Hello"));
// Exercise 2: Keyof and Lookup Types
function getProperty(object, key) {
    return object[key];
}
const user = {
    name: "Alice",
    age: 25,
    city: "Nairobi"
};
console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));
console.log(getProperty(user, "city"));
function multiplyProperty(object, key, factor) {
    return object[key] * factor;
}
const product = {
    price: 100,
    quantity: 5,
    discount: 10
};
console.log(multiplyProperty(product, "price", 2));
console.log(multiplyProperty(product, "quantity", 3));
console.log(multiplyProperty(product, "discount", 4));
