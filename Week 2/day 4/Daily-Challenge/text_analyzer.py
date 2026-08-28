"""
text_analyzer.py

Text: a small text-analysis toolkit (word frequency, most common word,
unique words, loading from a file).

TextModification: inherits from Text and adds cleaning operations
(removing punctuation, stop words, and special characters).
"""

import re
import string

# A small, self-contained list of common English stop words.
STOP_WORDS = {
    "a", "an", "the", "and", "or", "but", "if", "so", "of", "at", "by",
    "for", "with", "about", "against", "between", "into", "through",
    "during", "before", "after", "above", "below", "to", "from", "up",
    "down", "in", "out", "on", "off", "over", "under", "again", "further",
    "then", "once", "is", "am", "are", "was", "were", "be", "been",
    "being", "have", "has", "had", "having", "do", "does", "did", "doing",
    "it", "its", "this", "that", "these", "those", "i", "you", "he",
    "she", "we", "they", "them", "his", "her", "their", "our", "your",
    "as", "not", "no",
}


class Text:
    """Represents a piece of text and offers a few analysis methods."""

    def __init__(self, text):
        self.text = text

    def _tokenize(self):
        """
        Return the text as a list of lowercase word tokens, with
        surrounding punctuation stripped (so "great." and "Great" both
        count as "great"). Uses re rather than a plain split() so
        punctuation doesn't get glued onto words.
        """
        return re.findall(r"[A-Za-z']+", self.text.lower())

    def word_frequency(self, word):
        """
        Count how many times `word` appears in the text (case-insensitive).
        Returns the count, or None if the word never appears.
        """
        words = self._tokenize()
        count = words.count(word.lower())
        return count if count > 0 else None

    def most_common_word(self):
        """
        Return the word that occurs most frequently in the text.
        Returns None if the text has no words.
        """
        words = self._tokenize()
        if not words:
            return None

        frequencies = {}
        for word in words:
            frequencies[word] = frequencies.get(word, 0) + 1

        return max(frequencies, key=frequencies.get)

    def unique_words(self):
        """Return the distinct words in the text, as a list."""
        return list(set(self._tokenize()))

    @classmethod
    def from_file(cls, file_path):
        """Read `file_path` and return a new Text instance with its content."""
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        return cls(content)

    def __repr__(self):
        preview = self.text if len(self.text) <= 40 else self.text[:37] + "..."
        return f"{self.__class__.__name__}({preview!r})"


class TextModification(Text):
    """A Text that can also clean itself up (punctuation, stop words, etc.)."""

    def remove_punctuation(self):
        """
        Strip standard punctuation (string.punctuation) from self.text
        using str.translate(), update self.text, and return the result.
        """
        translator = str.maketrans("", "", string.punctuation)
        self.text = self.text.translate(translator)
        # Collapse any double spaces left behind by the removal.
        self.text = re.sub(r"\s+", " ", self.text).strip()
        return self.text

    def remove_stop_words(self):
        """
        Remove common English stop words from self.text, update
        self.text, and return the result.
        """
        words = self.text.split()
        filtered = [w for w in words if w.lower() not in STOP_WORDS]
        self.text = " ".join(filtered)
        return self.text

    def remove_special_characters(self):
        """
        Use a regular expression to strip anything that isn't a letter,
        digit, or whitespace from self.text, update self.text, and
        return the result.
        """
        self.text = re.sub(r"[^A-Za-z0-9\s]", "", self.text)
        self.text = re.sub(r"\s+", " ", self.text).strip()
        return self.text