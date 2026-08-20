#1: What are you Learning
def display_message():
    print("I am learning about functions in Python.")


display_message()

#2: What"s your Favourite Book
def favorite_book(title):
    print(f"One of my favorite books is {title}.")


favorite_book("Alice in Wonderland")

#3: Some Geography
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")


describe_city("Reykjavik", "Iceland")
describe_city("Paris")

#4: Random
import random


def compare_numbers(user_number):
    random_number = random.randint(1, 100)
    if user_number == random_number:
        print("Success!")
    else:
        print(
            f"Fail! Your number: {user_number}, Random number: {random_number}"
        )


compare_numbers(50)

#5: Let"s Create Some Personalized Shirt
def make_shirt(size="large", text="I love Python"):
    print(f"The size of the shirt is {size} and the text is {text}.")


# Large shirt with default message
make_shirt()

# Medium shirt with default message
make_shirt(size="medium")

# Custom size and text using keyword arguments
make_shirt(size="small", text="Hello!")

#6: Magicians
magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]


def show_magicians(names):
    for name in names:
        print(name)


def make_great(names):
    for i in range(len(names)):
        names[i] = f"{names[i]} the Great"


make_great(magician_names)
show_magicians(magician_names)

#7: Temperatue Advice(Bonus)
import random


def get_random_temp(season=None):
    # Adjust temperature bounds based on season
    if season == "winter":
        return round(random.uniform(-10.0, 5.0), 1)
    elif season == "spring":
        return round(random.uniform(6.0, 20.0), 1)
    elif season == "summer":
        return round(random.uniform(21.0, 40.0), 1)
    elif season == "autumn":
        return round(random.uniform(5.0, 18.0), 1)
    else:
        # Default float temperature if no season specified
        return round(random.uniform(-10.0, 40.0), 1)


def main():
    # Month-Based Season Bonus
    month = int(input("Enter a month number (1-12): "))

    if month in [12, 1, 2]:
        season = "winter"
    elif month in [3, 4, 5]:
        season = "spring"
    elif month in [6, 7, 8]:
        season = "summer"
    elif month in [9, 10, 11]:
        season = "autumn"
    else:
        season = None

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    # Temperature Advice
    if temp < 0:
        print("Brrr, that’s freezing! Wear some extra layers today.")
    elif 0 <= temp < 16:
        print("Quite chilly! Don’t forget your coat.")
    elif 16 <= temp < 24:
        print("Nice weather.")
    elif 24 <= temp <= 32:
        print("A bit warm, stay hydrated.")
    else:
        print("It’s really hot! Stay cool.")


main()

