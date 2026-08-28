"""
gui.py - XP Ninja Bonus
Displays a 3-day humidity forecast as a bar chart using Matplotlib,
built on top of PyOWM forecast data.

Run standalone: python gui.py
"""

import matplotlib.pyplot as plt
import pytz
from datetime import datetime, timedelta
from pyowm.owm import OWM

API_KEY = "44903cd889c9f2c41befc45ed2c044a2"

# Reuse the same timezone map from weather_app.py so local noon is accurate
COUNTRY_TIMEZONES = {
    "KE": "Africa/Nairobi",
    "GB": "Europe/London",
    "FR": "Europe/Paris",
    "US": "America/New_York",
    "DE": "Europe/Berlin",
    "JP": "Asia/Tokyo",
    "IT": "Europe/Rome",
    "ES": "Europe/Madrid",
    "IN": "Asia/Kolkata",
    "AU": "Australia/Sydney",
    "CA": "America/Toronto",
    "NG": "Africa/Lagos",
    "ZA": "Africa/Johannesburg",
    "EG": "Africa/Cairo",
    "BR": "America/Sao_Paulo",
    "CN": "Asia/Shanghai",
}


def get_humidity_forecast(city_query, country_code, days=3):
    """
    Fetch the 3-hour forecast and extract one humidity value per day
    (the entry closest to local noon) for the next `days` days.

    Returns a list of (date_label, humidity) tuples.
    """
    owm = OWM(API_KEY)
    mgr = owm.weather_manager()

    forecaster = mgr.forecast_at_place(f"{city_query},{country_code}", "3h")

    tz_name = COUNTRY_TIMEZONES.get(country_code.upper(), "UTC")
    local_tz = pytz.timezone(tz_name)

    today_local = datetime.now(local_tz).date()
    results = []

    for i in range(days):
        target_date = today_local + timedelta(days=i)
        target_noon_local = local_tz.localize(
            datetime.combine(target_date, datetime.min.time()).replace(hour=12)
        )

        weather = forecaster.get_weather_at(target_noon_local)

        if weather is None:
            continue

        label = target_date.strftime("%a %d %b")  # e.g. "Sat 29 Aug"
        results.append((label, weather.humidity))

    return results


def init_plot():
    """
    Set up the figure and axes: title, axis labels, and basic styling.
    Returns (fig, ax) for the caller to keep building on.
    """
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.set_title("3-Day Humidity Forecast", fontsize=14, fontweight="bold")
    ax.set_ylabel("Humidity (%)")
    ax.set_ylim(0, 100)
    ax.grid(axis="y", linestyle="--", alpha=0.4)
    return fig, ax


def plot_temperatures(ax, dates, humidities):
    """
    Draw the humidity bars onto the given axes.
    (Named per the exercise brief, though the data plotted is humidity.)
    Returns the bar container so labels can be added afterward.
    """
    bars = ax.bar(dates, humidities, color="#4C9BE8", edgecolor="black", width=0.5)
    return bars


def write_humidity_on_bar_chart(ax, bars, humidities):
    """
    Annotate each bar with its humidity percentage, centered above the bar.
    """
    for bar, value in zip(bars, humidities):
        height = bar.get_height()
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            height + 2,
            f"{value}%",
            ha="center",
            va="bottom",
            fontweight="bold",
        )


def main():
    city_query = input("Enter a city name: ").strip()
    country_code = input("Enter 2-letter country code (e.g. KE, GB, US): ").strip()

    forecast_data = get_humidity_forecast(city_query, country_code)

    if not forecast_data:
        print("Could not retrieve forecast data. Check the city/country and try again.")
        return

    dates = [d for d, _ in forecast_data]
    humidities = [h for _, h in forecast_data]

    fig, ax = init_plot()
    bars = plot_temperatures(ax, dates, humidities)
    write_humidity_on_bar_chart(ax, bars, humidities)

    ax.set_xlabel(f"{city_query.title()}, {country_code.upper()}")
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()