
-- SQL Basics
-- Exercise 1: Actors

-- Create the actors table
CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- Insert actors
INSERT INTO actors (first_name, last_name)
VALUES
    ('Tom', 'Hanks'),
    ('Denzel', 'Washington'),
    ('Morgan', 'Freeman'),
    ('Emma', 'Stone'),
    ('Leonardo', 'DiCaprio');


-- Exercise 1: Count how many actors are in the table
SELECT COUNT(*) AS total_actors
FROM actors;

-- Exercise 2: Try to add an actor with blank fields
INSERT INTO actors (first_name, last_name)
VALUES (NULL, NULL);