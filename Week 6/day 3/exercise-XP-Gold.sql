-- EXERCISE 1: DVD RENTAL

-- 1. Get a list of all rentals which are out
-- A rental is out when return_date is NULL.

SELECT *
FROM rental
WHERE return_date IS NULL;


-- 2. Get a list of all customers who have not returned
-- their rentals.
-- Group the results by customer.

SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    COUNT(r.rental_id) AS outstanding_rentals
FROM customer AS c
INNER JOIN rental AS r
    ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY
    c.customer_id,
    c.first_name,
    c.last_name
ORDER BY outstanding_rentals DESC;


-- 3. Get a list of all Action films with Joe Swank.
-- Using the film_list view makes this easier.

SELECT
    title,
    description,
    category,
    actors
FROM film_list
WHERE category = 'Action'
AND actors ILIKE '%Joe Swank%';


-- ============================================================
-- EXERCISE 2: HAPPY HALLOWEEN
-- ============================================================

-- 1. How many stores there are, and in which city
-- and country they are located.

SELECT
    COUNT(s.store_id) AS number_of_stores,
    ci.city,
    co.country
FROM store AS s
INNER JOIN address AS a
    ON s.address_id = a.address_id
INNER JOIN city AS ci
    ON a.city_id = ci.city_id
INNER JOIN country AS co
    ON ci.country_id = co.country_id
GROUP BY
    ci.city,
    co.country;


-- 2. How many hours of viewing time there are
-- in total in each store.

SELECT
    s.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours
FROM store AS s
INNER JOIN inventory AS i
    ON s.store_id = i.store_id
INNER JOIN film AS f
    ON i.film_id = f.film_id
GROUP BY s.store_id
ORDER BY s.store_id;


-- 3. Exclude inventory items which are not yet returned.

SELECT
    s.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours
FROM store AS s
INNER JOIN inventory AS i
    ON s.store_id = i.store_id
INNER JOIN film AS f
    ON i.film_id = f.film_id
WHERE NOT EXISTS (
    SELECT 1
    FROM rental AS r
    WHERE r.inventory_id = i.inventory_id
    AND r.return_date IS NULL
)
GROUP BY s.store_id
ORDER BY s.store_id;


-- 4. List of all customers in the cities where
-- the stores are located.

SELECT DISTINCT
    c.customer_id,
    c.first_name,
    c.last_name,
    ci.city
FROM customer AS c
INNER JOIN address AS a
    ON c.address_id = a.address_id
INNER JOIN city AS ci
    ON a.city_id = ci.city_id
INNER JOIN store AS s
    ON ci.city_id = (
        SELECT store_address.city_id
        FROM address AS store_address
        WHERE store_address.address_id = s.address_id
    )
ORDER BY
    ci.city,
    c.last_name,
    c.first_name;


-- 5. List of all customers in the countries where
-- the stores are located.

SELECT DISTINCT
    c.customer_id,
    c.first_name,
    c.last_name,
    co.country
FROM customer AS c
INNER JOIN address AS a
    ON c.address_id = a.address_id
INNER JOIN city AS ci
    ON a.city_id = ci.city_id
INNER JOIN country AS co
    ON ci.country_id = co.country_id
WHERE co.country IN (
    SELECT DISTINCT
        store_country.country
    FROM store AS s
    INNER JOIN address AS store_address
        ON s.address_id = store_address.address_id
    INNER JOIN city AS store_city
        ON store_address.city_id = store_city.city_id
    INNER JOIN country AS store_country
        ON store_city.country_id = store_country.country_id
)
ORDER BY
    co.country,
    c.last_name,
    c.first_name;


-- 6. Create a SAFE LIST of movies.
-- Exclude Horror movies and movies containing:
-- beast, monster, ghost, dead, zombie, undead
-- in their title or description.

SELECT
    f.film_id,
    f.title,
    f.description,
    f.length
FROM film AS f
INNER JOIN film_category AS fc
    ON f.film_id = fc.film_id
INNER JOIN category AS c
    ON fc.category_id = c.category_id
WHERE c.name <> 'Horror'
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'
AND f.description NOT ILIKE '%beast%'
AND f.description NOT ILIKE '%monster%'
AND f.description NOT ILIKE '%ghost%'
AND f.description NOT ILIKE '%dead%'
AND f.description NOT ILIKE '%zombie%'
AND f.description NOT ILIKE '%undead%'
ORDER BY f.title;


-- Calculate the total viewing time of the SAFE LIST.

SELECT
    COUNT(*) AS total_safe_movies,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM film AS f
INNER JOIN film_category AS fc
    ON f.film_id = fc.film_id
INNER JOIN category AS c
    ON fc.category_id = c.category_id
WHERE c.name <> 'Horror'
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'
AND f.description NOT ILIKE '%beast%'
AND f.description NOT ILIKE '%monster%'
AND f.description NOT ILIKE '%ghost%'
AND f.description NOT ILIKE '%dead%'
AND f.description NOT ILIKE '%zombie%'
AND f.description NOT ILIKE '%undead%';


-- 7. GENERAL LIST
-- Calculate total viewing time in minutes, hours and days.

SELECT
    COUNT(*) AS total_movies,
    SUM(length) AS total_minutes,
    ROUND(SUM(length) / 60.0, 2) AS total_hours,
    ROUND(SUM(length) / 1440.0, 2) AS total_days
FROM film;


-- General viewing time for each store.

SELECT
    s.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM store AS s
INNER JOIN inventory AS i
    ON s.store_id = i.store_id
INNER JOIN film AS f
    ON i.film_id = f.film_id
GROUP BY s.store_id
ORDER BY s.store_id;


-- SAFE LIST viewing time for each store.
-- Exclude DVDs that have not yet been returned.

SELECT
    s.store_id,
    SUM(f.length) AS total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) AS total_hours,
    ROUND(SUM(f.length) / 1440.0, 2) AS total_days
FROM store AS s
INNER JOIN inventory AS i
    ON s.store_id = i.store_id
INNER JOIN film AS f
    ON i.film_id = f.film_id
INNER JOIN film_category AS fc
    ON f.film_id = fc.film_id
INNER JOIN category AS c
    ON fc.category_id = c.category_id
WHERE c.name <> 'Horror'
AND f.title NOT ILIKE '%beast%'
AND f.title NOT ILIKE '%monster%'
AND f.title NOT ILIKE '%ghost%'
AND f.title NOT ILIKE '%dead%'
AND f.title NOT ILIKE '%zombie%'
AND f.title NOT ILIKE '%undead%'
AND f.description NOT ILIKE '%beast%'
AND f.description NOT ILIKE '%monster%'
AND f.description NOT ILIKE '%ghost%'
AND f.description NOT ILIKE '%dead%'
AND f.description NOT ILIKE '%zombie%'
AND f.description NOT ILIKE '%undead%'
AND NOT EXISTS (
    SELECT 1
    FROM rental AS r
    WHERE r.inventory_id = i.inventory_id
    AND r.return_date IS NULL
)
GROUP BY s.store_id
ORDER BY s.store_id;