from game import Game


def get_user_menu_choice():
    """Display the menu, get the user's choice, validate it, and return it."""
    valid_choices = ["1", "2", "3"]

    while True:
        print("\n===== ROCK PAPER SCISSORS =====")
        print("1. Play a new game")
        print("2. Show scores")
        print("3. Quit")

        choice = input("Enter your choice: ").strip()

        if choice in valid_choices:
            return choice

        print("Invalid choice. Please enter 1, 2, or 3.")


def print_results(results):
    """Print the results dictionary in a friendly format and thank the user."""
    print("\n----- Game Summary -----")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thanks for playing!")


def main():
    results = {
        "win": 0,
        "loss": 0,
        "draw": 0,
    }

    while True:
        choice = get_user_menu_choice()

        if choice == "1":
            game = Game()
            result = game.play()
            results[result] += 1

        elif choice == "2":
            print(f"\nWins: {results['win']}, Losses: {results['loss']}, Draws: {results['draw']}")

        elif choice == "3":
            print_results(results)
            break


if __name__ == "__main__":
    main()