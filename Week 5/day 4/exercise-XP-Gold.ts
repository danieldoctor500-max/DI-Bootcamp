// EXERCISE 1: INTERSECTION TYPES
// WITH TYPE GUARDS

interface User {
    name: string;
    email: string;
}

interface Admin {
    adminLevel: number;
}

type AdminUser = User & Admin;

function getProperty(
    user: AdminUser,
    propertyName: string
): string | number | undefined {

    if (propertyName in user) {
        return user[propertyName as keyof AdminUser];
    }

    return undefined;
}

const adminUser: AdminUser = {
    name: "Alice",
    email: "alice@example.com",
    adminLevel: 5
};

console.log(getProperty(adminUser, "name"));
console.log(getProperty(adminUser, "email"));
console.log(getProperty(adminUser, "adminLevel"));
console.log(getProperty(adminUser, "age"));


// EXERCISE 2: TYPE CASTING WITH GENERICS


function castToType<T>(
    value: unknown,
    constructor: (value: unknown) => T
): T {
    return constructor(value);
}

const numberValue = castToType(
    "123",
    Number
);

const booleanValue = castToType(
    "true",
    Boolean
);

console.log(numberValue);
console.log(typeof numberValue);

console.log(booleanValue);
console.log(typeof booleanValue);


// EXERCISE 3: TYPE ASSERTIONS
// WITH GENERIC CONSTRAINTS


function getArrayLength<T extends number | string>(
    array: T[]
): number {
    const items = array as T[];

    return items.length;
}

const numbers: number[] = [
    10,
    20,
    30,
    40
];

const words: string[] = [
    "Apple",
    "Banana",
    "Orange"
];

console.log(getArrayLength(numbers));
console.log(getArrayLength(words));


// EXERCISE 4: GENERIC INTERFACES
// WITH CLASS IMPLEMENTATION

interface Storage<T> {
    add(item: T): void;
    get(index: number): T | undefined;
}

class Box<T> implements Storage<T> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public get(index: number): T | undefined {
        return this.items[index];
    }
}


// Storage for strings

const stringBox = new Box<string>();

stringBox.add("Apple");
stringBox.add("Banana");
stringBox.add("Orange");

console.log(stringBox.get(0));
console.log(stringBox.get(1));


// Storage for numbers

const numberBox = new Box<number>();

numberBox.add(100);
numberBox.add(200);
numberBox.add(300);

console.log(numberBox.get(0));
console.log(numberBox.get(2));


// EXERCISE 5: GENERIC CLASSES
// WITH CONSTRAINTS


interface Item<T> {
    value: T;
}

class Queue<T> {
    private items: Item<T>[] = [];

    public add(item: Item<T>): void {
        this.items.push(item);
    }

    public remove(): Item<T> | undefined {
        return this.items.shift();
    }
}


// Queue with numbers

const numberQueue = new Queue<number>();

numberQueue.add({ value: 10 });
numberQueue.add({ value: 20 });
numberQueue.add({ value: 30 });

console.log(numberQueue.remove());
console.log(numberQueue.remove());


// Queue with strings

const stringQueue = new Queue<string>();

stringQueue.add({ value: "Apple" });
stringQueue.add({ value: "Banana" });
stringQueue.add({ value: "Orange" });

console.log(stringQueue.remove());
console.log(stringQueue.remove());