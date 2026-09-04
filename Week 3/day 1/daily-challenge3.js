const numbers = [5,0,9,1,7,4,2,6,3,8];

// Using toString()
console.log(numbers.toString()); 
// "5,0,9,1,7,4,2,6,3,8"

// Using join()
console.log(numbers.join("+"));  // "5+0+9+1+7+4+2+6+3+8"
console.log(numbers.join(" "));  // "5 0 9 1 7 4 2 6 3 8"
console.log(numbers.join(""));   // "5091742638"


for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length - 1; j++) {
    // Compare current element with the next
    if (numbers[j] < numbers[j + 1]) {
      // Swap using a temporary variable
      let temp = numbers[j];
      numbers[j] = numbers[j + 1];
      numbers[j + 1] = temp;
    }
  }
  console.log(`Step ${i+1}:`, numbers); // Show progress after each outer loop
}

console.log("Final sorted array:", numbers);
