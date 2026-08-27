#1: Upcoming Holiday
import datetime
import holidays  # pip install holidays

def upcoming_holiday(country="US"):
    today = datetime.date.today()
    print(f"Today's date is: {today}")

    country_holidays = holidays.CountryHoliday(country, years=[today.year, today.year + 1])
    # Sort holidays by date and find the first one that's still ahead of today
    future_holidays = sorted(
        (date, name) for date, name in country_holidays.items() if date >= today
    )

    next_date, next_name = future_holidays[0]
    days_left = (next_date - today).days
    print(f"The next holiday is {next_name} in {days_left} days ({next_date}).")

upcoming_holiday()

#2: How Old are You On jupiter
EARTH_YEAR_SECONDS = 31557600

ORBITAL_PERIODS_IN_EARTH_YEARS = {
    "Mercury": 0.2408467,
    "Venus": 0.61519726,
    "Earth": 1,
    "Mars": 1.8808158,
    "Jupiter": 11.862615,
    "Saturn": 29.447498,
    "Uranus": 84.016846,
    "Neptune": 164.79132,
}

def age_on_planets(age_in_seconds):
    earth_years = age_in_seconds / EARTH_YEAR_SECONDS
    for planet, orbital_period in ORBITAL_PERIODS_IN_EARTH_YEARS.items():
        planet_years = earth_years / orbital_period
        print(f"You are {planet_years:.2f} {planet}-years old.")

age_on_planets(1_000_000_000)

#3: Rugular Expression #1
import re

def return_numbers(s):
    digits = re.findall(r'\d', s)
    return int(''.join(digits))

print(return_numbers('k5k3q2g5z6x9bn'))

#4: Regular Expression #2
import re

def validate_name():
    name = input("Please enter your full name (e.g. John Doe): ")

    pattern = r'^[A-Z][a-z]* [A-Z][a-z]*$'
    if re.match(pattern, name):
        print("Valid name!")
        return True
    else:
        print("Invalid name. Make sure it's two capitalized words separated by a single space.")
        return False

validate_name()

#5: Python Password Generator
import re

def validate_name():
    name = input("Please enter your full name (e.g. John Doe): ")

    pattern = r'^[A-Z][a-z]* [A-Z][a-z]*$'
    if re.match(pattern, name):
        print("Valid name!")
        return True
    else:
        print("Invalid name. Make sure it's two capitalized words separated by a single space.")
        return False

validate_name()
