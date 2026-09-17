
// DAILY CHALLENGE: TYPE GUARD WITH UNION TYPES
export
type User = {
    type: "user";
    name: string;
    age: number;
};

type Product = {
    type: "product";
    id: number;
    price: number;
};

type Order = {
    type: "order";
    orderId: string;
    amount: number;
};



function isUser(data: User | Product | Order): data is User {
    return data.type === "user";
}

function isProduct(data: User | Product | Order): data is Product {
    return data.type === "product";
}

function isOrder(data: User | Product | Order): data is Order {
    return data.type === "order";
}


function handleData(
    data: (User | Product | Order)[]
): string[] {

    return data.map((item) => {

        if (isUser(item)) {
            return `Hello ${item.name}, you are ${item.age} years old.`;
        }

        if (isProduct(item)) {
            return `Product ID: ${item.id}, Price: $${item.price}`;
        }

        if (isOrder(item)) {
            return `Order ID: ${item.orderId}, Amount: $${item.amount}`;
        }

        return "Unknown data type.";
    });
}


const data: (User | Product | Order)[] = [

    {
        type: "user",
        name: "Alice",
        age: 25
    },

    {
        type: "product",
        id: 101,
        price: 500
    },

    {
        type: "order",
        orderId: "ORD-001",
        amount: 750
    },

    {
        type: "user",
        name: "Bob",
        age: 30
    },

    {
        type: "product",
        id: 102,
        price: 1200
    },

    {
        type: "order",
        orderId: "ORD-002",
        amount: 1500
    }
];

const results = handleData(data);

console.log(results);



results.forEach((result) => {
    console.log(result);
});