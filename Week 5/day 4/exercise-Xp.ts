// EXERCISE 1: INTERSECTION TYPES

type Person = {
    name: string;
    age: number;
};

type Address = {
    street: string;
    city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
    name: "Alice",
    age: 25,
    street: "Moi Avenue",
    city: "Nairobi"
};

console.log(personWithAddress);


// EXERCISE 2: TYPE GUARDS WITH UNION TYPES

function describeValue(value: number | string): string {
    if (typeof value === "number") {
        return "This is a number";
    } else {
        return "This is a string";
    }
}

console.log(describeValue(100));
console.log(describeValue("Hello"));


// EXERCISE 3: TYPE CASTING

let someValue: any = "Hello TypeScript";

let stringValue: string = someValue as string;

console.log(stringValue);
console.log(stringValue.toUpperCase());


// EXERCISE 4: TYPE ASSERTIONS WITH UNION TYPES

function getFirstElement(
    array: (number | string)[]
): string {
    return array[0] as string;
}

const mixedArray1: (number | string)[] = [
    "Hello",
    100,
    "World"
];

const mixedArray2: (number | string)[] = [
    "TypeScript",
    50,
    75
];

console.log(getFirstElement(mixedArray1));
console.log(getFirstElement(mixedArray2));


// EXERCISE 5: GENERIC CONSTRAINTS

function logLength<T extends { length: number }>(value: T): void {
    console.log(`Length: ${value.length}`);
}

logLength("Hello");

logLength([1, 2, 3, 4, 5]);

logLength(["Apple", "Banana", "Orange"]);



// EXERCISE 6: INTERSECTION TYPES
// AND TYPE GUARDS

type Job = {
    position: string;
    department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
    if (employee.position === "Manager") {
        return `${employee.name} is a Manager in the ${employee.department} department.`;
    }

    if (employee.position === "Developer") {
        return `${employee.name} is a Developer in the ${employee.department} department.`;
    }

    return `${employee.name} works as a ${employee.position} in the ${employee.department} department.`;
}

const manager: Employee = {
    name: "Alice",
    age: 35,
    position: "Manager",
    department: "IT"
};

const developer: Employee = {
    name: "Bob",
    age: 28,
    position: "Developer",
    department: "Software Development"
};

console.log(describeEmployee(manager));
console.log(describeEmployee(developer));


// EXERCISE 7: TYPE ASSERTIONS
// AND GENERIC CONSTRAINTS


function formatInput<T extends { toString(): string }>(
    input: T
): string {
    const formattedInput = input.toString() as string;

    return formattedInput.trim();
}

console.log(formatInput("Hello TypeScript"));

console.log(formatInput(12345));

console.log(formatInput(true));