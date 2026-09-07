//1: Colors
const colors = [
    "Blue",
    "Green",
    "Red",
    "Orange",
    "Violet",
    "Indigo",
    "Yellow"
];

// 1. Display each color with its choice number
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// 2. Check if Violet exists
const hasViolet = colors.some(color => color === "Violet");

if (hasViolet) {
    console.log("Yeah");
} else {
    console.log("No...");
}


//2: Colors #2
const colors2 = [
    "Blue",
    "Green",
    "Red",
    "Orange",
    "Violet",
    "Indigo",
    "Yellow"
];

const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    const number = index + 1;

    let suffix;

    if (number === 1) {
        suffix = ordinal[1];
    } else if (number === 2) {
        suffix = ordinal[2];
    } else if (number === 3) {
        suffix = ordinal[3];
    } else {
        suffix = ordinal[0];
    }

    console.log(`${number}${suffix} choice is ${color}.`);
});


//3: Analyzing
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = [
    "bread",
    ...vegetables,
    "chicken",
    ...fruits
];

console.log(result);


//4: Employees
const users = [
    {
        firstName: "Bradley",
        lastName: "Bouley",
        role: "Full Stack Resident"
    },
    {
        firstName: "Chloe",
        lastName: "Alnaji",
        role: "Full Stack Resident"
    },
    {
        firstName: "Jonathan",
        lastName: "Baughn",
        role: "Enterprise Instructor"
    },
    {
        firstName: "Michael",
        lastName: "Herman",
        role: "Lead Instructor"
    },
    {
        firstName: "Robert",
        lastName: "Hajek",
        role: "Full Stack Resident"
    },
    {
        firstName: "Wes",
        lastName: "Reid",
        role: "Instructor"
    },
    {
        firstName: "Zach",
        lastName: "Klabunde",
        role: "Instructor"
    }
];


//: Star Wars
const epic = [
    "a",
    "long",
    "time",
    "ago",
    "in a",
    "galaxy",
    "far far",
    "away"
];

const sentence = epic.reduce((accumulator, currentValue) => {
    return accumulator + " " + currentValue;
});

console.log(sentence);


//6: Employees #2
const students = [
    {
        name: "Ray",
        course: "Computer Science",
        isPassed: true
    },
    {
        name: "Liam",
        course: "Computer Science",
        isPassed: false
    },
    {
        name: "Jenner",
        course: "Information Technology",
        isPassed: true
    },
    {
        name: "Marco",
        course: "Robotics",
        isPassed: true
    },
    {
        name: "Kimberly",
        course: "Artificial Intelligence",
        isPassed: false
    },
    {
        name: "Jamie",
        course: "Big Data",
        isPassed: false
    }
];