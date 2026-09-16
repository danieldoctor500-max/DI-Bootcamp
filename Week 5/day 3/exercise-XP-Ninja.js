"use strict";
// EXERCISE 1: Advanced Access Modifiers
// and Inheritance
class Employee {
    name;
    age;
    salary;
    constructor(name, age, salary) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }
    calculateBonus() {
        return this.salary * 0.10;
    }
    getSalaryDetails() {
        return `Name: ${this.name}, Salary: $${this.salary}`;
    }
    getAge() {
        return this.age;
    }
}
class Manager extends Employee {
    getSalaryDetails() {
        const bonus = this.calculateBonus();
        return `Name: ${this.name}, Salary: $${this.salary}, Bonus: $${bonus}`;
    }
}
class ExecutiveManager extends Manager {
    approveBudget(amount) {
        return `${this.name} approved a budget of $${amount}`;
    }
}
const executive = new ExecutiveManager("Alice", 35, 80000);
console.log(executive.name);
console.log(executive.getSalaryDetails());
console.log(executive.getAge());
console.log(executive.approveBudget(500000));
// EXERCISE 2: Advanced Static Methods
// and Properties=
class Shape {
    static totalShapes = 0;
    constructor() {
        Shape.totalShapes++;
    }
    static getType() {
        return "Shape";
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    static getType() {
        return "Circle";
    }
}
class Square extends Shape {
    side;
    constructor(side) {
        super();
        this.side = side;
    }
    area() {
        return this.side * this.side;
    }
    static getType() {
        return "Square";
    }
}
const circle1 = new Circle(5);
const circle2 = new Circle(10);
const square1 = new Square(4);
console.log(Circle.getType());
console.log(Square.getType());
console.log(circle1.area());
console.log(circle2.area());
console.log(square1.area());
console.log(`Total shapes: ${Shape.totalShapes}`);
class AdvancedCalculator {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    operate(operation) {
        return operation(this.a, this.b);
    }
    add() {
        return this.operate((a, b) => a + b);
    }
    subtract() {
        return this.operate((a, b) => a - b);
    }
    multiply() {
        return this.operate((a, b) => a * b);
    }
}
const calculator = new AdvancedCalculator(20, 5);
console.log(calculator.add());
console.log(calculator.subtract());
console.log(calculator.multiply());
// EXERCISE 4: Readonly Properties
// in Complex Inheritance
class Device {
    serialNumber;
    constructor(serialNumber) {
        this.serialNumber = serialNumber;
    }
    getDeviceInfo() {
        return `Serial Number: ${this.serialNumber}`;
    }
}
class Laptop extends Device {
    model;
    price;
    constructor(serialNumber, model, price) {
        super(serialNumber);
        this.model = model;
        this.price = price;
    }
    getDeviceInfo() {
        return `Serial Number: ${this.serialNumber}, Model: ${this.model}, Price: $${this.price}`;
    }
}
const laptop = new Laptop("SN-2026-001", "Dell XPS 15", 1500);
console.log(laptop.getDeviceInfo());
// Model and price can be changed
laptop.model = "Dell XPS 16";
laptop.price = 1800;
console.log(laptop.getDeviceInfo());
class Smartphone {
    name;
    price;
    discount;
    warrantyPeriod;
    constructor(name, price, warrantyPeriod, discount) {
        this.name = name;
        this.price = price;
        this.warrantyPeriod = warrantyPeriod;
        this.discount = discount;
    }
    getPriceAfterDiscount() {
        if (this.discount !== undefined) {
            return this.price - (this.price * this.discount / 100);
        }
        return this.price;
    }
    getDetails() {
        return `Name: ${this.name}, Price: $${this.price}, Warranty: ${this.warrantyPeriod} months, Final Price: $${this.getPriceAfterDiscount()}`;
    }
}
const smartphone1 = new Smartphone("Samsung Galaxy S25", 1000, 24, 10);
const smartphone2 = new Smartphone("iPhone 17", 1200, 12);
console.log(smartphone1.getDetails());
console.log(smartphone2.getDetails());
