// EXERCISE 1: Class with Access Modifiers
export 
class Employee {
    private name: string;
    private salary: number;
    public position: string;
    protected department: string;

    constructor(
        name: string,
        salary: number,
        position: string,
        department: string
    ) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }

    public getEmployeeInfo(): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}

const employee = new Employee(
    "Alice",
    50000,
    "Software Developer",
    "IT"
);

console.log(employee.getEmployeeInfo());
console.log(employee.position);

// EXERCISE 2: Readonly Properties


class Product {
    readonly id: number;
    public name: string;
    public price: number;

    constructor(
        id: number,
        name: string,
        price: number
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public getProductInfo(): string {
        return `${this.name} costs $${this.price}`;
    }
}

const product = new Product(
    101,
    "Laptop",
    1200
);

console.log(product.getProductInfo());
console.log(product.id);


// EXERCISE 3: Class Inheritance


class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public makeSound(): string {
        return "Some animal sound";
    }
}

class Dog extends Animal {
    public makeSound(): string {
        return "bark";
    }
}

const dog = new Dog("Buddy");

console.log(dog.name);
console.log(dog.makeSound());


// EXERCISE 4: Static Properties and Methods


class Calculator {
    public static add(a: number, b: number): number {
        return a + b;
    }

    public static subtract(a: number, b: number): number {
        return a - b;
    }
}

console.log(Calculator.add(10, 5));
console.log(Calculator.subtract(10, 5));


// EXERCISE 5: Extending Interfaces


interface User {
    readonly id: number;
    name: string;
    email: string;
}

interface PremiumUser extends User {
    membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
    console.log(`ID: ${user.id}`);
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);

    if (user.membershipLevel) {
        console.log(`Membership Level: ${user.membershipLevel}`);
    }
}

const premiumUser: PremiumUser = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    membershipLevel: "Gold"
};

const regularUser: PremiumUser = {
    id: 2,
    name: "Bob",
    email: "bob@example.com"
};

printUserDetails(premiumUser);
printUserDetails(regularUser);

