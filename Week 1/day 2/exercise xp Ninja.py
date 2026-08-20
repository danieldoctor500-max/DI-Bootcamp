#1: Formula
import math

C = 50
H = 30

user_input = input("Enter comma-separated values for D: ")
# Convert input string into a list of numbers, calculate Q, and round to nearest integer
d_values = [int(d.strip()) for d in user_input.split(",")]
results = [str(round(math.sqrt((2 * C * d) / H))) for d in d_values]

print(",".join(results))

#2: List of Intergers
import random

# Base setup (satisfying bonus 12, 13, and 14 variations seamlessly)
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]

# 2. Print information
print(f"a. Original list: {numbers}")
print(f"b. Sorted descending: {sorted(numbers, reverse=True)}")
print(f"c. Sum: {sum(numbers)}")

# 3 - 10. List manipulations and stats
print(f"3. First and last: {[numbers[0], numbers[-1]]}")
print(f"4. Numbers > 50: {[x for x in numbers if x > 50]}")
print(f"5. Numbers < 10: {[x for x in numbers if x < 10]}")
print("6. Numbers squared:", " ".join(str(x**2) for x in numbers))

unique_nums = list(set(numbers))
print(f"7. Unique numbers: {unique_nums} (Count: {len(unique_nums)})")
print(f"8. Average: {sum(numbers) / len(numbers)}")
print(f"9. Largest: {max(numbers)}")
print(f"10. Smallest: {min(numbers)}")

# 11. Bonus: Manual calculations without built-in functions
total = 0
largest = numbers[0]
smallest = numbers[0]
count = 0

for num in numbers:
    total += num
    count += 1
    if num > largest:
        largest = num
    if num < smallest:
        smallest = num

avg = total / count
print(f"11. Manual -> Sum: {total}, Avg: {avg}, Max: {largest}, Min: {smallest}")

# 12. Bonus: Get 10 numbers from user
user_numbers = []
for i in range(10):
    val = int(input(f"Enter integer {i+1} (-100 to 100): "))
    user_numbers.append(val)

# 13. Bonus: Generate 10 random integers
random_10 = [random.randint(-100, 100) for _ in range(10)]

# 14. Bonus: Random list size (at least 50 elements)
random_count = random.randint(50, 100)
dynamic_random_list = [random.randint(-100, 100) for _ in range(random_count)]

#3: Workin on a Paragraph
import re

paragraph = (
    "Python is an amazing language for learning to code. It is clear, concise, "
    "and readable. Do you enjoy coding in Python? I certainly do!"
)

# Character count
total_chars = len(paragraph)

# Sentence count using regex split on terminal punctuation (. ! ?)
sentences = [s for s in re.split(r'[.!?]+', paragraph) if s.strip()]
num_sentences = len(sentences)

# Word extraction (stripping punctuation for clean word counts)
words = re.findall(r'\b\w+\b', paragraph.lower())
num_words = len(words)
unique_words = set(words)
num_unique_words = len(unique_words)

# Bonuses
non_whitespace_chars = len(paragraph.replace(" ", "").replace("\n", ""))
avg_words_per_sentence = num_words / num_sentences if num_sentences > 0 else 0
non_unique_words_count = num_words - num_unique_words

print(f"Total characters: {total_chars}")
print(f"Total sentences: {num_sentences}")
print(f"Total words: {num_words}")
print(f"Unique words: {num_unique_words}")
print(f"Non-whitespace characters: {non_whitespace_chars}")
print(f"Average words per sentence: {avg_words_per_sentence:.2f}")
print(f"Amount of repeated (non-unique) words: {non_unique_words_count}")

#4: Frequency of the Words
user_input = "New to Python or choosing between Python 2 and Python 3? Read Python 2 or Python 3."

# Split text into tokens by whitespace
words = user_input.split()

# Count word frequencies
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1

# Print sorted alphanumerically by key
for word in sorted(counts.keys()):
    print(f"{word}:{counts[word]}")
