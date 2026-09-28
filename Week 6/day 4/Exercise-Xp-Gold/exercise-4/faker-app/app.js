const { faker } = require("@faker-js/faker");

const users = [];

function addUser() {
    const user = {
        name: faker.person.fullName(),
        address: faker.location.streetAddress(),
        country: faker.location.country()
    };

    users.push(user);
}

addUser();
addUser();
addUser();
addUser();
addUser();

console.log("Users:");

users.forEach((user, index) => {
    console.log(`\nUser ${index + 1}`);
    console.log("Name:", user.name);
    console.log("Address:", user.address);
    console.log("Country:", user.country);
});