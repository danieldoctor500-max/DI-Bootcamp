//1: Hello World
console.log("Hello World");
const age = 25;
const name = "Alice";
console.log(age);
console.log(name);
//3: Union Types
let id;
id = 101;
console.log(id);
id = "USER-101";
console.log(id);
//:4 if...else
function checkNumber(number) {
    if (number > 0) {
        return "Positive";
    }
    else if (number < 0) {
        return "Negative";
    }
    else {
        return "Zero";
    }
}
console.log(checkNumber(10));
console.log(checkNumber(-5));
console.log(checkNumber(0));
//5: Tuples type
function getDetails(name, age) {
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, greeting];
}
const details = getDetails("Alice", 25);
console.log(details);
function createPerson(name, age) {
    return {
        name: name,
        age: age
    };
}
const person = createPerson("Alice", 25);
console.log(person);
//7: Switch
function getAction(role) {
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
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(greet("Alice"));
console.log(greet());
export {};
