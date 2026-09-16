
// EXERCISE 1: Advanced Access Modifiers
// and Inheritance
class Employee {
    public name: string;
    private age: number;
    protected salary: number;

    constructor(
        name: string,
        age: number,
        salary: number
    ) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    protected calculateBonus(): number {
        return this.salary * 0.10;
    }

    public getSalaryDetails(): string {
        return `Name: ${this.name}, Salary: $${this.salary}`;
    }

    public getAge(): number {
        return this.age;
    }
}

class Manager extends Employee {

    public getSalaryDetails(): string {
        const bonus = this.calculateBonus();

        return `Name: ${this.name}, Salary: $${this.salary}, Bonus: $${bonus}`;
    }
}

class ExecutiveManager extends Manager {

    public approveBudget(amount: number): string {
        return `${this.name} approved a budget of $${amount}`;
    }
}

const executive = new ExecutiveManager(
    "Alice",
    35,
    80000
);

console.log(executive.name);
console.log(executive.getSalaryDetails());
console.log(executive.getAge());
console.log(executive.approveBudget(500000));


// EXERCISE 2: Advanced Static Methods
// and Properties=

class Shape {
    public static totalShapes: number = 0;

    constructor() {
        Shape.totalShapes++;
    }

    public static getType(): string {
        return "Shape";
    }
}

class Circle extends Shape {
    public radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    public area(): number {
        return Math.PI * this.radius * this.radius;
    }

    public static getType(): string {
        return "Circle";
    }
}

class Square extends Shape {
    public side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    public area(): number {
        return this.side * this.side;
    }

    public static getType(): string {
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


// EXERCISE 3: Complex Interfaces
// with Function Types
interface Calculator {
    a: number;
    b: number;

    operate(
        operation: (a: number, b: number) => number
    ): number;
}

class AdvancedCalculator implements Calculator {
    public a: number;
    public b: number;

    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    public operate(
        operation: (a: number, b: number) => number
    ): number {
        return operation(this.a, this.b);
    }

    public add(): number {
        return this.operate((a, b) => a + b);
    }

    public subtract(): number {
        return this.operate((a, b) => a - b);
    }

    public multiply(): number {
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
    public readonly serialNumber: string;

    constructor(serialNumber: string) {
        this.serialNumber = serialNumber;
    }

    public getDeviceInfo(): string {
        return `Serial Number: ${this.serialNumber}`;
    }
}

class Laptop extends Device {
    public model: string;
    public price: number;

    constructor(
        serialNumber: string,
        model: string,
        price: number
    ) {
        super(serialNumber);

        this.model = model;
        this.price = price;
    }

    public getDeviceInfo(): string {
        return `Serial Number: ${this.serialNumber}, Model: ${this.model}, Price: $${this.price}`;
    }
}

const laptop = new Laptop(
    "SN-2026-001",
    "Dell XPS 15",
    1500
);

console.log(laptop.getDeviceInfo());

// Model and price can be changed
laptop.model = "Dell XPS 16";
laptop.price = 1800;

console.log(laptop.getDeviceInfo());



// EXERCISE 5: Multiple Interface Inheritance

interface Product {
    readonly name: string;
    price: number;
    discount?: number;
}

interface Electronics extends Product {
    warrantyPeriod: number;
}

class Smartphone implements Electronics {
    public readonly name: string;
    public price: number;
    public discount?: number;
    public warrantyPeriod: number;

    constructor(
        name: string,
        price: number,
        warrantyPeriod: number,
        discount?: number
    ) {
        this.name = name;
        this.price = price;
        this.warrantyPeriod = warrantyPeriod;
        this.discount = discount;
    }

    public getPriceAfterDiscount(): number {
        if (this.discount !== undefined) {
            return this.price - (this.price * this.discount / 100);
        }

        return this.price;
    }

    public getDetails(): string {
        return `Name: ${this.name}, Price: $${this.price}, Warranty: ${this.warrantyPeriod} months, Final Price: $${this.getPriceAfterDiscount()}`;
    }
}

const smartphone1 = new Smartphone(
    "Samsung Galaxy S25",
    1000,
    24,
    10
);

const smartphone2 = new Smartphone(
    "iPhone 17",
    1200,
    12
);

console.log(smartphone1.getDetails());
console.log(smartphone2.getDetails());
