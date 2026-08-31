// Person 1
let person1 = {
    fullName: "John Doe",
    mass: 70,
    height: 1.75,

    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

// Person 2
let person2 = {
    fullName: "Jane Smith",
    mass: 80,
    height: 1.65,

    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};


// Function to compare the two BMIs
function compareBMI(person1, person2) {

    let bmi1 = person1.calculateBMI();
    let bmi2 = person2.calculateBMI();

    console.log(person1.fullName + " BMI:", bmi1.toFixed(2));
    console.log(person2.fullName + " BMI:", bmi2.toFixed(2));

    if (bmi1 > bmi2) {
        console.log(person1.fullName + " has the largest BMI.");
    } else if (bmi2 > bmi1) {
        console.log(person2.fullName + " has the largest BMI.");
    } else {
        console.log("Both people have the same BMI.");
    }
}


// Call the function
compareBMI(person1, person2);