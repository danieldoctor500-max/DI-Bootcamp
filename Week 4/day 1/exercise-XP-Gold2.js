//1: Sum Elements
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((total, number) => {
    return total + number;
}, 0);

console.log(sum);


//2: Remove Duplicates
const numbersi = [1, 2, 2, 3, 4, 4, 5, 5];

const uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers);


//3: Remove Certain Values
const array = [NaN, 0, 15, false, -22, "", undefined, 47, null];

const result = array.filter(value => value);

console.log(result);


//4: Reapet Please!
function repeat(string, n = 1) {
    let result = "";

    for (let i = 0; i < n; i++) {
        result += string;
    }

    return result;
}

console.log(repeat("Ha!", 3));


//5: Turtle & Rabbit
const startLine = '     ||<- Start line';
let turtle = '       ';
let rabbit = '       ';

console.log(startLine);
console.log(turtle);
console.log(rabbit);


