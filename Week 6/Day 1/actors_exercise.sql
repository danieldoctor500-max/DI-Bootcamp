
-- Create the actors table
CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- Insert sample actors
INSERT INTO actors (first_name, last_name)
VALUES
    ('Tom', 'Hanks'),
    ('Denzel', 'Washington'),
    ('Morgan', 'Freeman'),
    ('Emma', 'Stone'),
    ('Leonardo', 'DiCaprio');

-- Count how many actors are in the table
SELECT COUNT(*) AS total_actors
FROM actors;

-- Try inserting an actor with empty values
-- This may fail if the database enforces NOT NULL constraints.
INSERT INTO actors (first_name, last_name)
VALUES (NULL, NULL);