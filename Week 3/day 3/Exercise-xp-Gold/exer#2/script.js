function removecolor() {
    let colorSelect = document.getElementById("colorSelect");

    // Get the selected option
    let selectedOption = colorSelect.selectedIndex;

    // Remove the selected option
    if (selectedOption !== -1) {
        colorSelect.remove(selectedOption);
    }
}

// Add click event listener
document.getElementById("removeButton").addEventListener("click", removecolor);