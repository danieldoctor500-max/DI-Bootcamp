//1: Basic Fetch with Giphy API
fetch("https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My")
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Error fetching gifs:", error));


//2:  Giphy API
const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const url = `https://api.giphy.com/v1/gifs/search?q=sun&rating=g&api_key=${apiKey}&limit=10&offset=2`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error("Error fetching gifs:", error));


//3: Converting to Async/Await
async function getStarship() {
    try {
        const response = await fetch("https://www.swapi.tech/api/starships/9/");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const objectStarWars = await response.json();
        console.log(objectStarWars.result);
    } catch (error) {
        console.error("Error fetching starship data:", error);
    }
}

getStarship();