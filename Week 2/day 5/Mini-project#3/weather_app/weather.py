"""
Weather App - Mini Project
Combines: city ID lookup, current weather fetch, and user-friendly display
with timezone-aware sunrise/sunset times.
"""

from pyowm.owm import OWM
import pytz
from datetime import datetime

API_KEY = "44903cd889c9f2c41befc45ed2c044a2"

# Common country -> timezone mapping for nicer local-time display.
# Extend this dict as needed; falls back to UTC if not listed.
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


def resolve_city(reg, city_name, country_code):
    """Find a unique city ID for the given name + country. Returns a tuple or None."""
    results = reg.ids_for(city_name, country=country_code, matching="exact")

    if not results:
        # Fall back to a looser match if exact match fails
        results = reg.ids_for(city_name, country=country_code, matching="like")

    if not results:
        return None

    if len(results) > 1:
        print(f"\nMultiple matches found for '{city_name}, {country_code}':")
        for i, (city_id, name, country, state, lat, lon) in enumerate(results):
            state_str = f"({state}) " if state else ""
            print(f"  [{i}] {name} {state_str}{country} - lat={lat}, lon={lon}")
        choice = input("Select the number of the correct city: ")
        try:
            return results[int(choice)]
        except (ValueError, IndexError):
            print("Invalid choice, using first result.")
            return results[0]

    return results[0]


def get_weather_by_id(mgr, city_id):
    """Fetch current weather using a resolved city ID."""
    observation = mgr.weather_at_id(city_id)
    return observation.weather


def display_weather(weather, city_name, country_code):
    """Print weather info in a clean, user-friendly format."""
    temp = weather.temperature("celsius")
    wind = weather.wind()

    # Get sunrise/sunset as UTC datetimes, then convert to local timezone
    sunrise_utc = weather.sunrise_time(timeformat="date")
    sunset_utc = weather.sunset_time(timeformat="date")

    tz_name = COUNTRY_TIMEZONES.get(country_code.upper(), "UTC")
    local_tz = pytz.timezone(tz_name)

    sunrise_local = sunrise_utc.astimezone(local_tz)
    sunset_local = sunset_utc.astimezone(local_tz)

    print(f"\n{'=' * 40}")
    print(f"  Weather in {city_name}, {country_code.upper()}")
    print(f"{'=' * 40}")
    print(f"  Condition:    {weather.status} ({weather.detailed_status})")
    print(f"  Temperature:  {temp['temp']}°C (feels like {temp['feels_like']}°C)")
    print(f"  Min / Max:    {temp['temp_min']}°C / {temp['temp_max']}°C")
    print(f"  Wind:         {wind['speed']} m/s, direction {wind['deg']}°")
    print(f"  Sunrise:      {sunrise_local.strftime('%H:%M')} ({tz_name})")
    print(f"  Sunset:       {sunset_local.strftime('%H:%M')} ({tz_name})")
    print(f"{'=' * 40}\n")


def main():
    owm = OWM(API_KEY)
    reg = owm.city_id_registry()
    mgr = owm.weather_manager()

    city_name = input("Enter a city name: ").strip()
    country_code = input("Enter 2-letter country code (e.g. KE, GB, US): ").strip()

    match = resolve_city(reg, city_name, country_code)

    if match is None:
        print(f"No city found matching '{city_name}, {country_code}'. Please check spelling.")
        return

    city_id, name, country, state, lat, lon = match

    try:
        weather = get_weather_by_id(mgr, city_id)
        display_weather(weather, name, country)
    except Exception as e:
        print(f"Could not fetch weather. Error: {e}")


if __name__ == "__main__":
    main()