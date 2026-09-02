function calculateTip() {
    // Get the values from the inputs
    let billAmount = document.getElementById("billAmt").value;
    let serviceQuality = document.getElementById("serviceQual").value;
    let numberOfPeople = document.getElementById("numOfPeople").value;

    // Check if bill amount is empty or service quality is 0
    if (serviceQuality == 0 || billAmount == "") {
        alert("Please enter the bill amount and select the service quality.");
        return;
    }

    // If number of people is empty or less than 1
    if (numberOfPeople == "" || numberOfPeople < 1) {
        numberOfPeople = 1;

        // Hide "each"
        document.getElementById("each").style.display = "none";
    } else {
        // Show "each"
        document.getElementById("each").style.display = "inline";
    }

    // Calculate the tip per person
    let total = (billAmount * serviceQuality) / numberOfPeople;

    // Round to 2 decimal places
    total = total.toFixed(2);

    // Display the total tip section
    document.getElementById("totalTip").style.display = "block";

    // Display the calculated tip
    document.getElementById("tip").innerHTML = total;
}

// Run calculateTip when the button is clicked
document.getElementById("calculate").onclick = calculateTip;