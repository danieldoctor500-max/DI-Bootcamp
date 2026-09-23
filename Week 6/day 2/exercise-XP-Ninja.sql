-- Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    item_id INTEGER REFERENCES items(item_id),
    quantity_purchased INTEGER NOT NULL
);

-- Insert Scott's purchase
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT customer_id
     FROM customers
     WHERE first_name = 'Scott'
       AND last_name = 'Scott'),
    (SELECT item_id
     FROM items
     WHERE name = 'Fan'),
    1
);

-- Insert Melanie's purchase
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT customer_id
     FROM customers
     WHERE first_name = 'Melanie'
       AND last_name = 'Johnson'),
    (SELECT item_id
     FROM items
     WHERE name = 'Large Desk'),
    10
);

-- Insert Greg's purchase
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT customer_id
     FROM customers
     WHERE first_name = 'Greg'
       AND last_name = 'Jones'),
    (SELECT item_id
     FROM items
     WHERE name = 'Small Desk'),
    2
);

-- Select all purchases
SELECT *
FROM purchases;

-- Inner join purchases with customers
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    purchases.item_id,
    purchases.quantity_purchased
FROM purchases
INNER JOIN customers
    ON purchases.customer_id = customers.customer_id;

-- Find purchases for customer_id 5
SELECT *
FROM purchases
WHERE customer_id = 5;

-- Inner join purchases with items
SELECT
    purchases.id,
    items.name,
    purchases.quantity_purchased
FROM purchases
INNER JOIN items
    ON purchases.item_id = items.item_id;

-- Find customers who purchased both Large Desk and Small Desk
SELECT
    customers.first_name,
    customers.last_name
FROM customers
INNER JOIN purchases
    ON customers.customer_id = purchases.customer_id
INNER JOIN items
    ON purchases.item_id = items.item_id
WHERE items.name IN ('Large Desk', 'Small Desk')
GROUP BY
    customers.customer_id,
    customers.first_name,
    customers.last_name
HAVING COUNT(DISTINCT items.name) = 2;

-- Get the last two customers by first name
SELECT first_name, last_name
FROM (
    SELECT first_name, last_name
    FROM customers
    ORDER BY first_name DESC
    LIMIT 2
) AS last_two
ORDER BY first_name ASC;

-- Find Scott Scott
SELECT *
FROM customers
WHERE first_name = 'Scott'
AND last_name = 'Scott';

-- Delete purchases belonging to Scott
DELETE FROM purchases
WHERE customer_id = 3;

-- Delete purchases with IDs 5 and 6
DELETE FROM purchases
WHERE id IN (5, 6);

-- LEFT JOIN purchases with customers
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    purchases.item_id,
    purchases.quantity_purchased
FROM purchases
LEFT JOIN customers
    ON purchases.customer_id = customers.customer_id
ORDER BY purchases.id;

-- Insert a purchase without an item
INSERT INTO purchases (
    customer_id,
    item_id,
    quantity_purchased
)
VALUES (1, NULL, 1);

-- Change customer foreign key to ON DELETE SET NULL
ALTER TABLE purchases
DROP CONSTRAINT purchases_customer_id_fkey;

ALTER TABLE purchases
ADD CONSTRAINT purchases_customer_id_fkey
FOREIGN KEY (customer_id)
REFERENCES customers(customer_id)
ON DELETE SET NULL;

-- Delete Scott
DELETE FROM customers
WHERE customer_id = 3;

-- Display purchases
SELECT *
FROM purchases
ORDER BY id;

-- LEFT JOIN purchases with customers
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    purchases.item_id,
    purchases.quantity_purchased
FROM purchases
LEFT JOIN customers
    ON purchases.customer_id = customers.customer_id
ORDER BY purchases.id;

-- INNER JOIN purchases with customers
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    purchases.item_id,
    purchases.quantity_purchased
FROM purchases
INNER JOIN customers
    ON purchases.customer_id = customers.customer_id
ORDER BY purchases.id;

-- LEFT JOIN purchases with customers and items
SELECT
    purchases.id,
    customers.first_name,
    customers.last_name,
    items.name AS item_name,
    purchases.quantity_purchased
FROM purchases
LEFT JOIN customers
    ON purchases.customer_id = customers.customer_id
LEFT JOIN items
    ON purchases.item_id = items.item_id
ORDER BY purchases.id;

-- Update purchase quantity
UPDATE purchases
SET quantity_purchased = 5
WHERE id = 3;

-- Display final purchases
SELECT *
FROM purchases
ORDER BY id;