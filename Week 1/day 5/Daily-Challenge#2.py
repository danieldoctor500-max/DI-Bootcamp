import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]

target_number = 3728


def find_pairs(numbers, target):
    pairs = []

    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                pairs.append((numbers[i], numbers[j]))

    return pairs


pairs = find_pairs(list_of_numbers, target_number)

for number1, number2 in pairs:
    print(number1, "and", number2, "sums to", target_number)