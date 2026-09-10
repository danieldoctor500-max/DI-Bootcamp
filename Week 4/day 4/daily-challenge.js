//1: make ALLCAPS & sorted words
function makeAllCaps(arr) {
  return new Promise((resolve, reject) => {
    const allStrings = arr.every(word => typeof word === "string");

    if (allStrings) {
      const upperArr = arr.map(word => word.toUpperCase());
      resolve(upperArr);
    } else {
      reject("Error: array must only contain strings");
    }
  });
}

function sortWords(arr) {
  return new Promise((resolve, reject) => {
    if (arr.length > 4) {
      const sortedArr = [...arr].sort(); // spread to avoid mutating original array
      resolve(sortedArr);
    } else {
      reject("Error: array must contain more than 4 words");
    }
  });
}

makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch(error => console.log(error));

