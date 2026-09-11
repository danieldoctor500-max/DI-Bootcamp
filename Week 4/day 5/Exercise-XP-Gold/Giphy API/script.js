const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=hilarious&limit=25`;

async function getGif() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const gifs = data.data;

        const randomIndex = Math.floor(Math.random() * gifs.length);
        const randomGif = gifs[randomIndex];

        const img = document.createElement("img");

        img.src = randomGif.images.original.url;
        img.alt = randomGif.title;

        document.querySelector("#gif-container").appendChild(img);

    } catch (error) {
        console.error("Something went wrong:", error);
    }
}

getGif();