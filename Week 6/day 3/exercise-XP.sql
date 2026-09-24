-- =========================================
-- EXERCISE 1: DVD RENTAL
-- =========================================

-- Question 1
SELECT name
FROM language;


-- Question 2
SELECT
    film.title,
    film.description,
    language.name AS language_name
FROM film
INNER JOIN language
    ON film.language_id = language.language_id;


-- Question 3
SELECT
    film.title,
    film.description,
    language.name AS language_name
FROM language
LEFT JOIN film
    ON language.language_id = film.language_id;


-- Question 4
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

INSERT INTO new_film (name)
VALUES
    ('The Last Journey'),
    ('Kenya Adventure'),
    ('Ocean Mystery');

SELECT * FROM new_film;


-- Question 5
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,

    film_id INTEGER NOT NULL
        REFERENCES new_film(id)
        ON DELETE CASCADE,

    language_id INTEGER NOT NULL
        REFERENCES language(language_id),

    title VARCHAR(200) NOT NULL,

    score INTEGER
        CHECK (score BETWEEN 1 AND 10),

    review_text TEXT,

    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Question 6
INSERT INTO customer_review
    (film_id, language_id, title, score, review_text)
VALUES
    (2, 1, 'Great Movie', 9, 'I really enjoyed this movie.'),
    (3, 1, 'Good Adventure', 8, 'An entertaining movie with an interesting story.');


-- Question 7
DELETE FROM new_film
WHERE id = 2;

SELECT * FROM new_film;

SELECT * FROM customer_review;