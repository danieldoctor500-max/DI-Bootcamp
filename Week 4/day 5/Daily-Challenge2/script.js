const form = document.getElementById("sunrise-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const lat1 = document.getElementById("lat1").value;
    const lng1 = document.getElementById("lng1").value;
    const lat2 = document.getElementById("lat2").value;
    const lng2 = document.getElementById("lng2").value;

    await getSunriseTimes(lat1, lng1, lat2, lng2);
});

async function fetchSunrise(lat, lng) {
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function getSunriseTimes(lat1, lng1, lat2, lng2) {
    try {
        // Both requests fire at the same time — we wait for BOTH before displaying anything
        const [city1Data, city2Data] = await Promise.all([
            fetchSunrise(lat1, lng1),
            fetchSunrise(lat2, lng2)
        ]);

        console.log(city1Data);
        console.log(city2Data);

        const sunrise1 = new Date(city1Data.results.sunrise).toLocaleTimeString();
        const sunrise2 = new Date(city2Data.results.sunrise).toLocaleTimeString();

        resultDiv.innerHTML = `
            <p>City 1 sunrise: ${sunrise1}</p>
            <p>City 2 sunrise: ${sunrise2}</p>
        `;
    } catch (error) {
        console.error("Error fetching sunrise data:", error);
        resultDiv.innerHTML = `<p>Something went wrong fetching sunrise data.</p>`;
    }
}