//2: Tenary Operator
const winBattle = () => true;

const experiencePoints = winBattle() ? 10 : 1;

console.log(experiencePoints); // 10


//3:Is it a string?
const isString = (value) => typeof value === "string";

console.log(isString("hello")); // true
console.log(isString([1, 2, 4, 0])); // false


//4: Find the sum
const sum = (x, y) => x + y;

console.log(sum(3, 7)); // 10


//5: Kg and Grams
// Function declaration
function toGramsDecl(kg) {
    return kg * 1000;
}
console.log(toGramsDecl(5)); // 5000

// Function expression
const toGramsExpr = function(kg) {
    return kg * 1000;
};
console.log(toGramsExpr(3)); // 3000

// Difference: Declaration is hoisted, expression is not.

// Arrow function
const toGramsArrow = (kg) => kg * 1000;
console.log(toGramsArrow(2)); // 2000


//6: Fortune Teller
(function(children, partner, location, job) {
    const sentence = `You will be a ${job} in ${location}, and married to ${partner} with ${children} kids.`;
    document.body.innerHTML += `<p>${sentence}</p>`;
})(3, "Alice", "Nairobi", "Developer");


//7: Welcome
// The JavaScript expects this element in the HTML:
// <nav id="navbar"></nav>

(function(userName) {

    const navbar = document.getElementById("navbar");

    const userDiv = document.createElement("div");

    userDiv.innerHTML = `
        <span>Welcome, ${userName}</span>
        <img
            src="https://via.placeholder.com/40"
            alt="Profile picture"
            width="40"
            height="40"
        >
    `;

    navbar.appendChild(userDiv);

})("John");


//8: Juice Bar
function makeJuice(size) {

    function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {

        const message =
            `The client wants a ${size} drink juice, ` +
            `containing ${firstIngredient}, ${secondIngredient}, ` +
            `${thirdIngredient}.`;

        document.body.innerHTML += `<p>${message}</p>`;
    }

    // Invoke the inner function once
    addIngredients("apple", "banana", "mango");
}

// Invoke the outer function globally
makeJuice("medium");

function makeJuicePartTwo(size) {

    // Empty array for the ingredients
    const ingredients = [];

    function addIngredients(firstIngredient, secondIngredient, thirdIngredient) {

        ingredients.push(
            firstIngredient,
            secondIngredient,
            thirdIngredient
        );
    }

    function displayJuice() {

        const message =
            `The client wants a ${size} drink juice, ` +
            `containing ${ingredients.join(", ")}.`;

        document.body.innerHTML += `<p>${message}</p>`;
    }

    // Add the first 3 ingredients
    addIngredients("apple", "banana", "mango");

    // Add the second 3 ingredients
    addIngredients("orange", "pineapple", "strawberry");

    // Display all 6 ingredients
    displayJuice();
}

// Invoke makeJuice globally
makeJuicePartTwo("large");