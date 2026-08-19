# Daily Challenge: Build up a string
import random

# 1. Ask for User Input
user_input = input("Enter a string that is exactly 10 characters long: ")

# 2. Check the Length of the String
if len(user_input) < 10:
    print("String not long enough.")
elif len(user_input) > 10:
    print("String too long.")
else:
    print("Perfect string")
    
    # 3. Print the First and Last Characters
    print(f"First character: {user_input[0]}")
    print(f"Last character: {user_input[-1]}")
    
    # 4. Build the String Character by Character
    print("\nProgressive String:")
    current_string = ""
    for char in user_input:
        current_string += char
        print(current_string)
        
    # 5. Bonus: Jumble the String
    char_list = list(user_input)
    random.shuffle(char_list)
    jumbled_string = "".join(char_list)
    print(f"\nJumbled string: {jumbled_string}")