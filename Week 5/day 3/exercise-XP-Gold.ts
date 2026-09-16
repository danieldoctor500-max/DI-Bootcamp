// EXERCISE 1: Class Inheritance with Protected
// Access Modifiers
export
class Employee {
    protected name: string;
    protected salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public getDetails(): string {
        return `Name: ${this.name}, Salary: $${this.salary}`;
    }
}

class Manager extends Employee {
    public department: string;

    constructor(
        name: string,
        salary: number,
        department: string
    ) {
        super(name, salary);
        this.department = department;
    }

    public getDetails(): string {
        return `Name: ${this.name}, Salary: $${this.salary}, Department: ${this.department}`;
    }
}

const manager = new Manager(
    "Alice",
    60000,
    "IT"
);

console.log(manager.getDetails());


// EXERCISE 2: Using Readonly with Access Modifiers

class Car {
    public readonly make: string;
    private readonly model: string;
    public year: number;

    constructor(
        make: string,
        model: string,
        year: number
    ) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    public getCarDetails(): string {
        return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}`;
    }
}

const car = new Car(
    "Toyota",
    "Corolla",
    2024
);

console.log(car.getCarDetails());
console.log(car.make);
console.log(car.year);



// EXERCISE 3: Static Properties and Methods

class MathUtils {
    public static PI: number = 3.14159;

    public static circumference(radius: number): number {
        return 2 * MathUtils.PI * radius;
    }
}

console.log(MathUtils.PI);
console.log(MathUtils.circumference(5));


// EXERCISE 4: Interface with Function Types

interface Operation {
    calculate(a: number, b: number): number;
}

class Addition implements Operation {
    public calculate(a: number, b: number): number {
        return a + b;
    }
}

class Multiplication implements Operation {
    public calculate(a: number, b: number): number {
        return a * b;
    }
}

const addition = new Addition();
const multiplication = new Multiplication();

console.log(addition.calculate(10, 5));
console.log(multiplication.calculate(10, 5));



// EXERCISE 5: Extending Interfaces with


interface Shape {
    color: string;
    getArea(): number;
}

interface Rectangle extends Shape {
    readonly width: number;
    readonly height: number;
    getPerimeter(): number;
}

class RectangleShape implements Rectangle {
    public color: string;
    public readonly width: number;
    public readonly height: number;

    constructor(
        color: string,
        width: number,
        height: number
    ) {
        this.color = color;
        this.width = width;
        this.height = height;
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const rectangle = new RectangleShape(
    "Blue",
    10,
    5
);

console.log(`Color: ${rectangle.color}`);
console.log(`Area: ${rectangle.getArea()}`);
console.log(`Perimeter: ${rectangle.getPerimeter()}`);
