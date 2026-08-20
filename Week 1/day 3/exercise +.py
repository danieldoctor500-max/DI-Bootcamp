#1: Student Grade Summary
student_grades = {
    "Alice": [88, 92, 100],
    "Bob": [75, 78, 80],
    "Charlie": [92, 90, 85],
    "Dana": [83, 88, 92],
    "Eli": [78, 80, 72]
}

# 1. Calculate student averages
student_averages = {}
for name, grades in student_grades.items():
    student_averages[name] = sum(grades) / len(grades)

# 2. Assign letter grades
student_letter_grades = {}
for name, avg in student_averages.items():
    if avg >= 90:
        grade = 'A'
    elif avg >= 80:
        grade = 'B'
    elif avg >= 70:
        grade = 'C'
    elif avg >= 60:
        grade = 'D'
    else:
        grade = 'F'
    student_letter_grades[name] = grade

# 3. Calculate class average
class_average = sum(student_averages.values()) / len(student_averages)

# 4. Display results
print(f"Class Average: {class_average:.2f}\n" + "-"*40)
max_len = max(len(name) for name in student_grades.keys())
for name in student_grades.keys():
    padding = ' ' * (max_len - len(name))
    print(f"{name}:{padding} Average = {student_averages[name]:.2f}, Letter Grade = {student_letter_grades[name]}")

#2: Advanced Data ManipulatIon Analysis
sales_data = [
    {"customer_id": 1, "product": "Smartphone", "price": 600, "quantity": 1, "date": "2023-04-03"},
    {"customer_id": 2, "product": "Laptop", "price": 1200, "quantity": 1, "date": "2023-04-04"},
    {"customer_id": 1, "product": "Laptop", "price": 1000, "quantity": 1, "date": "2023-04-05"},
    {"customer_id": 2, "product": "Smartphone", "price": 500, "quantity": 2, "date": "2023-04-06"},
    {"customer_id": 3, "product": "Headphones", "price": 150, "quantity": 4, "date": "2023-04-07"},
    {"customer_id": 3, "product": "Smartphone", "price": 550, "quantity": 1, "date": "2023-04-08"},
    {"customer_id": 1, "product": "Headphones", "price": 100, "quantity": 2, "date": "2023-04-09"},
]

# 1. Enhance sales data with 'total_price'
for item in sales_data:
    item["total_price"] = item["price"] * item["quantity"]

# 2. Total Sales per product category & Customer Spending Profile
product_sales = {}
customer_spending = {}
purchase_counts = {}

for item in sales_data:
    prod = item["product"]
    cust = item["customer_id"]
    revenue = item["total_price"]
    
    # Product sales
    product_sales[prod] = product_sales.get(prod, 0) + revenue
    
    # Customer spending
    customer_spending[cust] = customer_spending.get(cust, 0) + revenue
    
    # Purchase count for loyalty
    purchase_counts[cust] = purchase_counts.get(cust, 0) + 1

# 3. High-Value Transactions (> $500, sorted descending)
high_value_txs = sorted(
    [item for item in sales_data if item["total_price"] > 500],
    key=lambda x: x["total_price"],
    reverse=True
)

# 4. Customer Loyalty Identification
loyal_customers = [cust for cust, count in purchase_counts.items() if count > 1]

# Display Core Results
print("--- Product Sales ---", product_sales)
print("--- Customer Spending ---", customer_spending)
print("--- Loyal Customers (IDs) ---", loyal_customers)
print("--- High-Value Transactions ---")
for tx in high_value_txs:
    print(tx)

