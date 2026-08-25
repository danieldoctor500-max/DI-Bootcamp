#1 Pets
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Step 1: Create the Siamese Class
class Siamese(Cat):
    pass

# Step 2: Create a List of Cat Instances
bengal_obj = Bengal("Tiger", 3)
chartreux_obj = Chartreux("Smokey", 5)
siamese_obj = Siamese("Milo", 2)

all_cats = [bengal_obj, chartreux_obj, siamese_obj]

# Step 3: Create a Pets Instance
sara_pets = Pets(all_cats)

# Step 4: Take Cats for a Walk
sara_pets.walk()

#2: Dogs
# Step 1: Create the Dog Class
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        self_force = self.run_speed() * self.weight
        other_force = other_dog.run_speed() * other_dog.weight

        if self_force > other_force:
            return f"{self.name} won the fight!"
        elif other_force > self_force:
            return f"{other_dog.name} won the fight!"
        else:
            return "It's a tie!"

# Step 2: Create Dog Instances
dog1 = Dog("Rex", 4, 25)
dog2 = Dog("Max", 2, 30)
dog3 = Dog("Bella", 5, 15)

# Step 3: Test Dog Methods
print(dog1.bark())
print(f"{dog2.name}'s speed: {dog2.run_speed()}")
print(dog1.fight(dog2))

#3: Dogs Domesticated
import random

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # Collect all dog names including self and any other Dog/PetDog instances passed
        names = [self.name]
        for dog in args:
            if isinstance(dog, Dog):
                names.append(dog.name)
            else:
                names.append(str(dog))
        
        names_str = ", ".join(names)
        print(f"{names_str} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll",
                "stands on his back legs",
                "shakes your hand",
                "plays dead"
            ]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} is not trained yet!")

# Step 3: Test PetDog Methods
my_dog = PetDog("Fido", 2, 10)
other_dog1 = PetDog("Buddy", 3, 15)
other_dog2 = PetDog("Max", 1, 8)

my_dog.train()
my_dog.play(other_dog1, other_dog2)
my_dog.do_a_trick()

#4: Family an Person Classes
# Step 1: Create the Person Class
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18


# Step 2: Create the Family Class
class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return
        print(f"Member named {first_name} was not found in the family.")

    def family_presentation(self):
        print(f"\n--- {self.last_name} Family ---")
        for member in self.members:
            print(f"Name: {member.first_name} {member.last_name}, Age: {member.age}")


# Testing the Family and Person Classes
smith_family = Family("Smith")

# Add members
smith_family.born("Alice", 20)
smith_family.born("Bob", 15)

# Presentation
smith_family.family_presentation()

# Check majority
smith_family.check_majority("Alice")
smith_family.check_majority("Bob")