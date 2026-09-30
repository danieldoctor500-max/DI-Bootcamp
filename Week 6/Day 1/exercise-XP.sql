-- Create the items table
CREATE TABLE items (
    item_id INTEGER PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);

-- Insert sample products
INSERT INTO items (item_id, item_name, price)
VALUES
    (1, 'Small Desk', 100),
    (2, 'Large Desk', 300),
    (3, 'Fan', 80);

-- Create the customers table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

-- Insert sample customers
INSERT INTO customers (customer_id, first_name, last_name)
VALUES
    (1, 'Greg', 'Jones'),
    (2, 'Sandra', 'Jones'),
    (3, 'Scott', 'Scott'),
    (4, 'Trevor', 'Green'),
    (5, 'Melanie', 'Johnson');

-- 1. Show all items
SELECT *
FROM items;

-- 2. Show items priced above 80
SELECT *
FROM items
WHERE price > 80;

-- 3. Show items priced 300 or less
SELECT *
FROM items
WHERE price <= 300;

-- 4. Show customers whose last name is Smith
SELECT *
FROM customers
WHERE last_name = 'Smith';

-- 5. Show customers whose last name is Jones
SELECT *
FROM customers
WHERE last_name = 'Jones';

-- 6. Show customers whose first name is not Scott
SELECT *
FROM customers
WHERE first_name <> 'Scott';