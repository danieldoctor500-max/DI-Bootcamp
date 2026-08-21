#1: Insert Item at Index
def insert_item(lst, index, item):
    lst.insert(index, item)
    return lst
my_list = [3, 4, 6, 7]
print(insert_item(my_list, 4, 5))

#2: Count Spces in String
def count_spaces(text):
    return sum(1 for char in text if char == " ")

print(count_spaces("What a marvelous wonderful day"))  

#3: Count upper & lower case
def count_case(text):
    upper_count = sum(1 for char in text if char.isupper())
    lower_count = sum(1 for char in text if char.islower())
    return upper_count, lower_count

u, l = count_case("Bright Future")
print(f"Upper: {u}, Lower: {l}")

#4: Manual sum Array
def my_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(my_sum([1, 5, 4, 2]))

#5: Find max number in a list
def find_max(numbers):
    if not numbers:
        return None
    max_num = numbers[0]
    for num in numbers[1:]:
        if num > max_num:
            max_num = num
    return max_num

print(find_max([0, 1, 3, 50]))

#6: Factorial of a Number
def factorial(n):
    if n < 0:
        return None
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

print(factorial(4)) 

#7: Manual element count
def list_count(lst, target):
    count = 0
    for item in lst:
        if item == target:
            count += 1
    return count

print(list_count(["a", "a", "t", "o"], "a"))

#8: L2-norm of list
def norm(lst):
    sum_of_squares = sum(x**2 for x in lst)
    return sum_of_squares**0.5

print(norm([1, 2, 2])) 

#9: Monotonic Array Check
def is_mono(lst):
    increasing = all(lst[i] <= lst[i + 1] for i in range(len(lst) - 1))
    decreasing = all(lst[i] >= lst[i + 1] for i in range(len(lst) - 1))
    return increasing or decreasing

print(is_mono([7, 6, 5, 5, 2, 0]))
print(is_mono([2, 3, 3, 3]))
print(is_mono([1, 2, 0, 4]))

#10: Print the Longest word in a list
def print_longest_word(words):
    if not words:
        return
    longest = words[0]
    for word in words[1:]:
        if len(word) > len(longest):
            longest = word
    print(longest)

print_longest_word(["python", "javascript", "c", "html"])

#11: Separate integers & strings
def separate_types(mixed_list):
    integers = [x for x in mixed_list if isinstance(x, int)]
    strings = [x for x in mixed_list if isinstance(x, str)]
    return integers, strings

ints, strs = separate_types([1, "apple", 42, "banana", 3])
print("Integers:", ints)
print("Strings:", strs)

#12: Check Palindrome
def is_palindrome(text):
    clean_text = text.lower()
    return clean_text == clean_text[::-1]

print(is_palindrome("radar"))
print(is_palindrome("John"))

#13: Words longer than k
def sum_over_k(sentence, k):
    words = sentence.split()
    return sum(1 for word in words if len(word) > k)


sentence = "Do or do not there is no try"
print(sum_over_k(sentence, 2))

#14: Dict values average
def dict_avg(d):
    if not d:
        return 0
    return sum(d.values()) / len(d)

print(dict_avg({"a": 1, "b": 2, "c": 8, "d": 1})) 

#15: Find common divisors
def common_div(a, b):
    divisors = []
    limit = min(a, b)
    for i in range(2, limit + 1):
        if a % i == 0 and b % i == 0:
            divisors.append(i)
    return divisors

print(common_div(10, 20))

#16: Prime Number test
def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

print(is_prime(11))
print(is_prime(4))

#17: Filter even Index and Value
def weird_print(lst):
    result = [val for idx, val in enumerate(lst) if idx % 2 == 0 and val % 2 == 0]
    print(result)
    return result

weird_print([1, 2, 2, 3, 4, 5])

#18: Count types of Keyword arguments
def type_count(**kwargs):
    counts = {}
    for value in kwargs.values():
        val_type = type(value).__name__
        counts[val_type] = counts.get(val_type, 0) + 1

    formatted_output = ", ".join(f"{k}: {v}" for k, v in counts.items())
    print(formatted_output)
    return counts

type_count(a=1, b="string", c=1.0, d=True, e=False)

#19: Custom split Implementation
def custom_split(text, delimiter=None):
    result = []
    current_chunk = []

    for char in text:
        if (delimiter is None and char.isspace()) or (
            delimiter and char == delimiter
        ):
            if current_chunk or delimiter is not None:
                result.append("".join(current_chunk))
                current_chunk = []
        else:
            current_chunk.append(char)

    if current_chunk or (text and text[-1] == delimiter):
        result.append("".join(current_chunk))

    return result if delimiter else [s for s in result if s]


print(custom_split("hello world python"))  
print(custom_split("apple,banana,cherry", ","))

#20: Password Masker
def mask_password(password):
    return "*" * len(password)

print(mask_password("mypassword"))