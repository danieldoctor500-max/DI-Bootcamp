# Challenge 1: Multiples of a Number
number = int(input("Enter a number: "))
length = int(input("Enter the length : "))

multiples = [number * i for i in range(1, length + 1)]
print(multiples)

# Challenge 2: Remove Consecutive Duplicate Letters
# Get user input
word = input("Enter a word: ")

# Initialize an empty string for the result
result = ""

# Loop through each character in the word
for char in word:
    # Append char only if result is empty or the last added character is different
    if not result or char != result[-1]:
        result += char

# Print the modified string
print(result)