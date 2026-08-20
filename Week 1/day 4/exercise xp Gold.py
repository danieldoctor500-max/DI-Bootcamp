#1; When will i Retire
CURRENT_YEAR = 2026
CURRENT_MONTH = 8
CURRENT_DAY = 20


def get_age(year, month, day):
    age = CURRENT_YEAR - year
    # Subtract 1 year if the birthday hasn't occurred yet this year
    if (month, day) > (CURRENT_MONTH, CURRENT_DAY):
        age -= 1
    return age


def can_retire(gender, date_of_birth):
    # Parse the 'yyyy/mm/dd' string into integer components
    year_str, month_str, day_str = date_of_birth.split("/")
    year, month, day = int(year_str), int(month_str), int(day_str)

    age = get_age(year, month, day)

    if gender == "m":
        return age >= 67
    elif gender == "f":
        return age >= 62
    return False


# User input and execution
user_gender = input("Enter your gender (m/f): ").lower().strip()
user_dob = input("Enter your birth date (yyyy/mm/dd): ").strip()

if can_retire(user_gender, user_dob):
    print("You can retire!")
else:
    print("You cannot retire yet.")

#2: Sum
def calculate_pattern_sum(X):
    # Convert X to string to create repeated patterns, then convert back to int
    x_str = str(X)
    term1 = int(x_str)
    term2 = int(x_str * 2)
    term3 = int(x_str * 3)
    term4 = int(x_str * 4)

    return term1 + term2 + term3 + term4

result = calculate_pattern_sum(3)
print(result) 

#3: Double Dice
import random


def throw_dice():
    return random.randint(1, 6)


def throw_until_doubles():
    throws = 0
    while True:
        throws += 1
        die1 = throw_dice()
        die2 = throw_dice()
        if die1 == die2:
            return throws


def main():
    # A list is ideal here for collecting each experiment's throw count
    results = []

    for _ in range(100):
        throws_needed = throw_until_doubles()
        results.append(throws_needed)

    total_throws = sum(results)
    average_throws = total_throws / len(results)

    print(f"Total throws: {total_throws}")
    print(f"Average throws to reach doubles: {average_throws:.2f}")


main()

