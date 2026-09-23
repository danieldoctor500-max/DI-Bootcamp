-- Exercise 1: Items and Customers


-- Create items table
CREATE TABLE items (
    item_id INTEGER PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);

-- Add items
INSERT INTO items (item_id, item_name, price)
VALUES
    (1, 'Small Desk', 100),
    (2, 'Large Desk', 300),
    (3, 'Fan', 80);


-- Create customers table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

-- Add customers
INSERT INTO customers (customer_id, first_name, last_name)
VALUES
    (1, 'Greg', 'Jones'),
    (2, 'Sandra', 'Jones'),
    (3, 'Scott', 'Scott'),
    (4, 'Trevor', 'Green'),
    (5, 'Melanie', 'Johnson');


-- 1. All items
SELECT *
FROM items;


-- 2. Items with price above 80
SELECT *
FROM items
WHERE price > 80;


-- 3. Items with price below 300, including 300
SELECT *
FROM items
WHERE price <= 300;


-- 4. Customers whose last name is Smith
SELECT *
FROM customers
WHERE last_name = 'Smith';


-- 5. Customers whose last name is Jones
SELECT *
FROM customers
WHERE last_name = 'Jones';


-- 6. Customers whose first name is not Scott
SELECT *
FROM customers
WHERE first_name <> 'Scott';