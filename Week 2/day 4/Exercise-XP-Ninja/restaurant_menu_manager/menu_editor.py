
import menu_manager
 
 
def prompt_new_valentine_item(menu):
    """Ask the manager for a new Valentine's item and try to add it."""
    print("Enter a Valentine's item.")
    name = input("Item name: ")
    price = input("Price (format XX,14): ")
 
    success, message = menu_manager.add_valentine_item(menu, name, price)
    print(("Yes" if success else "No ") + message)
    return success
 
 
def main():
    menu = menu_manager.load_menu()
    menu_manager.display_menu(menu)
 
    while True:
        prompt_new_valentine_item(menu)
        again = input("\nAdd another Valentine's item? (y/n): ").strip().lower()
        if again != "y":
            break
 
    print("\nFinal menu:")
    menu_manager.display_menu(menu)
 
 
if __name__ == "__main__":
    main()
 