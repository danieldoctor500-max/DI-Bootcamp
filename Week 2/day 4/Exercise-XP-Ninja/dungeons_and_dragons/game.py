"""
game.py

Defines the Game class. Game is responsible for asking how many
players there are, creating one Character per player, storing them,
and exporting the whole roster to JSON and TXT. It never calculates
ability scores itself - that's Character's job.
"""

import json
import os

from character import Character

JSON_PATH = os.path.join(os.path.dirname(__file__), "characters.json")
TXT_PATH = os.path.join(os.path.dirname(__file__), "characters.txt")


class Game:
    """Manages a full session: multiple characters, plus exporting them."""

    def __init__(self):
        self.characters = []

    def add_character(self, name, age):
        """Create a new Character and store it."""
        character = Character(name, age)
        self.characters.append(character)
        return character

    def create_characters_from_input(self):
        """Ask how many players there are, then collect each one's info."""
        while True:
            raw = input("How many players are playing? ")
            if raw.strip().isdigit() and int(raw) > 0:
                num_players = int(raw)
                break
            print("Please enter a positive whole number.")

        for i in range(1, num_players + 1):
            print(f"\n--- Player {i} ---")
            name = input("Name: ").strip()
            while True:
                age_raw = input("Age: ").strip()
                if age_raw.isdigit() and int(age_raw) > 0:
                    age = int(age_raw)
                    break
                print("Please enter a valid positive age.")

            print("Generating character...")
            character = self.add_character(name, age)
            print(f"  -> {character.name} created!")

    def export_json(self, path=JSON_PATH):
        """Write every character's dict representation to a JSON file."""
        data = {"characters": [c.to_dict() for c in self.characters]}
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    def export_txt(self, path=TXT_PATH):
        """Write a nicely formatted, human-readable text file."""
        header = "=" * 32 + "\n       DUNGEONS & DRAGONS\n" + "=" * 32
        blocks = [header]
        for character in self.characters:
            blocks.append(character.to_txt())
        content = "\n\n".join(blocks) + "\n"
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

    def export_all(self, json_path=JSON_PATH, txt_path=TXT_PATH):
        """Convenience method: export both formats at once."""
        self.export_json(json_path)
        self.export_txt(txt_path)