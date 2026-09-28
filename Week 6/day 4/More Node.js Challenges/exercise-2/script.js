const calculateMinutesLived = require("./date");

const birthdate = "2000-01-01";

const minutesLived = calculateMinutesLived(birthdate);

console.log(
    `You have lived approximately ${minutesLived.toLocaleString()} minutes.`
);