# Step 1: Representing the Game Board
def create_board():
    return [[" " for _ in range(3)] for _ in range(3)]


# Step 2: Displaying the Game Board
def display_board(board):
    print("\n  0   1   2")
    for idx, row in enumerate(board):
        print(f"{idx} " + " | ".join(row))
        if idx < 2:
            print("  " + "---+" * 2 + "---")
    print()


# Step 3: Getting Player Input
def player_input(board, player):
    while True:
        try:
            move = input(
                f"Player {player}, enter row and column (0-2) separated by space: "
            ).split()
            if len(move) != 2:
                print("Invalid format. Please enter two numbers (e.g., '0 1').")
                continue

            row, col = int(move[0]), int(move[1])

            if row not in range(3) or col not in range(3):
                print("Out of bounds. Numbers must be 0, 1, or 2.")
            elif board[row][col] != " ":
                print("That spot is already taken! Try again.")
            else:
                return row, col
        except ValueError:
            print("Invalid input. Please enter valid integer numbers.")


# Step 4: Checking for a Winner
def check_win(board, player):
    # Check rows and columns
    for i in range(3):
        if all(board[i][j] == player for j in range(3)) or all(
            board[j][i] == player for j in range(3)
        ):
            return True

    # Check diagonals
    if all(board[i][i] == player for i in range(3)) or all(
        board[i][2 - i] == player for i in range(3)
    ):
        return True

    return False


# Step 5: Checking for a Tie
def check_tie(board):
    return all(cell != " " for row in board for cell in row)


# Step 6: The Main Game Loop
def play():
    board = create_board()
    current_player = "X"

    while True:
        display_board(board)

        # Get valid move and update board
        row, col = player_input(board, current_player)
        board[row][col] = current_player

        # Check win condition
        if check_win(board, current_player):
            display_board(board)
            print(f"Congratulations! Player {current_player} wins!")
            break

        # Check tie condition
        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break

        # Switch players
        current_player = "O" if current_player == "X" else "X"


if __name__ == "__main__":
    play()