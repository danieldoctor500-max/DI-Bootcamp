// Exercise 1: Dog age to Human years

const data = [
    {
        name: 'Butters',
        age: 3,
        type: 'dog'
    },
    {
        name: 'Cuty',
        age: 5,
        type: 'rabbit'
    },
    {
        name: 'Lizzy',
        age: 6,
        type: 'dog'
    },
    {
        name: 'Red',
        age: 1,
        type: 'cat'
    },
    {
        name: 'Joey',
        age: 3,
        type: 'dog'
    },
    {
        name: 'Rex',
        age: 10,
        type: 'dog'
    }
];

// Using a loop

let dogAgeTotal = 0;

for (let i = 0; i < data.length; i++) {
    if (data[i].type === 'dog') {
        dogAgeTotal += data[i].age * 7;
    }
}

console.log("Exercise 1 - Loop:", dogAgeTotal);


// Using reduce()

const dogAgeReduce = data.reduce((sum, animal) => {
    if (animal.type === 'dog') {
        return sum + animal.age * 7;
    }

    return sum;
}, 0);

console.log("Exercise 1 - Reduce:", dogAgeReduce);


// ==========================================
// Exercise 2: Email
// ==========================================

const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';

const cleanEmail = userEmail3.trim();

console.log("Exercise 2:", cleanEmail);


// ==========================================
// Exercise 3: Employees
// ==========================================

const users = [
    {
        firstName: 'Bradley',
        lastName: 'Bouley',
        role: 'Full Stack Resident'
    },
    {
        firstName: 'Chloe',
        lastName: 'Alnaji',
        role: 'Full Stack Resident'
    },
    {
        firstName: 'Jonathan',
        lastName: 'Baughn',
        role: 'Enterprise Instructor'
    },
    {
        firstName: 'Michael',
        lastName: 'Herman',
        role: 'Lead Instructor'
    },
    {
        firstName: 'Robert',
        lastName: 'Hajek',
        role: 'Full Stack Resident'
    },
    {
        firstName: 'Wes',
        lastName: 'Reid',
        role: 'Instructor'
    },
    {
        firstName: 'Zach',
        lastName: 'Klabunde',
        role: 'Instructor'
    }
];

const employeeResult = {};

for (const { firstName, lastName, role } of users) {
    const fullName = `${firstName} ${lastName}`;
    employeeResult[fullName] = role;
}

console.log("Exercise 3:", employeeResult);


// Exercise 4: Array to Object

const letters = ['x', 'y', 'z', 'z'];


// Using for loop

const letterResult = {};

for (const letter of letters) {
    if (letterResult[letter]) {
        letterResult[letter]++;
    } else {
        letterResult[letter] = 1;
    }
}

console.log("Exercise 4 - Loop:", letterResult);


// Using reduce()

const letterReduce = letters.reduce((accumulator, letter) => {
    if (accumulator[letter]) {
        accumulator[letter]++;
    } else {
        accumulator[letter] = 1;
    }

    return accumulator;
}, {});

console.log("Exercise 4 - Reduce:", letterReduce);