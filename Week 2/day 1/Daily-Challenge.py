class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    # Step 3 & Step 8 (Bonus): Updated to support positional args, default count, AND **kwargs
    def add_animal(self, animal_type=None, count=1, **kwargs):
        # Handle standard positional calling: add_animal('cow', 5) or add_animal('sheep')
        if animal_type:
            if animal_type in self.animals:
                self.animals[animal_type] += count
            else:
                self.animals[animal_type] = count

        # Handle **kwargs calling: add_animal(cow=5, sheep=2, goat=12)
        for animal, qty in kwargs.items():
            if animal in self.animals:
                self.animals[animal] += qty
            else:
                self.animals[animal] = qty

    # Step 4: Display farm information
    def get_info(self):
        info_str = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info_str += f"{animal:<7} : {count}\n"
        info_str += "\n    E-I-E-I-0!"
        return info_str

    # Step 6 (Bonus): Get sorted list of animal types
    def get_animal_types(self):
        return sorted(list(self.animals.keys()))

    # Step 7 (Bonus): Get a short formatted summary sentence
    def get_short_info(self):
        types = self.get_animal_types()
        formatted_animals = []

        for animal in types:
            # Pluralize animal name if count > 1
            if self.animals[animal] > 1:
                formatted_animals.append(f"{animal}s")
            else:
                formatted_animals.append(animal)

        # Construct comma-separated string with 'and' before the last item
        if len(formatted_animals) > 1:
            animal_str = ", ".join(formatted_animals[:-1]) + f" and {formatted_animals[-1]}"
        elif formatted_animals:
            animal_str = formatted_animals[0]
        else:
            animal_str = "no animals"

        return f"{self.name}’s farm has {animal_str}."


# --- Step 5: Test Base Functionality ---
macdonald = Farm("McDonald")
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')
macdonald.add_animal('goat', 12)

print(macdonald.get_info())


print("-" * 30)

# --- Test Bonus Steps (Steps 6, 7 & 8) ---
print("Sorted animal types:", macdonald.get_animal_types())

print(macdonald.get_short_info())

# Testing Step 8 (**kwargs)
new_farm = Farm("Old McDonald")
new_farm.add_animal(cow=5, sheep=2, goat=12)
print("\n" + new_farm.get_short_info())