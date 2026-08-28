from menu_manager import MenuManager
 
 
def load_manager():
    """
    Create and return a new MenuManager instance.
    """
    return MenuManager()
 
 
def show_restaurant_menu(manager):
    """
    Print the restaurant's menu in a readable format.
    """
    items = manager.menu["items"]
 
    if not items:
        print("\nThe menu is currently empty.")
        return
 
    print("\n----- Restaurant Menu -----")
    for item in items:
        print(f"{item['name']:<20} ${item['price']:.2f}")
    print("----------------------------")
 
 
def add_item_to_menu(manager):
    """
    Ask the user for a new item's name and price, and add it via MenuManager.
    """
    name = input("Enter the item's name: ").strip()
 
    price_input = input("Enter the item's price: ").strip()
    try:
        price = float(price_input)
    except ValueError:
        print("Error: Price must be a number. Item was not added.")
        return
 
    if not name:
        print("Error: Item name cannot be empty. Item was not added.")
        return
 
    manager.add_item(name, price)
    print("Item was added successfully.")
 
 
def remove_item_from_menu(manager):
    """
    Ask the user for an item name and remove it via MenuManager.
    """
    name = input("Enter the name of the item to remove: ").strip()
 
    removed = manager.remove_item(name)
    if removed:
        print(f"'{name}' was removed successfully.")
    else:
        print(f"Error: '{name}' was not found on the menu.")
 
 
def show_user_menu():
    """
    Display the program's menu (not the restaurant's menu) and
    return the user's chosen option.
    """
    print("\n===== Menu Manager =====")
    print("1. View menu")
    print("2. Add item")
    print("3. Remove item")
    print("4. Exit")
    return input("Choose an option (1-4): ").strip()
 
 
def main():
    manager = load_manager()
 
    while True:
        choice = show_user_menu()
 
        if choice == "1":
            show_restaurant_menu(manager)
        elif choice == "2":
            add_item_to_menu(manager)
        elif choice == "3":
            remove_item_from_menu(manager)
        elif choice == "4":
            manager.save_to_file()
            print("Menu was saved.")
            print("Goodbye!")
            break
        else:
            print("Invalid option. Please choose a number between 1 and 4.")
 
 
if __name__ == "__main__":
    main()
 