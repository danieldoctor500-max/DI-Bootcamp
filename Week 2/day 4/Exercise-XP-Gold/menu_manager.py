import json
 
MENU_FILE_PATH = "restaurant_menu.json"
 
 
class MenuManager:
    def __init__(self, file_path=MENU_FILE_PATH):
        """
        Load the menu from the JSON file and store it in self.menu.
 
        Args:
            file_path (str): Path to the JSON file holding the menu.
        """
        self.file_path = file_path
        self.menu = self._load_menu()
 
    def _load_menu(self):
        """
        Read the JSON file and return its contents as a Python dict.
        If the file doesn't exist or is invalid, start with an empty menu.
        """
        try:
            with open(self.file_path, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"Warning: '{self.file_path}' not found. Starting with an empty menu.")
            return {"items": []}
        except json.JSONDecodeError:
            print(f"Warning: '{self.file_path}' contains invalid JSON. Starting with an empty menu.")
            return {"items": []}
 
    def add_item(self, name, price):
        """
        Add a new item to the in-memory menu (does not save to file).
 
        Args:
            name (str): Name of the item.
            price (float): Price of the item.
        """
        self.menu["items"].append({"name": name, "price": price})
 
    def remove_item(self, name):
        """
        Remove an item from the in-memory menu by name (does not save to file).
 
        Args:
            name (str): Name of the item to remove.
 
        Returns:
            bool: True if the item was found and removed, False otherwise.
        """
        items = self.menu["items"]
        for index, item in enumerate(items):
            if item["name"].lower() == name.lower():
                del items[index]
                return True
        return False
 
    def save_to_file(self):
        """
        Write the current in-memory menu to the JSON file.
        """
        with open(self.file_path, "w") as file:
            json.dump(self.menu, file, indent=4)
 