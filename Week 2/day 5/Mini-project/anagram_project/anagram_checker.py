class AnagramChecker:
    def __init__(self, word_list_file="sowpods.txt"):
        with open(word_list_file, "r") as file:
            self.words = {
                line.strip().lower()
                for line in file
                if line.strip()
            }

    def is_valid_word(self, word):
        return word.lower() in self.words

    def is_anagram(self, word1, word2):
        word1 = word1.lower()
        word2 = word2.lower()

        if word1 == word2:
            return False

        return sorted(word1) == sorted(word2)

    def get_anagrams(self, word):
        word = word.lower()
        anagrams = []

        for candidate in self.words:
            if self.is_anagram(word, candidate):
                anagrams.append(candidate)

        return anagrams