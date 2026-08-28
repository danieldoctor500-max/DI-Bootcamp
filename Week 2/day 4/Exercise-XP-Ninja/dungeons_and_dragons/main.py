"""
main.py

Entry point. Only responsible for starting the app, creating the
Game, and calling the right Game methods in order.
"""

from game import Game


def main():
    print("=== Dungeons & Dragons Character Generator ===\n")

    game = Game()
    game.create_characters_from_input()
    game.export_all()

    print(f"\nAll {len(game.characters)} character(s) generated!")
    print("Saved to characters.json and characters.txt")


if __name__ == "__main__":
    main()