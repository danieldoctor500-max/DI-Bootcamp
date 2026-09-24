-- PRODUCT ORDERS EXERCISE


-- 1. Create the product_orders table

CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    order_date DATE DEFAULT CURRENT_DATE
);


-- 2. Create the items table
-- One order can have many items

CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    order_id INTEGER REFERENCES product_orders(order_id)
);


-- Add some orders

INSERT INTO product_orders (order_date)
VALUES
    ('2026-09-20'),
    ('2026-09-21'),
    ('2026-09-22');


-- Add some items to the orders

INSERT INTO items (item_name, price, order_id)
VALUES
    ('Laptop', 800.00, 1),
    ('Mouse', 25.00, 1),
    ('Keyboard', 50.00, 1),
    ('Monitor', 250.00, 2),
    ('USB Cable', 10.00, 2),
    ('Headphones', 75.00, 3);


-- Check the orders

SELECT *
FROM product_orders;


-- Check the items

SELECT *
FROM items;


-- 3. Create a function that calculates
-- the total price of an order

CREATE OR REPLACE FUNCTION get_order_total(order_number INTEGER)
RETURNS DECIMAL(10, 2)
AS $$
BEGIN
    RETURN (
        SELECT COALESCE(SUM(price), 0)
        FROM items
        WHERE order_id = order_number
    );
END;
$$ LANGUAGE plpgsql;


-- Test the function

SELECT get_order_total(1);

SELECT get_order_total(2);

SELECT get_order_total(3);


-- Show all orders with their total prices

SELECT
    order_id,
    order_date,
    get_order_total(order_id) AS total_price
FROM product_orders;


-- ============================================================
-- BONUS
-- ============================================================


-- 1. Create the users table

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(150)
);


-- 2. Add a user_id column to product_orders

ALTER TABLE product_orders
ADD COLUMN user_id INTEGER;


-- Connect product_orders to users

ALTER TABLE product_orders
ADD FOREIGN KEY (user_id)
REFERENCES users(user_id);


-- Add some users

INSERT INTO users (username, email)
VALUES
    ('John', 'john@example.com'),
    ('Mary', 'mary@example.com'),
    ('Peter', 'peter@example.com');


-- Connect the existing orders to users

UPDATE product_orders
SET user_id = 1
WHERE order_id = 1;

UPDATE product_orders
SET user_id = 2
WHERE order_id = 2;

UPDATE product_orders
SET user_id = 3
WHERE order_id = 3;


-- 3. Function to get the total price
-- of a specific order belonging to a specific user

CREATE OR REPLACE FUNCTION get_user_order_total(
    user_number INTEGER,
    order_number INTEGER
)
RETURNS DECIMAL(10, 2)
AS $$
BEGIN
    RETURN (
        SELECT COALESCE(SUM(i.price), 0)
        FROM items i
        JOIN product_orders o
            ON i.order_id = o.order_id
        WHERE o.order_id = order_number
        AND o.user_id = user_number
    );
END;
$$ LANGUAGE plpgsql;


-- Test the bonus function

SELECT get_user_order_total(1, 1);

SELECT get_user_order_total(2, 2);

SELECT get_user_order_total(3, 3);