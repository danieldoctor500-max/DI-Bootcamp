// Exercise 1: Conditional Types

type MappedType<T> = T extends number ? number : T extends string ? number : never;

function mapType<T extends number | string>(value: T): MappedType<T> {
    if (typeof value === "number") {
        return (value * value) as MappedType<T>;
    }

    return value.length as MappedType<T>;
}

console.log(mapType(5));
console.log(mapType("Hello"));


// Exercise 2: Keyof and Lookup Types

function getProperty<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}

const user = {
    name: "Alice",
    age: 25,
    city: "Nairobi"
};

console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));
console.log(getProperty(user, "city"));


// Exercise 3: Interfaces with Numeric Properties

interface HasNumericProperty {
    [key: string]: number;
}

function multiplyProperty<T extends HasNumericProperty>(
    object: T,
    key: keyof T,
    factor: number
): number {
    return object[key] * factor;
}

const product = {
    price: 100,
    quantity: 5,
    discount: 10
};

console.log(multiplyProperty(product, "price", 2));
console.log(multiplyProperty(product, "quantity", 3));
console.log(multiplyProperty(product, "discount", 4));