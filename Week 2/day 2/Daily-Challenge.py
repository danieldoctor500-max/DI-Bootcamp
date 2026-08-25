import math


class Pagination:
    def __init__(self, items=None, page_size=10):
        # Step 2: Initialize attributes
        self.items = items if items is not None else []
        self.page_size = int(page_size)
        self.current_idx = 0 

        self.total_pages = math.ceil(len(self.items) / self.page_size) if self.items else 1

    def get_visible_items(self):

        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    # Step 4: Navigation Methods
    def go_to_page(self, page_num):
        """
        Navigates to the specified page number (1-based indexing).
        Raises ValueError if out of bounds.
        """
        page_num = int(page_num)
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number {page_num} is out of range. Valid pages: 1 to {self.total_pages}.")
        
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    # Step 5: Custom __str__() representation
    def __str__(self):
        return "\n".join(str(item) for item in self.get_visible_items())


# Step 6: Testing the Code
if __name__ == "__main__":
    alphabet_list = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabet_list, 4)

    # 1. Initial page visible items
    print(p.get_visible_items())  

    # 2. Move to next page
    p.next_page()
    print(p.get_visible_items()) 
    # 3. Move to last page
    p.last_page()
    print(p.get_visible_items()) 
    # 4. Bonus: Method Chaining (camelCase vs snake_case chaining demonstration)
    print("\n--- Testing Method Chaining ---")
    p.first_page().next_page().next_page().next_page()
    print(p.get_visible_items())  # Output: ['m', 'n', 'o', 'p']

    # 5. Step 5: String representation
    print("\n--- Print String Output ---")
    p.first_page()
    print(str(p))
   

    # 6. Test Error Handling (Out of range pages)
    print("\n--- Testing Exception Handling ---")
    try:
        p.go_to_page(10)
    except ValueError as e:
        print(f"Caught expected error: {e}")

    try:
        p.go_to_page(0)
    except ValueError as e:
        print(f"Caught expected error: {e}")