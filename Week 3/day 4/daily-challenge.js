let client = "John";

const groceries = {
  fruits: ["pear", "apple", "banana"],
  vegetables: ["tomatoes", "cucumber", "salad"],
  totalPrice: "20$",
  other: {
    paid: true,
    meansOfPayment: ["cash", "creditCard"]
  }
};

// Arrow function to display fruits
const displayGroceries = () => {
  groceries.fruits.forEach(fruit => console.log(fruit));
};

// Arrow function to clone groceries
const cloneGroceries = () => {
  // Pass by value (primitive)
  let user = client;
  client = "Betty";
  console.log("User:", user);   // Still "John"
  console.log("Client:", client); // Changed to "Betty"
  // Explanation: Strings are primitives → copied by value, so user is independent.

  // Pass by reference (objects)
  let shopping = groceries;

  // Modify totalPrice
  shopping.totalPrice = "35$";
  console.log("Groceries totalPrice:", groceries.totalPrice);
  // Explanation: Objects are references → both shopping and groceries point to the same object.

  // Modify paid
  shopping.other.paid = false;
  console.log("Groceries paid:", groceries.other.paid);
  // Explanation: Nested objects are also references → changes affect the original.
};

// Invoke functions
displayGroceries();
cloneGroceries();
