# Favorite Numbers
my_fav_numbers = {7, 13, 21}

# Add two new numbers
my_fav_numbers.add(42)
my_fav_numbers.add(99)

friend_fav_numbers = {3, 14, 42}

our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print(our_fav_numbers)

#2 tuples
my_tuple = (1, 2, 3)
# my_tuple.append(4)  # Raises AttributeError!

# Workaround: concatenate and reassign
my_tuple = my_tuple + (4, 5)
print(my_tuple)  # (1, 2, 3, 4, 5)

#3 List Manipulation
basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")

apple_count = basket.count("Apples")
print(f"Apples count: {apple_count}")  # Output: 2

basket.clear()
print("Final basket:", basket)  # Output: []

#4 Floats
# Generate using a list comprehension and range
sequence = [x / 2 for x in range(3, 11)]

# Convert whole float values (e.g., 2.0) to integers
sequence = [int(x) if x.is_integer() else x for x in sequence]

print(sequence)  # [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

#5 For Loops
# All numbers from 1 to 20
for num in range(1, 21):
    print(num)

# Numbers where index/position is even (using step of 2)
for num in range(2, 21, 2):
    print(num)

#6 While Loops
while True:
    name = input("Enter your name: ")

    # Check that name contains only alphabetic characters and length >= 3
    if name.isalpha() and len(name) >= 3:
        print("thank you")
        break
    else:
        print("Invalid name. Please enter at least 3 letters without numbers or symbols.")

#7 Favourite Fruits
fav_fruits_input = input("Enter your favorite fruits (separated by spaces): ")
fav_fruits = fav_fruits_input.split()

chosen_fruit = input("Enter the name of any fruit: ")

if chosen_fruit in fav_fruits:
    print("You chose one of your favorite fruits! Enjoy!")
else:
    print("You chose a new fruit. I hope you enjoy it!")

#8 Pizza Toppings
toppings = []

while True:
    topping = input("Enter a pizza topping (or 'quit' to finish): ")
    if topping.lower() == 'quit':
        break

    toppings.append(topping)
    print(f"Adding {topping} to your pizza.")

total_cost = 10.0 + (len(toppings) * 2.50)

print(f"\nYour toppings: {', '.join(toppings)}")
print(f"Total cost: ${total_cost:.2f}")

#9 Cinemax Tickets
# Main Ticket Calculation
ages_input = input("Enter ages of family members separated by space: ").split()
total_cost = 0

for age_str in ages_input:
    age = int(age_str)
    if age < 3:
        total_cost += 0
    elif 3 <= age <= 12:
        total_cost += 10
    else:
        total_cost += 15

print(f"Total ticket cost: ${total_cost}")

# Bonus: Restricted Movie Filter
names_and_ages = [("Alice", 15), ("Bob", 17), ("Charlie", 20), ("David", 22)]
allowed_attendees = []

for name, age in names_and_ages:
    if 16 <= age <= 21:
        allowed_attendees.append(name)

print("Allowed attendees:", allowed_attendees)

