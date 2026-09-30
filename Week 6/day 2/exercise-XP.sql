
-- 1. Show all items, ordered from the cheapest to the most expensive
SELECT *
FROM items
ORDER BY price ASC;

-- 2. Show items priced 80 or more, from highest to lowest
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