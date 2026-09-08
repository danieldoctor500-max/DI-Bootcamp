// Exercise 1: Location

const person = {
    name: "John Doe",
    age: 25,
    location: {
        country: "Canada",
        city: "Vancouver",
        coordinates: [49.2827, -123.1207]
    }
};

const {
    name,
    location: {
        country,
        city,
        coordinates: [lat, lng]
    }
} = person;

console.log(
    `I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`
);


// Exercise 2: Display Student Info

function displayStudentInfo({ first, last }) {
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({
    first: "Elie",
    last: "Schoppik"
}));


// Exercise 3: User and ID

const users = {
    user1: 18273,
    user2: 92833,
    user3: 90315
};

// Convert the object into an array
const usersArray = Object.entries(users);

console.log(usersArray);

// Multiply each user's ID by 2
const newUsers = usersArray.map(([user, id]) => {
    return [user, id * 2];
});

console.log(newUsers);


// Exercise 4: Person Class

class Person {
    constructor(name) {
        this.name = name;
    }
}

const member = new Person("John");

console.log(typeof member);


// Exercise 5: Dog Class

class Dog {
    constructor(name) {
        this.name = name;
    }
}

class Labrador extends Dog {
    constructor(name, size) {
        super(name);
        this.size = size;
    }
}

const myDog = new Labrador("Max", "Large");

console.log(myDog);


// Exercise 6: Comparing Arrays and Objects

console.log(JSON.stringify([2]) === JSON.stringify([2]));
console.log(JSON.stringify({}) === JSON.stringify({}));


// Exercise 6: Object References

const object1 = { number: 5 };
const object2 = object1;
const object3 = object2;
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number);
console.log(object3.number);
console.log(object4.number);


// Exercise 6: Animal Class

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}


// Mammal extends Animal

class Mammal extends Animal {
    sound(sound) {
        return `${sound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}


// Create a cow

const farmerCow = new Mammal(
    "Lily",
    "cow",
    "brown and white"
);

console.log(farmerCow.sound("Moooo"));