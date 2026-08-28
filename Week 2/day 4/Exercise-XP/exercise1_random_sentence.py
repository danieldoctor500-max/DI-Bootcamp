import random


def get_words_from_file(file_path):
    """Read words from a file and return them as a list."""
    with open(file_path, "r") as file:
        content = file.read()

    words = content.split()
    return words


def get_random_sentence(length):
    """Generate a random sentence with the specified number of words."""
    words = get_words_from_file("words.txt")

    selected_words = []

    for _ in range(length):
        word = random.choice(words)
        selected_words.append(word)

    sentence = " ".join(selected_words)
    sentence = sentence.lower()

    return sentence


def main():
    print("This program generates a random sentence.")
    print("The sentence will contain between 2 and 20 words.")

    try:
        length = int(input("How many words should the sentence contain? "))

        if length < 2 or length > 20:
            print("Error: Please enter a number between 2 and 20.")
            return

        sentence = get_random_sentence(length)

        print("\nGenerated sentence:")
        print(sentence)

    except ValueError:
        print("Error: Please enter a valid integer.")


if __name__ == "__main__":
    main()