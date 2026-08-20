#What"s your Name
def get_full_name(first_name, last_name, middle_name=""):
    if middle_name:
        full_name = f"{first_name} {middle_name} {last_name}"
    else:
        full_name = f"{first_name} {last_name}"
    return full_name.title()

print(get_full_name(first_name="doctor", middle_name="daniel", last_name="lee"))
print(get_full_name(first_name="jany", last_name="jay"))

#2: From English to Morse
MORSE_CODE_DICT = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----",
}

# Reverse dictionary for decoding Morse to English
REVERSE_MORSE_DICT = {v: k for k, v in MORSE_CODE_DICT.items()}


def english_to_morse(text):
    words = text.upper().split(" ")
    morse_words = []
    for word in words:
        morse_letters = [
            MORSE_CODE_DICT[char] for char in word if char in MORSE_CODE_DICT
        ]
        morse_words.append(" ".join(morse_letters))
    return " / ".join(morse_words)


def morse_to_english(morse_code):
    words = morse_code.strip().split(" / ")
    english_words = []
    for word in words:
        letters = word.split(" ")
        english_letters = [
            REVERSE_MORSE_DICT[code]
            for code in letters
            if code in REVERSE_MORSE_DICT
        ]
        english_words.append("".join(english_letters))
    return " ".join(english_words)

morse = english_to_morse("HELLO WORLD")
print(f"Morse: {morse}")

english = morse_to_english(morse)
print(f"English: {english}")

#3: Box of Stars
def box_printer(*words):
    if not words:
        return
    max_len = max(len(word) for word in words)
    frame_width = max_len + 4

    print("*" * frame_width)
    for word in words:
        print(f"* {word.ljust(max_len)} *")
    print("*" * frame_width)

box_printer("Hello", "World", "in", "reallylongword", "a", "frame")

