import random

wordslist = [
    'correction',
    'childish',
    'beach',
    'python',
    'assertive',
    'interference',
    'complete',
    'share',
    'credit card',
    'rush',
    'south'
]

word = random.choice(wordslist)

# Create the hidden version of the word
hidden_word = []

for letter in word:
    if letter == " ":
        hidden_word.append(" ")
    else:
        hidden_word.append("*")

# Body parts
body_parts = [
    "head",
    "body",
    "left arm",
    "right arm",
    "left leg",
    "right leg"
]

wrong_guesses = []
guessed_letters = []

print("Welcome to Hangman!")
print("The word has", len(word.replace(" ", "")), "letters.")
print(" ".join(hidden_word))

# Game loop
while True:

    # Ask the player for a letter
    guess = input("\nGuess a letter: ").lower()

    # Check that the player entered only one letter
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter one letter only.")
        continue

    # Prevent guessing the same letter twice
    if guess in guessed_letters:
        print("You already guessed that letter.")
        continue

    guessed_letters.append(guess)

    # Check whether the letter exists
    if guess in word.lower():
        print("Correct!")

        # Reveal every occurrence of the letter
        for i in range(len(word)):
            if word[i].lower() == guess:
                hidden_word[i] = word[i]

    else:
        print("Wrong guess!")
        wrong_guesses.append(guess)

        # Add the next body part
        body_part = body_parts[len(wrong_guesses) - 1]
        print("Added:", body_part)

    # Display current word
    print("\nWord:", " ".join(hidden_word))

    # Display wrong guesses
    if wrong_guesses:
        print("Wrong guesses:", ", ".join(wrong_guesses))

    # Check if the player has won
    if "*" not in hidden_word:
        print("\nCongratulations!")
        print("You solved the word:", word)
        break

    # Check if the player has lost
    if len(wrong_guesses) == 6:
        print("\nGame over!")
        print("The word was:", word)
        print("All six body parts have been added.")
        break