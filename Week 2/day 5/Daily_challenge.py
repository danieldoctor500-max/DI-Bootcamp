#2: Create a deck of cards class
import random


class Card:
    """Represents a single playing card with a suit and a value."""

    SUITS = ("Hearts", "Diamonds", "Clubs", "Spades")
    VALUES = ("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")

    def __init__(self, suit, value):
        if suit not in Card.SUITS:
            raise ValueError(f"Invalid suit: {suit}")
        if value not in Card.VALUES:
            raise ValueError(f"Invalid value: {value}")
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"


class Deck:
    """Represents a deck of 52 playing cards (does NOT inherit from Card)."""

    def __init__(self):
        self.cards = self._build_full_deck()

    def _build_full_deck(self):
        """Builds a fresh, ordered list of all 52 Card objects."""
        return [Card(suit, value) for suit in Card.SUITS for value in Card.VALUES]

    def shuffle(self):
        """
        Ensures the deck has all 52 cards, then rearranges them randomly.
        Calling this always resets to a full 52-card deck before shuffling,
        so previously dealt cards are restored.
        """
        self.cards = self._build_full_deck()
        random.shuffle(self.cards)
        return self.cards

    def deal(self):
        """
        Deals (removes and returns) a single card from the top of the deck.
        Raises an error if the deck is empty.
        """
        if not self.cards:
            raise IndexError("Cannot deal from an empty deck.")
        return self.cards.pop()

    def __len__(self):
        return len(self.cards)

    def __repr__(self):
        return f"Deck({len(self.cards)} cards remaining)"


if __name__ == "__main__":
    deck = Deck()
    print(f"New deck created: {len(deck)} cards")

    deck.shuffle()
    print(f"After shuffle: {len(deck)} cards")
    print("First 5 cards in shuffled order:", deck.cards[:5])

    print("\nDealing 3 cards:")
    for _ in range(3):
        dealt_card = deck.deal()
        print(f"  Dealt: {dealt_card}")

    print(f"\nCards remaining in deck: {len(deck)}")

    # Sanity check: dealing all cards empties the deck
    remaining = len(deck)
    for _ in range(remaining):
        deck.deal()
    print(f"After dealing the rest, deck length: {len(deck)}")

    try:
        deck.deal()
    except IndexError as e:
        print(f"Expected error when dealing from empty deck: {e}")