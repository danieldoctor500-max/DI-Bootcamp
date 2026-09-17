"use strict";
// EXERCISE 1: GENERICS AND INTERSECTION TYPES
class Container {
    items = [];
    add(item) {
        this.items.push(item);
    }
    remove() {
        return this.items.pop();
    }
    list() {
        return this.items;
    }
}
const container = new Container();
container.add({
    id: 1,
    description: "Laptop"
});
container.add({
    id: 2,
    description: "Keyboard"
});
container.add({
    id: 3,
    description: "Mouse"
});
console.log("Container items:");
console.log(container.list());
console.log("Removed item:");
console.log(container.remove());
console.log("Remaining items:");
console.log(container.list());
function parseResponse(response) {
    return response.data;
}
const userResponse = {
    status: 200,
    data: {
        name: "Alice",
        age: 25
    }
};
const userData = parseResponse(userResponse);
console.log("User data:");
console.log(userData);
console.log(userData.name);
console.log(userData.age);
const productResponse = {
    status: 200,
    data: {
        id: 101,
        name: "Laptop",
        price: 1200
    }
};
const productData = parseResponse(productResponse);
console.log("Product data:");
console.log(productData);
console.log(productData.name);
console.log(productData.price);
// EXERCISE 3: GENERIC CLASSES
// AND TYPE ASSERTIONS
class Repository {
    items = [];
    add(item) {
        this.items.push(item);
    }
    retrieve(index) {
        const item = this.items[index];
        return item;
    }
    list() {
        return this.items;
    }
}
// Repository with strings
const userRepository = new Repository();
userRepository.add("Alice");
userRepository.add("Bob");
userRepository.add("Charlie");
console.log("User repository:");
console.log(userRepository.list());
console.log("Retrieved user:");
console.log(userRepository.retrieve(1));
// Repository with numbers
const numberRepository = new Repository();
numberRepository.add(100);
numberRepository.add(200);
numberRepository.add(300);
console.log("Number repository:");
console.log(numberRepository.list());
console.log("Retrieved number:");
console.log(numberRepository.retrieve(0));
const productRepository = new Repository();
productRepository.add({
    id: 1,
    name: "Laptop",
    price: 1200
});
productRepository.add({
    id: 2,
    name: "Phone",
    price: 800
});
console.log("Product repository:");
console.log(productRepository.list());
console.log("Retrieved product:");
console.log(productRepository.retrieve(0));
