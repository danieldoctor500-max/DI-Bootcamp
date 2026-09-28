const axios = require("axios");
const chalk = require("chalk");

async function getWeather(city) {
    try {
        // First, find the city's coordinates
        const locationResponse = await axios.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            {
                params: {
                    name: city,
                    count: 1,
                    language: "en",
                    format: "json"
                }
            }
        );

        const locations = locationResponse.data.results;

        if (!locations || locations.length === 0) {
            console.log(chalk.red("City not found."));
            return;
        }

        const location = locations[0];

        // Then get the weather using the coordinates
        const weatherResponse = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    current: "temperature_2m,weather_code",
                    temperature_unit: "celsius"
                }
            }
        );

        const weather = weatherResponse.data.current;

        console.log("\n" + chalk.cyan.bold("Weather Information"));
        console.log(chalk.yellow(`City: ${location.name}`));
        console.log(chalk.green(`Country: ${location.country}`));
        console.log(chalk.blue(`Temperature: ${weather.temperature_2m}°C`));
        console.log(
            chalk.magenta(
                `Weather code: ${weather.weather_code}`
            )
        );
    } catch (error) {
        console.log(
            chalk.red("Unable to fetch weather data:", error.message)
        );
    }
}

module.exports = getWeather;