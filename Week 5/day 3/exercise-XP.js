// EXERCISE 1: Class with Access Modifiers
export class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}
const employee = new Employee("Alice", 50000, "Software Developer", "IT");
console.log(employee.getEmployeeInfo());
console.log(employee.position);
// EXERCISE 2: Readonly Properties
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return `${this.name} costs $${this.price}`;
    }
}
const product = new Product(101, "Laptop", 1200);
console.log(product.getProductInfo());
console.log(product.id);
// EXERCISE 3: Class Inheritance
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return "Some animal sound";
    }
}
class Dog extends Animal {
    makeSound() {
        return "bark";
    }
}
const dog = new Dog("Buddy");
console.log(dog.name);
console.log(dog.makeSound());
// EXERCISE 4: Static Properties and Methods
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));
function printUserDetails(user) {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    }
}
const premiumUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    membershipLevel: "Gold"
};
const regularUser = {
    id: 2,
    name: "Bob",
    email: "bob@example.com"
};
printUserDetails(premiumUser);
printUserDetails(regularUser);
