// EXERCISE 1: Class Inheritance with Protected
// Access Modifiers
export class Employee {
    name;
    salary;
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    }
    getDetails() {
        return `Name: ${this.name}, Salary: $${this.salary}`;
    }
}
class Manager extends Employee {
    department;
    constructor(name, salary, department) {
        super(name, salary);
        this.department = department;
    }
    getDetails() {
        return `Name: ${this.name}, Salary: $${this.salary}, Department: ${this.department}`;
    }
}
const manager = new Manager("Alice", 60000, "IT");
console.log(manager.getDetails());
// EXERCISE 2: Using Readonly with Access Modifiers
class Car {
    make;
    model;
    year;
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    getCarDetails() {
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`;
    }
}
const car = new Car("Toyota", "Corolla", 2024);
console.log(car.getCarDetails());
console.log(car.make);
console.log(car.year);
// EXERCISE 3: Static Properties and Methods
class MathUtils {
    static PI = 3.14159;
    static circumference(radius) {
        return 2 * MathUtils.PI * radius;
    }
}
console.log(MathUtils.PI);
console.log(MathUtils.circumference(5));
class Addition {
    calculate(a, b) {
        return a + b;
    }
}
class Multiplication {
    calculate(a, b) {
        return a * b;
    }
}
const addition = new Addition();
const multiplication = new Multiplication();
console.log(addition.calculate(10, 5));
console.log(multiplication.calculate(10, 5));
class RectangleShape {
    color;
    width;
    height;
    constructor(color, width, height) {
        this.color = color;
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}
const rectangle = new RectangleShape("Blue", 10, 5);
console.log(`Color: ${rectangle.color}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
