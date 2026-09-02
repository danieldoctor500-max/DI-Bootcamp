function validateEmailWithoutRegex(email) {
    // Find the @ symbol
    let atPosition = email.indexOf("@");

    // Find the dot
    let dotPosition = email.lastIndexOf(".");

    // Check the basic structure
    if (
        atPosition > 0 &&
        dotPosition > atPosition + 1 &&
        dotPosition < email.length - 1
    ) {
        return true;
    }

    return false;
}

document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    if (validateEmailWithoutRegex(email)) {
        message.innerHTML = "Valid email address!";
    } else {
        message.innerHTML = "Invalid email address!";
    }
});