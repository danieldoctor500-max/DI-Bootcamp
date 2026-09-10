//1: Comparison
function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than or equal to 10`);
    } else {
      reject(`${num} is greater than 10`);
    }
  });
}

compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error)); 

compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error)); 


//2: Timed Promise
const delayedPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 4000);
});

delayedPromise.then(result => console.log(result));


//3: Resolve and Reject Shortcuts

// Immediately-resolved promise
const resolvedPromise = Promise.resolve(3);
resolvedPromise.then(value => console.log(value)); // 3

// Immediately-rejected promise
const rejectedPromise = Promise.reject("Boo!");
rejectedPromise.catch(error => console.log(error)); 