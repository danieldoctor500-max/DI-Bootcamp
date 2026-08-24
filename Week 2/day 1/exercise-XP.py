#1: Cats
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat("Whiskers", 5)
cat2 = Cat("Felix", 9)
cat3 = Cat("Oliver", 8)

def find_oldest_cat(c1, c2, c3):
    oldest = c1
    if c2.age > oldest.age:
        oldest = c2
    if c3.age > oldest.age:
        oldest = c3
    return oldest

oldest_cat = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")

#2:Dogs
# Step 1: Create the Dog Class
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        jump_height = self.height * 2
        print(f"{self.name} jumps {jump_height} cm high!")

# Step 2: Create Dog Objects
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

# Step 3: Print Dog Details and Call Methods
print(f"David's dog: {davids_dog.name}, Height: {davids_dog.height} cm")
davids_dog.bark()
davids_dog.jump()

print(f"\nSarah's dog: {sarahs_dog.name}, Height: {sarahs_dog.height} cm")
sarahs_dog.bark()
sarahs_dog.jump()

# Step 4: Compare Dog Sizes
if davids_dog.height > sarahs_dog.height:
    print(f"\n{davids_dog.name} is bigger than {sarahs_dog.name}.")
elif sarahs_dog.height > davids_dog.height:
    print(f"\n{sarahs_dog.name} is bigger than {davids_dog.name}.")
else:
    print(f"\nBoth dogs are the same size!")

#3: Who's the song producer?
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

stairway.sing_me_a_song()

#4: Afternoon at the Zoo (Includes Bonus)
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
        self.grouped_animals = {}

    # Modified add_animal with *args as requested in Bonus
    def add_animal(self, *new_animals):
        for animal in new_animals:
            if animal not in self.animals:
                self.animals.append(animal)

    def get_animals(self):
        print("Animals in the zoo:", self.animals)

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} was sold.")

    def sort_animals(self):
        sorted_list = sorted(self.animals)
        self.grouped_animals = {}
        for animal in sorted_list:
            first_letter = animal[0].upper()
            if first_letter not in self.grouped_animals:
                self.grouped_animals[first_letter] = []
            self.grouped_animals[first_letter].append(animal)
        return self.grouped_animals

    def get_groups(self):
        for key, value in self.grouped_animals.items():
            print(f"{key}: {value}")


# Testing the Zoo implementation
brooklyn_safari = Zoo("Brooklyn Safari")

# Passing multiple animals at once thanks to *args bonus
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cat", "Cougar", "Lion", "Zebra")
brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()

brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()