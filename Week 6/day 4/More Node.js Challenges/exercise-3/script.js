const getNextHoliday = require("./date");

const result = getNextHoliday();

console.log("Today's date:", new Date().toLocaleDateString());

console.log(
    `The next holiday is ${result.holiday}.`
);

console.log(
    `It is in ${result.days} days, ${result.hours}:${String(result.minutes).padStart(2, "0")}:${String(result.seconds).padStart(2, "0")} hours.`
);