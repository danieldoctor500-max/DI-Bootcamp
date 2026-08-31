//1: List of People
const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.splice(0, 1);

// 2. Replace "James" with "Jason"
people[2] = "Jason";

// 3. Add your name
people.push("Daniel");

// 4. Find Mary's index
console.log(people.indexOf("Mary")); // 0

// 5. Copy without Mary or your name
const peopleCopy = people.slice(1, 3);
console.log(peopleCopy); // ["Devon", "Jason"]

// 6. Index of "Foo"
console.log(people.indexOf("Foo")); // -1

// 7. Last element
const last = people[people.length - 1];
console.log(last); // Daniel

// Loop through all
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

// Stop after Devon
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") break;
}

 //2: Favorite Colors
 const colors = ["blue", "red", "green", "purple", "orange"];

// Basic loop
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// Bonus with suffixes
const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
  console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}


//3: Repeat the Question
let number = Number(prompt("Enter a number:"));

while (number < 10) {
  number = Number(prompt("Enter another number:"));
}

console.log("Your number is 10 or greater.");


//4: Building Management
const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

// Number of floors
console.log(building.numberOfFloors);

// Apartments on floors 1 and 3
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);

// Second tenant and rooms
console.log(building.nameOfTenants[1], building.numberOfRoomsAndRent.dan[0]);

// Rent comparison
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}
console.log(building.numberOfRoomsAndRent.dan[1]); // 1200


//5: Family
const family = {
  father: "John",
  mother: "Mary",
  son: "Daniel",
  daughter: "Anna"
};

// Keys
for (let key in family) {
  console.log(key);
}

// Values
for (let key in family) {
  console.log(family[key]);
}


//:6 Rudolf
const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer"
};

let sentence = "";
for (let key in details) {
  sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim()); // "my name is Rudolf the reindeer"


//:7 Secret group
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const initials = [];
for (let name of names) {
  initials.push(name[0]);
}

initials.sort();
const secretSociety = initials.join("");
console.log(secretSociety); // "ABJKPS"

