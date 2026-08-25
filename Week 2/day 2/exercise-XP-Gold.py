#1: Bank Account
class BankAccount:
    def __init__(self, username, password, balance=0):
        self.username = username
        self.password = password
        self.balance = balance
        self.authenticated = False

    def authenticate(self, username, password):
        if self.username == username and self.password == password:
            self.authenticated = True
            return True
        return False

    def deposit(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform a deposit.")
        if amount <= 0:
            raise Exception("Deposit amount must be a positive integer.")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform a withdrawal.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")
        if self.balance - amount < 0:
            raise Exception("Insufficient funds.")
        self.balance -= amount
        return self.balance


class MinimumBalanceAccount(BankAccount):
    def __init__(self, username, password, balance=0, minimum_balance=0):
        super().__init__(username, password, balance)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        if not self.authenticated:
            raise Exception("Authentication required to perform a withdrawal.")
        if amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")
        if self.balance - amount < self.minimum_balance:
            raise Exception(f"Cannot withdraw. Balance must remain above minimum balance of {self.minimum_balance}.")
        self.balance -= amount
        return self.balance


class ATM:
    def __init__(self, account_list, try_limit):
        # Validate account list
        if not isinstance(account_list, list) or not all(isinstance(acc, BankAccount) for acc in account_list):
            raise Exception("account_list must be a list containing BankAccount or MinimumBalanceAccount instances.")
        self.account_list = account_list

        # Validate try_limit
        if not isinstance(try_limit, (int, float)) or try_limit <= 0:
            print("Invalid try_limit input. Setting try_limit to default value of 2.")
            self.try_limit = 2
        else:
            self.try_limit = try_limit

        self.current_tries = 0
        self.show_main_menu()

    def show_main_menu(self):
        while True:
            print("\n=== ATM MAIN MENU ===")
            print("1. Log in")
            print("2. Exit")
            choice = input("Select an option (1 or 2): ").strip()

            if choice == "1":
                username = input("Enter username: ")
                password = input("Enter password: ")
                self.log_in(username, password)
            elif choice == "2":
                print("Thank you for using the ATM. Goodbye!")
                break
            else:
                print("Invalid selection. Please try again.")

    def log_in(self, username, password):
        authenticated_account = None
        for account in self.account_list:
            if account.authenticate(username, password):
                authenticated_account = account
                break

        if authenticated_account:
            self.current_tries = 0  # Reset counter upon successful login
            print(f"\nWelcome, {authenticated_account.username}!")
            self.show_account_menu(authenticated_account)
        else:
            self.current_tries += 1
            remaining = self.try_limit - self.current_tries
            print(f"Invalid username or password. Remaining attempts: {remaining}")
            
            if self.current_tries >= self.try_limit:
                print("Maximum login attempts reached. System shutting down.")
                exit()

    def show_account_menu(self, account):
        while True:
            print(f"\n--- Account Menu ({account.username}) ---")
            print(f"Current Balance: ${account.balance}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Log out")
            choice = input("Select an option (1-3): ").strip()

            if choice == "1":
                try:
                    amount = int(input("Enter deposit amount: "))
                    account.deposit(amount)
                    print(f"Deposit successful. New balance: ${account.balance}")
                except Exception as e:
                    print(f"Error: {e}")

            elif choice == "2":
                try:
                    amount = int(input("Enter withdrawal amount: "))
                    account.withdraw(amount)
                    print(f"Withdrawal successful. New balance: ${account.balance}")
                except Exception as e:
                    print(f"Error: {e}")

            elif choice == "3":
                account.authenticated = False  # Log out the user
                print("Logged out successfully.")
                break
            else:
                print("Invalid choice. Please pick 1, 2, or 3.")


# Example Usage & Testing
if __name__ == "__main__":
    acc1 = BankAccount("john_doe", "pass123", balance=500)
    acc2 = MinimumBalanceAccount("jane_doe", "secure456", balance=1000, minimum_balance=100)

    # Initialize ATM with accounts and a try limit of 3
    atm = ATM(account_list=[acc1, acc2], try_limit=3)