function returnNumbers(text) {
    return text.replace(/\D/g, "");
}

const result = returnNumbers("k5k3q2g5z6x9bn");

console.log(result);