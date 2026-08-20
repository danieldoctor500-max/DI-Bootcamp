#1: Birthday Lookup
birthdays = {
    "Alice": "2004/04/12",
    "Jane": "2003/11/23",
    "Ondiek": "2001/01/15",
    "Diana": "1999/08/30",
    "Eric": "2007/06/05"
}

print("Welcome to the Birthday Lookup App!")
print("You can look up the birthdays of the people in the list!\n")

name = input("Enter a person's name: ").strip()
birthday = birthdays.get(name)

print(f"{name}'s birthday is on {birthday}.")

#2: Birthday Advanced
birthdays = {
    "Alice": "2004/04/12",
    "Jane": "2003/11/23",
    "Ondiek": "2001/01/15",
    "Diana": "1999/08/30",
    "Eric": "2007/06/05"
}

print("Welcome to the Birthday Lookup App!")
print("Here are the names available in our system:")
for name in birthdays.keys():
    print(f"- {name}")

search_name = input("\nEnter a person's name to look up: ").strip()

if search_name in birthdays:
    print(f"{search_name}'s birthday is on {birthdays[search_name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {search_name}.")

#3:Add your Own Birthday
birthdays = {
    "Alice": "2004/04/12",
    "Jane": "2003/11/23",
    "Ondiek": "2001/01/15",
    "Diana": "1999/08/30",
    "Eric": "2007/06/05"
}

print("--- Add a New Entry ---")
new_name = input("Enter the person's name to add: ").strip()
new_bday = input("Enter their birthday (YYYY/MM/DD): ").strip()

# Add new person to dictionary
birthdays[new_name] = new_bday

print("\n--- Available Names ---")
for name in birthdays.keys():
    print(f"- {name}")

search_name = input("\nEnter a name to look up: ").strip()

if search_name in birthdays:
    print(f"{search_name}'s birthday is on {birthdays[search_name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {search_name}.")

#4: Fruit Shop
# Part 1: Printing item prices
items_simple = {
    "banana": 4,
    "apple": 2,
    "orange": 1.5,
    "pear": 3
}

for item, price in items_simple.items():
    print(f"The price for a {item} is ${price}.")

print("\n" + "-"*30 + "\n")

# Part 2: Calculating total cost of all stock
items_stock = {
    "banana": {"price": 4, "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5, "stock": 24},
    "pear": {"price": 3, "stock": 1}
}

total_inventory_cost = 0

for fruit, details in items_stock.items():
    item_total = details["price"] * details["stock"]
    total_inventory_cost += item_total

print(f"The total cost to buy everything in stock is: ${total_inventory_cost:.2f}")