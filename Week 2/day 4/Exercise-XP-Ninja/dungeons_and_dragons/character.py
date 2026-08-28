"""
character.py

Defines the Character class. A Character is responsible for holding
its own name/age and for generating its own six ability scores by
rolling dice - the Game class never touches dice logic directly.
"""

import random

ABILITY_NAMES = [
    "strength",
    "dexterity",
    "constitution",
    "intelligence",
    "wisdom",
    "charisma",
]


class Character:
    """A single Dungeons & Dragons player character."""

    def __init__(self, name, age):
        self.name = name
        self.age = age

        # Generate all six abilities as soon as the character is created.
        self.strength = self.roll_ability()
        self.dexterity = self.roll_ability()
        self.constitution = self.roll_ability()
        self.intelligence = self.roll_ability()
        self.wisdom = self.roll_ability()
        self.charisma = self.roll_ability()

    @staticmethod
    def roll_ability():
        """
        Roll four 6-sided dice, drop the lowest, and return the sum of
        the remaining three - the standard D&D ability-score method.
        """
        rolls = [random.randint(1, 6) for _ in range(4)]
        rolls.remove(min(rolls))
        return sum(rolls)

    def to_dict(self):
        """Represent this character as a plain dict (for JSON export)."""
        return {
            "name": self.name,
            "age": self.age,
            "strength": self.strength,
            "dexterity": self.dexterity,
            "constitution": self.constitution,
            "intelligence": self.intelligence,
            "wisdom": self.wisdom,
            "charisma": self.charisma,
        }

    def to_txt(self):
        """Represent this character as a human-readable text block."""
        lines = [
            f"Character: {self.name}",
            f"Age: {self.age}",
            "",
            f"Strength: {self.strength}",
            f"Dexterity: {self.dexterity}",
            f"Constitution: {self.constitution}",
            f"Intelligence: {self.intelligence}",
            f"Wisdom: {self.wisdom}",
            f"Charisma: {self.charisma}",
        ]
        return "\n".join(lines)

    def __repr__(self):
        return f"Character(name={self.name!r}, age={self.age})"