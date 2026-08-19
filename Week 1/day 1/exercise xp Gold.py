# Hello World-I love Python
print("Hello world" * 4 + "I love python" * 4)

# What is the Season?
month = int(input("Enter a month number (1 to 12): "))

if month in [3, 4, 5]:
    print("Spring")
elif month in [6, 7, 8]:
    print("Summer")
elif month in [9, 10, 11]:
    print("Autumn")
elif month in [12, 1, 2]:
    print("Winter")
else:
    print("Invalid input! Please enter a number between 1 and 12.")