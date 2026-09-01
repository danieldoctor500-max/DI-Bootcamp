//1: Number Divisible by 23
function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      console.log(i);
      sum += i;
    }
  }
  console.log("Sum:", sum);
}

// Default
displayNumbersDivisible();
// Bonus examples
displayNumbersDivisible(3);
displayNumbersDivisible(45);


//2: Shopping List
const stock = { 
  banana: 6, apple: 0, pear: 12, orange: 32, blueberry: 1
};  

const prices = {    
  banana: 4, apple: 2, pear: 1, orange: 1.5, blueberry: 10
}; 

const shoppingList = ["banana", "orange", "apple"];

function myBill() {
  let total = 0;
  for (let item of shoppingList) {
    if (item in stock && stock[item] > 0) {
      total += prices[item];
      stock[item]--; 
    }
  }
  return total;
}

console.log("Total Bill:", myBill());


//3: Vacation Costs
function hotelCost(nights) {
  return nights * 140;
}

function planeRideCost(destination) {
  if (destination === "London") return 183;
  if (destination === "Paris") return 220;
  return 300;
}

function rentalCarCost(days) {
  let cost = days * 40;
  if (days > 10) cost *= 0.95; 
  return cost;
}

function totalVacationCost(nights, destination, days) {
  const hotel = hotelCost(nights);
  const plane = planeRideCost(destination);
  const car = rentalCarCost(days);

  console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}`);
  return hotel + plane + car;
}

console.log("Total Vacation Cost:", totalVacationCost(5, "Paris", 12));


//5: User(DOM Manipulation)
// Retrieve the div
const container = document.getElementById("container");
console.log(container);

// Change Pete to Richard
document.querySelectorAll(".list")[0].children[1].textContent = "Richard";

// Delete second <li> of second <ul>
document.querySelectorAll(".list")[1].children[1].remove();

// Change first <li> of each <ul> to your name
document.querySelectorAll(".list").forEach(ul => {
  ul.firstElementChild.textContent = "Daniel";
});

// Add classes
document.querySelectorAll(".list").forEach(ul => ul.classList.add("student_list"));
document.querySelector(".list").classList.add("university", "attendance");

// Styling
container.style.backgroundColor = "lightblue";
container.style.padding = "10px";
document.body.style.fontSize = "20px";

// Hide Dan
document.querySelectorAll(".list")[1].lastElementChild.style.display = "none";

// Border Richard
document.querySelectorAll(".list")[0].children[1].style.border = "1px solid black";

// Bonus
if (container.style.backgroundColor === "lightblue") {
  alert("Hello John and Richard");
}


//6: Change the Navbar
const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");

const newLi = document.createElement("li");
const textNode = document.createTextNode("Logout");
newLi.appendChild(textNode);
navBar.querySelector("ul").appendChild(newLi);

const firstLi = navBar.querySelector("ul").firstElementChild;
const lastLi = navBar.querySelector("ul").lastElementChild;

console.log("First link:", firstLi.textContent);
console.log("Last link:", lastLi.textContent);


//7: My Book List
const allBooks = [
  { title: "Harry Potter", author: "J.K. Rowling", image: "https://covers.openlibrary.org/b/id/7984916-L.jpg", alreadyRead: true },
  { title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://covers.openlibrary.org/b/id/6979861-L.jpg", alreadyRead: false }
];

const section = document.querySelector(".listBooks");

allBooks.forEach(book => {
  const div = document.createElement("div");
  const details = document.createElement("p");
  details.textContent = `${book.title} written by ${book.author}`;
  if (book.alreadyRead) details.style.color = "red";

  const img = document.createElement("img");
  img.src = book.image;
  img.style.width = "100px";

  div.appendChild(details);
  div.appendChild(img);
  section.appendChild(div);
});


