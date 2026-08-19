# Hello world
str = "Hello, World!"
print(str * 4)

# Some Math
results =(99**3) * 8
print(results)

# What is the output?


# Your computer brand
computer_brand = "Apple"
print(f"I have a {computer_brand} computer.")

# Your Information
name = "Alex"
age = 25
shoe_size = 42

info = f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}."
print(info)

# A & B
a = 10
b = 5

if a > b:
    print("Hello World")

# Even & Odds
number = int(input("Enter a number: "))

if number % 2 == 0:
    print(f"{number} is even.")
else:
    print(f"{number} is odd.")

# What’s your name?
my_name = "Doctor"
user_name = input("What is your name? ")

if user_name.strip().title() == my_name:
    print("No way! We have the exact same name. Are you my evil twin?")
else:
    print(f"Nice to meet you, {user_name}! Though '{my_name}' is clearly superior. ")

# Tall enough to ride a roller coaster
height = float(input("Enter your height in cm: "))

if height > 145:
    print("You are tall enough to ride!")
else:
    print("Sorry, you need to grow a bit more before you can ride.")

