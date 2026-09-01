//1: is_blank
function isBlank(str) {
  return str === "";
}

console.log(isBlank(""));    // true
console.log(isBlank("abc")); // false


//2: Abbrev Name
function abbrevName(name) {
  let parts = name.split(" ");
  return parts[0] + " " + parts[1][0] + ".";
}

console.log(abbrevName("Robin Singh")); // "Robin S."


//3: Swap Case
function swapCase(str) {
  let swapped = "";
  for (let char of str) {
    if (char === char.toUpperCase()) {
      swapped += char.toLowerCase();
    } else {
      swapped += char.toUpperCase();
    }
  }
  return swapped;
}

console.log(swapCase("The Quick Brown Fox")); 


//4: Omnipresent Value
function isOmnipresent(arr, value) {
  for (let subArr of arr) {
    if (!subArr.includes(value)) {
      return false;
    }
  }
  return true;
}

console.log(isOmnipresent([[1,1],[1,3],[5,1],[6,1]], 1)); // true
console.log(isOmnipresent([[1,1],[1,3],[5,1],[6,1]], 6)); // false
