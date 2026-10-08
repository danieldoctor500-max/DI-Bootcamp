const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Weather service request failed. Please try again.");
  }
  return response.json();
}

export async function searchCityWeather(query, signal) {
  const geocodingUrl = new URL(GEOCODING_URL);
  geocodingUrl.search = new URLSearchParams({
    name: query,
    count: "1",
    language: "en",
    format: "json",
  });

  const locations = await fetchJson(geocodingUrl, signal);
  const location = locations.results?.[0];
  if (!location) {
    throw new Error(`We couldn't find "${query}". Check the spelling and try again.`);
  }

  const forecastUrl = new URL(FORECAST_URL);
  forecastUrl.search = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: "auto",
    forecast_days: "1",
  });

  const forecast = await fetchJson(forecastUrl, signal);
  if (!forecast.current || !forecast.daily) {
    throw new Error("Weather data is unavailable for this city right now.");
  }

  return {
    location: {
      id: `${location.latitude},${location.longitude}`,
      name: location.name,
      country: location.country,
      admin1: location.admin1 || "",
      latitude: location.latitude,
      longitude: location.longitude,
    },
    current: forecast.current,
    daily: forecast.daily,
  };
}
