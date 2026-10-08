import { useEffect, useRef, useState } from "react";
import { searchCityWeather } from "./weatherApi";
import "./App.css";

const FAVORITES_KEY = "herolo-weather-favorites";

const WEATHER_CODES = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Foggy", "🌫️"],
  48: ["Depositing rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Heavy drizzle", "🌧️"],
  56: ["Freezing drizzle", "🌧️"],
  57: ["Heavy freezing drizzle", "🌧️"],
  61: ["Light rain", "🌦️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"],
  67: ["Heavy freezing rain", "🌧️"],
  71: ["Light snow", "🌨️"],
  73: ["Snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  77: ["Snow grains", "❄️"],
  80: ["Rain showers", "🌦️"],
  81: ["Rain showers", "🌧️"],
  82: ["Heavy rain showers", "🌧️"],
  85: ["Snow showers", "🌨️"],
  86: ["Heavy snow showers", "❄️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with heavy hail", "⛈️"],
};

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.error("Could not read saved weather favorites.", error);
    return [];
  }
}

function weatherDescription(code) {
  return WEATHER_CODES[code] || ["Weather conditions", "🌡️"];
}

function formatCity(location) {
  return [location.name, location.admin1, location.country]
    .filter(Boolean)
    .join(", ");
}

function formatTime(value) {
  if (!value) {
    return "—";
  }
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function App() {
  const [page, setPage] = useState(() =>
    window.location.hash === "#/favorites" ? "favorites" : "weather"
  );
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(readFavorites);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storageError, setStorageError] = useState("");
  const requestRef = useRef(null);

  useEffect(() => {
    const syncPage = () => {
      setPage(window.location.hash === "#/favorites" ? "favorites" : "weather");
    };
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  useEffect(
    () => () => {
      requestRef.current?.abort();
    },
    []
  );

  const changePage = (nextPage) => {
    window.location.hash = `/${nextPage}`;
    setPage(nextPage);
  };

  const submitSearch = async (event) => {
    event.preventDefault();
    const city = query.trim();
    if (!city) {
      setError("Enter a city name to search.");
      return;
    }

    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError("");

    try {
      const result = await searchCityWeather(city, controller.signal);
      setWeather(result);
      changePage("weather");
    } catch (searchError) {
      if (searchError.name !== "AbortError") {
        setError(searchError.message || "Weather could not be loaded. Please try again.");
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  };

  const updateFavorites = (nextFavorites) => {
    setFavorites(nextFavorites);
    setStorageError("");
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(nextFavorites));
    } catch (saveError) {
      setStorageError("Your browser couldn't save favorites on this device.");
      console.error("Could not save weather favorites.", saveError);
    }
  };

  const currentIsFavorite =
    weather && favorites.some((favorite) => favorite.id === weather.location.id);

  const toggleFavorite = () => {
    if (!weather) {
      return;
    }

    if (currentIsFavorite) {
      updateFavorites(
        favorites.filter((favorite) => favorite.id !== weather.location.id)
      );
    } else {
      updateFavorites([...favorites, weather.location]);
    }
  };

  const removeFavorite = (locationId) => {
    updateFavorites(favorites.filter((favorite) => favorite.id !== locationId));
  };

  const openFavorite = async (location) => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError("");
    changePage("weather");

    try {
      const result = await searchCityWeather(
        `${location.latitude},${location.longitude}`,
        controller.signal
      );
      setWeather(result);
    } catch (favoriteError) {
      if (favoriteError.name !== "AbortError") {
        setError(
          favoriteError.message || "Weather could not be loaded. Please try again."
        );
      }
    } finally {
      if (requestRef.current === controller) {
        requestRef.current = null;
        setLoading(false);
      }
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#/weather" onClick={() => setPage("weather")}>
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>skyline</span>
        </a>
        <nav className="navigation" aria-label="Main navigation">
          <a
            href="#/weather"
            className={`nav-link${page === "weather" ? " is-active" : ""}`}
            aria-current={page === "weather" ? "page" : undefined}
            onClick={() => setPage("weather")}
          >
            Weather
          </a>
          <a
            href="#/favorites"
            className={`nav-link${page === "favorites" ? " is-active" : ""}`}
            aria-current={page === "favorites" ? "page" : undefined}
            onClick={() => setPage("favorites")}
          >
            Favorites
            {favorites.length > 0 && (
              <span className="favorite-count">{favorites.length}</span>
            )}
          </a>
        </nav>
      </header>

      <main className="main-content">
        {page === "weather" ? (
          <>
            <section className="welcome">
              <p className="eyebrow">Your day, at a glance</p>
              <h1>Weather, wherever you are.</h1>
              <p>Look up a city and find out what it feels like outside.</p>
            </section>

            <form className="search-form" onSubmit={submitSearch} role="search">
              <label className="visually-hidden" htmlFor="city-search">
                Search for a city
              </label>
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                id="city-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a city — try Tokyo, Paris, or New York"
                autoComplete="off"
              />
              <button type="submit" disabled={loading}>
                {loading ? "Searching…" : "Search"}
              </button>
            </form>

            {error && (
              <p className="message error-message" role="alert">
                {error}
              </p>
            )}

            {loading && (
              <div className="loading-state" role="status">
                <span className="loader" aria-hidden="true" />
                Finding your forecast…
              </div>
            )}

            {weather ? (
              <WeatherCard
                weather={weather}
                isFavorite={currentIsFavorite}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              !loading &&
              !error && (
                <section className="welcome-panel" aria-label="Weather search">
                  <span className="welcome-icon" aria-hidden="true">☀</span>
                  <h2>Find your forecast</h2>
                  <p>
                    Search for a city above to see current conditions and
                    today’s forecast.
                  </p>
                  <div className="suggestions" aria-label="Popular cities">
                    {["Tokyo", "Paris", "New York"].map((city) => (
                      <button
                        className="suggestion"
                        key={city}
                        type="button"
                        onClick={() => setQuery(city)}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </section>
              )
            )}
          </>
        ) : (
          <section className="favorites-page">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Your saved places</p>
                <h1>Favorite cities</h1>
              </div>
              <span className="heading-count">
                {favorites.length} {favorites.length === 1 ? "city" : "cities"}
              </span>
            </div>
            {storageError && (
              <p className="message error-message" role="alert">
                {storageError}
              </p>
            )}
            {favorites.length === 0 ? (
              <div className="welcome-panel empty-favorites">
                <span className="welcome-icon" aria-hidden="true">♡</span>
                <h2>No favorites yet</h2>
                <p>
                  Search for a city and save it with the heart button to find it
                  here.
                </p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => changePage("weather")}
                >
                  Explore weather
                </button>
              </div>
            ) : (
              <ul className="favorite-list">
                {favorites.map((location) => (
                  <li className="favorite-item" key={location.id}>
                    <button
                      className="favorite-city"
                      type="button"
                      onClick={() => openFavorite(location)}
                    >
                      <span className="city-pin" aria-hidden="true">⌖</span>
                      <span>
                        <strong>{location.name}</strong>
                        <small>
                          {[location.admin1, location.country]
                            .filter(Boolean)
                            .join(", ")}
                        </small>
                      </span>
                    </button>
                    <button
                      className="remove-favorite"
                      type="button"
                      onClick={() => removeFavorite(location.id)}
                      aria-label={`Remove ${location.name} from favorites`}
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <span>Skyline Weather</span>
        <span>Forecasts powered by Open-Meteo</span>
      </footer>
    </div>
  );
}

function WeatherCard({ weather, isFavorite, onToggleFavorite }) {
  const [description, icon] = weatherDescription(weather.current.weather_code);
  const date = weather.daily.time?.[0];
  const high = weather.daily.temperature_2m_max?.[0];
  const low = weather.daily.temperature_2m_min?.[0];

  return (
    <section className="weather-card" aria-labelledby="weather-city">
      <div className="weather-topline">
        <p className="eyebrow">Current weather</p>
        <button
          className={`save-button${isFavorite ? " is-saved" : ""}`}
          type="button"
          onClick={onToggleFavorite}
          aria-pressed={Boolean(isFavorite)}
          aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
        >
          <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
          <span>{isFavorite ? "Saved" : "Save city"}</span>
        </button>
      </div>

      <div className="weather-summary">
        <div>
          <h2 id="weather-city">{formatCity(weather.location)}</h2>
          <p className="weather-description">{description}</p>
          <p className="weather-date">
            {date
              ? new Intl.DateTimeFormat(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                }).format(new Date(`${date}T00:00:00Z`))
              : "Today"}
          </p>
        </div>
        <div className="temperature-display">
          <span className="weather-icon" aria-hidden="true">{icon}</span>
          <span className="temperature">
            {Math.round(weather.current.temperature_2m)}°
          </span>
        </div>
      </div>

      <div className="forecast-strip" aria-label="Today's forecast">
        <ForecastMetric label="Feels like" value={`${Math.round(weather.current.apparent_temperature)}°`} icon="◉" />
        <ForecastMetric label="High / low" value={`${Math.round(high)}° / ${Math.round(low)}°`} icon="↕" />
        <ForecastMetric label="Humidity" value={`${Math.round(weather.current.relative_humidity_2m)}%`} icon="◌" />
        <ForecastMetric label="Wind" value={`${Math.round(weather.current.wind_speed_10m)} km/h`} icon="≋" />
        <ForecastMetric label="Sunrise" value={formatTime(weather.daily.sunrise?.[0])} icon="↑" />
        <ForecastMetric label="Sunset" value={formatTime(weather.daily.sunset?.[0])} icon="↓" />
      </div>
    </section>
  );
}

function ForecastMetric({ label, value, icon }) {
  return (
    <div className="metric">
      <span className="metric-icon" aria-hidden="true">{icon}</span>
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
