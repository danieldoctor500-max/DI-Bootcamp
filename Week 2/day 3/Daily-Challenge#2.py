from googletrans import Translator

french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]


def translate_words(words, src="fr", dest="en"):
    """Translate a list of words/phrases and return a dict {original: translation}."""
    translator = Translator()
    result = {}

    for word in words:
        translation = translator.translate(word, src=src, dest=dest)
        result[word] = translation.text

    return result


if __name__ == "__main__":
    translated = translate_words(french_words)
    print(translated)