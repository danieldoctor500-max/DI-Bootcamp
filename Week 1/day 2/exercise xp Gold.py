#1: Concatenate lists
list1 = [1, 2, 3]
list2 = [4, 5, 6]

list1.extend(list2)
print(list1) 

#2: Range of Numbers
for num in range(1500, 2501):
    if num % 5 == 0 and num % 7 == 0:
        print(num)

#3: Check Index
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

if user_name in names:
    print(names.index(user_name))

#4: Greatest Number
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

if user_name in names:
    print(names.index(user_name))

#5: The Alphabet
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

if user_name in names:
    print(names.index(user_name))

#6: Words and Letters
words = [input(f"Enter word {i+1}/7: ") for i in range(7)]
letter = input("Enter a single letter to search for: ")

for word in words:
    index = word.find(letter)
    if index != -1:
        print(f"In '{word}', '{letter}' first appears at index {index}.")
    else:
        print(f"Sorry, the letter '{letter}' is not in '{word}'.")

#7: Min,Max,Sum
numbers = list(range(1, 1000001))

print("Minimum:", min(numbers))
print("Maximum:", max(numbers))
print("Sum:", sum(numbers))

#8: List and Tuple
user_input = input("Enter comma-separated numbers: ")

num_list = user_input.split(",")
num_tuple = tuple(num_list)

print(num_list)
print(num_tuple)

#9: Random number (Includes Bonuses)
import random

wins = 0
losses = 0

while True:
    user_input = input("Guess a number between 1 and 9 (or type 'quit' to stop): ").lower()
    
    if user_input == 'quit':
        break
    
    if not user_input.isdigit() or not (1 <= int(user_input) <= 9):
        print("Please enter a valid number from 1 to 9.")
        continue
    
    user_guess = int(user_input)
    secret_num = random.randint(1, 9)
    
    if user_guess == secret_num:
        print("Winner!\n")
        wins += 1
    else:
        print(f"Better luck next time. The number was {secret_num}.\n")
        losses += 1

print(f"\nGame Over! Total Wins: {wins} | Total Losses: {losses}")

