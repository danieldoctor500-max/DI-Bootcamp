import { people } from "./data.js";

function calculateAverageAge(people) {
    const totalAge = people.reduce((total, person) => {
        return total + person.age;
    }, 0);

    const averageAge = totalAge / people.length;

    console.log(`Average age: ${averageAge}`);
}

calculateAverageAge(people);