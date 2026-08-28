from anagram_checker import AnagramChecker


def main():
    checker = AnagramChecker()

    while True:
        print("\n===== ANAGRAM CHECKER =====")
        print("1. Enter a word")
        print("2. Exit")

        choice = input("Choose an option: ").strip()

        if choice == "2":
            print("Goodbye!")
            break

        elif choice == "1":
            word = input("\nEnter a word: ").strip()

            if not word:
                print("Error: Please enter a word.")
                continue

            if len(word.split()) != 1:
                print("Error: Please enter only one word.")
                continue

            if not word.isalpha():
                print("Error: Only alphabetic characters are allowed.")
                continue

            word = word.lower()

            is_valid = checker.is_valid_word(word)
            anagrams = checker.get_anagrams(word)

            print("\n" + "=" * 40)
            print(f'YOUR WORD: "{word.upper()}"')

            if is_valid:
                print("This is a valid English word.")
            else:
                print("This is not a valid English word.")

            if anagrams:
                print("Anagrams for your word:")
                print(", ".join(sorted(anagrams)))
            else:
                print("No anagrams found.")

            print("=" * 40)

        else:
            print("Error: Please choose 1 or 2.")


if __name__ == "__main__":
    main()