import random


class Game:

    def get_user_item(self):
        """Ask the user for rock/paper/scissors, validate it, and return it."""
        valid_items = ["rock", "paper", "scissors"]

        while True:
            user_input = input("Choose rock, paper, or scissors: ").strip().lower()

            if user_input in valid_items:
                return user_input

            print("Invalid choice. Please enter rock, paper, or scissors.")

    def get_computer_item(self):
        """Randomly select rock/paper/scissors for the computer."""
        valid_items = ["rock", "paper", "scissors"]
        return random.choice(valid_items)

    def get_game_result(self, user_item, computer_item):
        """Compare user_item and computer_item and return 'win', 'loss', or 'draw'."""
        if user_item == computer_item:
            return "draw"

        # Each key beats the item listed as its value
        beats = {
            "rock": "scissors",
            "scissors": "paper",
            "paper": "rock",
        }

        if beats[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Play one full round: get choices, determine result, print it, return it."""
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        print(f"\nYou chose: {user_item}")
        print(f"Computer chose: {computer_item}")

        if result == "win":
            print("You win!\n")
        elif result == "loss":
            print("You lose!\n")
        else:
            print("It's a draw!\n")

        return result