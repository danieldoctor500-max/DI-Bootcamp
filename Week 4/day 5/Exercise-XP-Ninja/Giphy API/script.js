const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

const form = document.getElementById("gif-form");
const searchInput = document.getElementById("search-input");
const gifContainer = document.getElementById("gif-container");
const deleteButton = document.getElementById("delete-btn");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const category = searchInput.value.trim();

    if (category === "") {
        return;
    }

    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(category)}&limit=10`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        data.data.forEach(gif => {
            const img = document.createElement("img");

            img.src = gif.images.original.url;
            img.alt = gif.title;

            gifContainer.appendChild(img);
        });

    } catch (error) {
        console.error("Error fetching GIFs:", error);
    }

    searchInput.value = "";
});

deleteButton.addEventListener("click", function () {
    gifContainer.innerHTML = "";
});