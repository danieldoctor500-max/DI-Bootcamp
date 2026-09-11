const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

const form = document.getElementById("gif-form");
const input = document.getElementById("gif-input");
const container = document.getElementById("gif-container");
const deleteAllBtn = document.getElementById("delete-all-btn");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const tag = input.value;
    await fetchRandomGif(tag);
    input.value = "";
});

deleteAllBtn.addEventListener("click", function () {
    container.innerHTML = "";
});

async function fetchRandomGif(tag) {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}&rating=g`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        appendGif(data.data);
    } catch (error) {
        console.error("Error fetching gif:", error);
    }
}

function appendGif(gif) {
    // Wrapper div for the gif + its own delete button
    const gifItem = document.createElement("div");
    gifItem.classList.add("gif-item");

    const img = document.createElement("img");
    img.src = gif.images.original.url;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";
    deleteBtn.addEventListener("click", function () {
        gifItem.remove();
    });

    gifItem.appendChild(img);
    gifItem.appendChild(deleteBtn);
    container.appendChild(gifItem);
}