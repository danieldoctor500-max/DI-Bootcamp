// Array of planet objects
const planets = [
    { name: "Mercury", color: "gray", moons: 0 },
    { name: "Venus", color: "orange", moons: 0 },
    { name: "Earth", color: "blue", moons: 1 },
    { name: "Mars", color: "red", moons: 2 },
    { name: "Jupiter", color: "brown", moons: 95 },
    { name: "Saturn", color: "gold", moons: 146 },
    { name: "Uranus", color: "lightblue", moons: 28 },
    { name: "Neptune", color: "darkblue", moons: 16 }
];

// Get the section from the HTML
const section = document.querySelector(".listPlanets");

// Loop through each planet
planets.forEach(planet => {

    // Create the planet div
    const planetDiv = document.createElement("div");

    // Add the "planet" class
    planetDiv.classList.add("planet");

    // Add the planet name
    planetDiv.textContent = planet.name;

    // Give each planet a different background color
    planetDiv.style.backgroundColor = planet.color;

    // Create the moons
    for (let i = 0; i < planet.moons; i++) {

        const moon = document.createElement("div");

        // Add moon class
        moon.classList.add("moon");

        // Position each moon around the planet
        const angle = (360 / planet.moons) * i;
        const radius = 70;

        moon.style.left = `${50 + Math.cos(angle * Math.PI / 180) * radius}px`;
        moon.style.top = `${50 + Math.sin(angle * Math.PI / 180) * radius}px`;

        // Add moon to planet
        planetDiv.appendChild(moon);
    }

    // Add planet to the section
    section.appendChild(planetDiv);
});