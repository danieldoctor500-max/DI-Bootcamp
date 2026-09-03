// Advanced Functions - Nested Arrow Functions

let landscape = () => {
  let result = "";

  // Nested arrow function for flat ground
  const flat = (x) => {
    for (let count = 0; count < x; count++) {
      result += "_";
    }
  };

  // Nested arrow function for mountain
  const mountain = (x) => {
    result += "/";
    for (let counter = 0; counter < x; counter++) {
      result += "'";
    }
    result += "\\";
  };

  // Build the landscape
  flat(4);       
  mountain(4); 
  flat(4);       

  return result;
};

console.log(landscape());


//2:Curring
const curriedSum = (a) => (b) => a + b;
curriedSum(30)(1);

//4: Currying
const curriedMultiply = (a) => (b) => a * b;
const multiplyBy5 = curriedMultiply(5);
console.log(multiplyBy5(10));


//6: Composing Functions
const compose = (f, g) => (a) => f(g(a));

const add1 = (num) => num + 1;

const add5 = (num) => num + 5;

compose(add1, add5)(10);
