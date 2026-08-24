#1: Geometry
import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * (self.radius ** 2)

    def definition(self):
        print("A circle is a 2D geometric shape consisting of all points in a plane that are at a given distance (radius) from a fixed point (center).")

# Example usage:
my_circle = Circle(5)
print(f"Perimeter: {my_circle.perimeter():.2f}")
print(f"Area: {my_circle.area():.2f}")
my_circle.definition()

#2: Custom List Class
import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def get_reversed(self):
        return list(reversed(self.letters))

    def get_sorted(self):
        return sorted(self.letters)

    # Bonus: Generate random numbers list with same length
    def generate_random_numbers(self):
        return [random.randint(1, 100) for _ in range(len(self.letters))]

letter_list = MyList(['d', 'a', 'c', 'b'])
print("Reversed:", letter_list.get_reversed())
print("Sorted:", letter_list.get_sorted())
print("Random numbers:", letter_list.generate_random_numbers())

#3:Restarant  Menu 
class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]

    def add_item(self, name, price, spice, gluten):
        new_dish = {
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten
        }
        self.menu.append(new_dish)
        print(f"Added {name} to the menu.")

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish["price"] = price
                dish["spice"] = spice
                dish["gluten"] = gluten
                print(f"Updated {name} in the menu.")
                return
        print(f"Error: '{name}' is not on the menu.")

    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                self.menu.remove(dish)
                print(f"Removed {name} from the menu.")
                print("Updated Menu:", self.menu)
                return
        print(f"Error: '{name}' is not on the menu.")


# Testing MenuManager
if __name__ == "__main__":
    manager = MenuManager()

    # Add a dish
    manager.add_item("Pizza", 12, "A", True)

    # Update a dish
    manager.update_item("Soup", 12, "B", False)

    # Try updating a non-existent dish
    manager.update_item("Tacos", 10, "C", True)

    # Remove a dish
    manager.remove_item("Salad")