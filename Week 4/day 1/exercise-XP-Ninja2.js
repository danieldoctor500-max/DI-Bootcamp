// Exercise 1: Menu

const menu = [
    {
        type: "starter",
        name: "Houmous with Pita"
    },
    {
        type: "starter",
        name: "Vegetable Soup with Houmous peas"
    },
    {
        type: "dessert",
        name: "Chocolate Cake"
    }
];


// 1. Is there at least one dessert?

const hasDessert = menu.some(item => item.type === "dessert")
    ? "There is a dessert"
    : "There is no dessert";

console.log("1. Dessert:", hasDessert);


// 2. Are all items starters?

const allStarters = menu.every(item => item.type === "starter");

console.log("2. All starters:", allStarters);


// 3. Is there a main course?

const hasMainCourse = menu.some(item => item.type === "main");

if (!hasMainCourse) {
    menu.push({
        type: "main",
        name: "Grilled Chicken"
    });
}


// 4. Add vegetarian property

const vegetarian = [
    "vegetable",
    "houmous",
    "eggs",
    "vanilla",
    "potatoes"
];

menu.forEach(item => {
    item.vegetarian = vegetarian.some(word =>
        item.name.toLowerCase().includes(word.toLowerCase())
    );
});

console.log("4. Final menu:", menu);



// Exercise 2: Chop into chunks


function string_chop(string, size) {
    const result = [];

    for (let i = 0; i < string.length; i += size) {
        result.push(string.slice(i, i + size));
    }

    return result;
}

console.log(
    "Exercise 2:",
    string_chop("developers", 2)
);


// Exercise 3: Search word


function search_word(string, word) {
    const regex = new RegExp(word, "gi");
    const matches = string.match(regex);

    const count = matches ? matches.length : 0;

    return `"${word}" was found ${count} times.`;
}

console.log(
    "Exercise 3:",
    search_word("The quick brown fox", "fox")
);

// Exercise 4: Reverse Array

function reverseArray(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {

        const opposite = array.length - 1 - i;

        const temp = array[i];

        array[i] = array[opposite];
        array[opposite] = temp;
    }

    return array;
}

console.log(
    "Exercise 4:",
    reverseArray([1, 2, 3, 4, 5])
);

console.log(
    "Exercise 4:",
    reverseArray([1, 2])
);

console.log(
    "Exercise 4:",
    reverseArray([])
);

console.log(
    "Exercise 4:",
    reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
);