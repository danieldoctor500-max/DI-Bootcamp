//1: Random Numbers
const randomNumber = Math.floor(Math.random() * 100) + 1;

console.log("Random number:", randomNumber);

for (let i = 0; i <= randomNumber; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

//2: Capitalize Letters
function capitalize(str) {
    let evenIndex = "";
    let oddIndex = "";

    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            evenIndex += str[i].toUpperCase();
            oddIndex += str[i].toLowerCase();
        } else {
            evenIndex += str[i].toLowerCase();
            oddIndex += str[i].toUpperCase();
        }
    }

    return [evenIndex, oddIndex];
}

console.log(capitalize("abcdef"));

//3: - is Palindrome
function isPalindrome(str) {
    const reversed = str.split("").reverse().join("");

    return str === reversed;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("kayak"));
console.log(isPalindrome("bob"));

//4: Biggest Number
function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) {
        return 0;
    }

    let biggest = 0;

    for (let i = 0; i < arrayNumber.length; i++) {
        if (typeof arrayNumber[i] === "number") {
            if (arrayNumber[i] > biggest) {
                biggest = arrayNumber[i];
            }
        }
    }

    return biggest;
}

const array = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ["a", 3, 4, 2];
const array3 = [];

console.log(biggestNumberInArray(array));
console.log(biggestNumberInArray(array2));
console.log(biggestNumberInArray(array3));

//5: Unique Elements
function uniqueElements(array) {
    const newArray = [];

    for (let i = 0; i < array.length; i++) {
        if (!newArray.includes(array[i])) {
            newArray.push(array[i]);
        }
    }

    return newArray;
}

const list = [1, 2, 3, 3, 3, 3, 4, 5];

console.log(uniqueElements(list));