-- 1. Show all items from the cheapest to the most expensive
SELECT *
FROM items
ORDER BY price ASC;

-- 2. Show products priced 80 or more, from highest to lowest
SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

-- 3. Show the first three customers alphabetically by first name
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

-- 4. Show all last names in reverse alphabetical order
SELECT last_name
FROM customers
ORDER BY last_name DESC;

-- Create a table to track purchases made by customers
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