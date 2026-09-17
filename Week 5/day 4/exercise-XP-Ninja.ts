// EXERCISE 1: GENERICS AND INTERSECTION TYPES

type Identifiable = {
    id: number;
};

type Describable = {
    description: string;
};

type ContainerItem = Identifiable & Describable;

class Container<T extends ContainerItem> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public remove(): T | undefined {
        return this.items.pop();
    }

    public list(): T[] {
        return this.items;
    }
}

const container = new Container<ContainerItem>();

container.add({
    id: 1,
    description: "Laptop"
});

container.add({
    id: 2,
    description: "Keyboard"
});

container.add({
    id: 3,
    description: "Mouse"
});

console.log("Container items:");
console.log(container.list());

console.log("Removed item:");
console.log(container.remove());

console.log("Remaining items:");
console.log(container.list());


// EXERCISE 2: GENERIC INTERFACES
// AND TYPE CASTING

interface Response<T> {
    status: number;
    data: T;
}

function parseResponse<T>(
    response: Response<unknown>
): T {
    return response.data as T;
}

const userResponse: Response<unknown> = {
    status: 200,
    data: {
        name: "Alice",
        age: 25
    }
};

const userData = parseResponse<{
    name: string;
    age: number;
}>(userResponse);

console.log("User data:");
console.log(userData);
console.log(userData.name);
console.log(userData.age);


const productResponse: Response<unknown> = {
    status: 200,
    data: {
        id: 101,
        name: "Laptop",
        price: 1200
    }
};

const productData = parseResponse<{
    id: number;
    name: string;
    price: number;
}>(productResponse);

console.log("Product data:");
console.log(productData);
console.log(productData.name);
console.log(productData.price);


// EXERCISE 3: GENERIC CLASSES
// AND TYPE ASSERTIONS

class Repository<T> {
    private items: T[] = [];

    public add(item: T): void {
        this.items.push(item);
    }

    public retrieve(index: number): T | undefined {
        const item = this.items[index];

        return item as T | undefined;
    }

    public list(): T[] {
        return this.items;
    }
}


// Repository with strings

const userRepository = new Repository<string>();

userRepository.add("Alice");
userRepository.add("Bob");
userRepository.add("Charlie");

console.log("User repository:");
console.log(userRepository.list());

console.log("Retrieved user:");
console.log(userRepository.retrieve(1));


// Repository with numbers

const numberRepository = new Repository<number>();

numberRepository.add(100);
numberRepository.add(200);
numberRepository.add(300);

console.log("Number repository:");
console.log(numberRepository.list());

console.log("Retrieved number:");
console.log(numberRepository.retrieve(0));


// Repository with objects

type Product = {
    id: number;
    name: string;
    price: number;
};

const productRepository = new Repository<Product>();

productRepository.add({
    id: 1,
    name: "Laptop",
    price: 1200
});

productRepository.add({
    id: 2,
    name: "Phone",
    price: 800
});

console.log("Product repository:");
console.log(productRepository.list());

console.log("Retrieved product:");
console.log(productRepository.retrieve(0));