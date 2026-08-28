
import json
import re
import os
 
JSON_PATH = os.path.join(os.path.dirname(__file__), "restaurant_menu.json")

CONNECTION_WORDS = {"of", "and", "with", "in", "the", "a", "for"}
 
 

def load_menu():
    """Load the menu JSON file and return it as a dict."""
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
 
 
def save_menu(menu):
    """Write the menu dict back to the JSON file."""
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(menu, f, indent=4, ensure_ascii=False)
 
 
def validate_name(name):
    """
    Validate a Valentine's item name against every rule:
      1. First word must start with an uppercase 'V'.
      2. Every "normal" word starts with an uppercase letter.
      3. Connection words (of, and, with, ...) start lowercase.
      4. The name must contain at least two letters 'e' (case-insensitive).
      5. The name must not contain any digits.
 
    Returns (True, "") if valid, or (False, "<reason>") if not.
    """
    name = name.strip()
 
    if not name:
        return False, "The item name cannot be empty."
 
    if re.search(r"\d", name):
        return False, "The item name must not contain any numbers."
 
    words = name.split()
 
    if not re.match(r"^V", words[0]):
        return False, "The first word of the name must start with a capital 'V'."
 
    for word in words:

        clean_word = re.sub(r"[^A-Za-z-]", "", word)
        if not clean_word:
            continue
 
        first_letter = clean_word[0]
        lowered = clean_word.lower()
 
        if lowered in CONNECTION_WORDS:
            if not re.match(r"^[a-z]", clean_word):
                return False, f"Connection word '{word}' must start with a lowercase letter."
        else:
            if not re.match(r"^[A-Z]", clean_word):
                return False, f"Word '{word}' must start with an uppercase letter."
 
    if len(re.findall(r"[eE]", name)) < 2:
        return False, "The item name must contain at least two letters 'e'."
 
    return True, ""
 
 
def validate_price(price):
    """
    Validate a price string. Required format: XX,14 (two digits, comma, 14).
    Returns (True, "") if valid, or (False, "<reason>") if not.
    """
    price = price.strip()
    if not re.fullmatch(r"\d{2},14", price):
        return False, "The price must follow the pattern XX,14 (e.g. 20,14)."
    return True, ""
 
 
def display_heart():
    """
    Print a heart made of '*' characters, generated with loops using the
    classic heart curve (x^2 + y^2 - 1)^3 - x^2*y^3 <= 0, scanned over a
    grid rather than stored as a hard-coded string.
    """
    width, height = 40, 20
    for row in range(height):
        line = ""
        for col in range(width):
            x = (col / width) * 3 - 1.5
            y = (row / height) * -3 + 1.5
            x *= 1.3
            value = (x ** 2 + y ** 2 - 1) ** 3 - (x ** 2) * (y ** 3)
            line += "*" if value <= 0 else " "
        print(line.rstrip())
 
 
def display_menu(menu):
    """Display the full menu, always preceded by the heart."""
    display_heart()
    print("\n===== TODAY'S MENU =====")
    for item, price in menu.get("items", {}).items():
        print(f"  {item:<25} {price}")
 
    valentine_items = menu.get("valentine_items", [])
    if valentine_items:
        print("\n===== VALENTINE'S SPECIALS =====")
        for entry in valentine_items:
            print(f"  {entry['name']:<35} {entry['price']}")
    print()
 
 
def add_valentine_item(menu, name, price):
    """
    Validate and, if valid, add a Valentine's item to the menu dict
    and persist it to the JSON file.
 
    Returns (True, "Success message") or (False, "Error reason").
    """
    name_ok, name_error = validate_name(name)
    if not name_ok:
        return False, name_error
 
    price_ok, price_error = validate_price(price)
    if not price_ok:
        return False, price_error
 
    menu.setdefault("valentine_items", []).append({"name": name.strip(), "price": price.strip()})
    save_menu(menu)
    return True, f"'{name.strip()}' was added to the Valentine's menu!"