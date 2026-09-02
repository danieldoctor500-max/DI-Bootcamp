function validateEmail(email) {
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let message = document.getElementById("message");

    if (validateEmail(email)) {
        message.innerHTML = "Valid email address!";
    } else {
        message.innerHTML = "Invalid email address!";
    }
});