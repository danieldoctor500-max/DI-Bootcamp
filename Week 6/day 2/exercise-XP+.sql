-- Exercise 1: Items and Customers

-- 1. All items ordered by price, lowest to highest
SELECT *
FROM items
ORDER BY price ASC;

-- 2. Items with price 80 or above, highest to lowest
SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

-- 3. First 3 customers alphabetically by first name
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

-- 4. Last names in reverse alphabetical order
SELECT last_name
FROM customers
ORDER BY last_name DESC;


-- Exercise 3: Items and Customers

-- Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    item_id INTEGER REFERENCES items(item_id),
    quantity_purchased INTEGER NOT NULL
);

-- Insert purchases using subqueries
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES
(
    (SELECT customer_id
     FROM customers
     WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT item_id
     FROM items
     WHERE name = 'Fan'),
    1
),
(
    (SELECT customer_id
     FROM customers
     WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT item_id
     FROM items
     WHERE name = 'Large Desk'),
    10
),
(
    (SELECT customer_id
     FROM customers
     WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT item_id
     FROM items
     WHERE name = 'Small Desk'),
    2
);

-- View all purchases
SELECT *
FROM purchases;

-- Join purchases with customers
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    purchases.item_id,
    purchases.quantity_purchased
FROM purchases
INNER JOIN customers
    ON purchases.customer_id = customers.customer_id;

-- Purchases of customer ID 5
SELECT *
FROM purchases
WHERE customer_id = 5;

-- Show purchases with item names
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    items.name AS item_name
FROM customers
INNER JOIN purchases
    ON customers.customer_id = purchases.customer_id
INNER JOIN items
    ON purchases.item_id = items.item_id;

-- Test purchase without an item
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (1, NULL, 1);

-- View purchases again
SELECT *
FROM purchases;