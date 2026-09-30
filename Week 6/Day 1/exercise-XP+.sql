CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);

-- Insert the original students
INSERT INTO students (last_name, first_name, birth_date)
VALUES
    ('Benichou', 'Marc', '1998-11-02'),
    ('Cohen', 'Yoan', '2010-12-03'),
    ('Benichou', 'Lea', '1987-07-27'),
    ('Dux', 'Amelia', '1996-04-07'),
    ('Grez', 'David', '2003-06-14'),
    ('Simpson', 'Omer', '1980-10-03');

-- Add custom student data
INSERT INTO students (last_name, first_name, birth_date)
VALUES ('YOUR_LAST_NAME', 'YOUR_FIRST_NAME', 'YYYY-MM-DD');

-- Add more students
INSERT INTO students (last_name, first_name, birth_date)
VALUES
    ('Shatner', 'William', '1955-04-25'),
    ('Parton', 'Dolly', '1959-11-29');

-- 1. Show all student information
SELECT *
FROM students;

-- 2. Show only first and last names
SELECT
    first_name,
    last_name
FROM students;

-- 3. Show the student with ID 2
SELECT
    first_name,
    last_name
FROM students
WHERE id = 2;

-- 4. Find Marc Benichou
SELECT
    first_name,
    last_name
FROM students
WHERE last_name = 'Benichou'
  AND first_name = 'Marc';

-- 5. Find either Benichou last names or Marc first names
SELECT
    first_name,
    last_name
FROM students
WHERE last_name = 'Benichou'
   OR first_name = 'Marc';

-- 6. Find first names containing the letter 'a'
SELECT
    first_name,
    last_name
FROM students
WHERE first_name ILIKE '%a%';

-- 7. Find first names starting with 'a'
SELECT
    first_name,
    last_name
FROM students
WHERE first_name ILIKE 'a%';

-- 8. Find first names ending with 'a'
SELECT
    first_name,
    last_name
FROM students
WHERE first_name ILIKE '%a';

-- 9. Find first names whose second-to-last letter is 'a'
SELECT
    first_name,
    last_name
FROM students
WHERE first_name ILIKE '%a_';

-- 10. Show students with IDs 1 and 3
SELECT
    first_name,
    last_name
FROM students
WHERE id IN (1, 3);

-- 11. Show students born on or after 2000-01-01
SELECT *
FROM students
WHERE birth_date >= '2000-01-01';