-- Exercise 1: DVD Rentals

-- 1. Films rated G or PG that are not currently rented

SELECT DISTINCT
    f.film_id,
    f.title,
    f.rating,
    i.inventory_id
FROM film f
JOIN inventory i
    ON f.film_id = i.film_id
WHERE f.rating IN ('G', 'PG')
AND NOT EXISTS (
    SELECT 1
    FROM rental r
    WHERE r.inventory_id = i.inventory_id
    AND r.return_date IS NULL
)
ORDER BY f.title;


-- 2. Create a waiting list for children's movies

CREATE TABLE children_waiting_list (
    waiting_list_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    film_id INTEGER NOT NULL,
    waiting_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id),

    FOREIGN KEY (film_id)
        REFERENCES film(film_id)
);


-- Add test data to the waiting list

INSERT INTO children_waiting_list (customer_id, film_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 2),
    (5, 2);


-- View the waiting list

SELECT *
FROM children_waiting_list;


-- 3. Number of people waiting for each children's DVD

SELECT
    f.film_id,
    f.title,
    COUNT(w.waiting_list_id) AS people_waiting
FROM film f
LEFT JOIN children_waiting_list w
    ON f.film_id = w.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY
    f.film_id,
    f.title
ORDER BY
    people_waiting DESC;


-- Show the customers waiting for each movie

SELECT
    f.title,
    c.first_name,
    c.last_name,
    w.waiting_since
FROM children_waiting_list w
JOIN customer c
    ON w.customer_id = c.customer_id
JOIN film f
    ON w.film_id = f.film_id
ORDER BY
    f.title,
    w.waiting_since;