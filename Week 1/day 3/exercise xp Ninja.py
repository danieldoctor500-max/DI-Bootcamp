#1: Cars
# Initial string and conversion
cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
cars_list = cars_str.split(", ")

# 1. Number of manufacturers
print(f"Total manufacturers: {len(cars_list)}")

# 2. Reverse/Descending order (Z-A)
sorted_descending = sorted(cars_list, reverse=True)
print(f"Descending order: {sorted_descending}")

# 3. Filtering using list comprehension
o_count = len([car for car in cars_list if 'o' in car.lower()])
no_i_count = len([car for car in cars_list if 'i' not in car.lower()])

print(f"Names containing 'o': {o_count}")
print(f"Names without 'i': {no_i_count}")

duplicates_list = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

# Remove duplicates while maintaining a clean set structure
unique_cars = list(set(duplicates_list))
formatted_str = ", ".join(unique_cars)

print(f"Unique companies string: {formatted_str}")
print(f"Number of unique companies: {len(unique_cars)}")

# Sort alphabetically (A-Z), then reverse character order for each string
reversed_names_sorted = [car[::-1] for car in sorted(cars_list)]

print(f"Ascending order with reversed letters: {reversed_names_sorted}")

