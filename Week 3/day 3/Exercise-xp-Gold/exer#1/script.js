let genres = document.getElementById("genres");

// Display the selected value
console.log(genres.value);

// Listen for changes
genres.addEventListener("change", function () {
    console.log(genres.value);
});