//1: Hello World
console.log("Hello World");


//2: Type Annotations
export {}; // This line is to ensure the file is treated as a module
const age: number = 25;
const name: string = "Alice";

console.log(age);
console.log(name);


//3: Union Types
let id: string | number;

id = 101;
console.log(id);

id = "USER-101";
console.log(id);


//:4 if...else
    function checkNumber(number: number): string {
    if (number > 0) {
        return "Positive";
    } else if (number < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}

console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));


//5: Tuples type
function getDetails(
    name: string,
    age: number
): [string, number, string] {
    const greeting = `Hello, ${name}! You are ${age} years old.`;

    return [name, age, greeting];
}

const details = getDetails("Alice", 25);

console.log(details);


//6:Object Type Annotations
type Person = {
    name: string;
    age: number;
};

function createPerson(name: string, age: number): Person {
    return {
        name: name,
        age: age
    };
}

const person = createPerson("Alice", 25);

console.log(person);


//7: Switch
function getAction(role: string): string {
    switch (role) {
        case "admin":
            return "Manage users and settings";

        case "editor":
            return "Edit content";

        case "viewer":
            return "View content";

        case "guest":
            return "Limited access";

        default:
            return "Invalid role";
    }
}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("viewer"));
console.log(getAction("guest"));
console.log(getAction("unknown"));


//8: Function overloading
function greet(): string;
function greet(name: string): string;

function greet(name: string = "Guest"): string {
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet());