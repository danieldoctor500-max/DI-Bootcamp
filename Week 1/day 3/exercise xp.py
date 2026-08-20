#1: Converting list to Dicts
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Using zip() and dict() constructor
res_dict = dict(zip(keys, values))
print(res_dict)

#2: Cinemax
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0

for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    
    print(f"{name.capitalize()} pays: ${price}")
    total_cost += price

print(f"\nTotal Cost: ${total_cost}")

#3: Zara
# 1. Create the dictionary
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# 2. Modify number_stores
brand["number_stores"] = 2

# 3. Sentence describing Zara's clients
clients = ", ".join(brand["type_of_clothes"])
print(f"Zara designs clothes for {clients}.")

# 4. Add country_creation
brand["country_creation"] = "Spain"

# 5. Check and append Desigual
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# 6. Delete creation_date
brand.pop("creation_date")

# 7. Print last item in international_competitors
print(f"Last competitor: {brand['international_competitors'][-1]}")

# 8. Print major colors in US
print(f"US Colors: {brand['major_color']['US']}")

# 9. Print number of keys
print(f"Number of keys: {len(brand)}")

# 10. Print all keys
print(f"Keys: {list(brand.keys())}")

#4: Disney Characters
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Map characters to indices
dict_1 = {user: i for i, user in enumerate(users)}
print(dict_1)

# 2. Map indices to characters
dict_2 = {i: user for i, user in enumerate(users)}
print(dict_2)

# 3. Sorted characters mapped to indices
dict_3 = {user: i for i, user in enumerate(sorted(users))}
print(dict_3)