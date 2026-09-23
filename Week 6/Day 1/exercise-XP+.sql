
-- Exercise 2: Students Table

CREATE TABLE students (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);


INSERT INTO students (last_name, first_name, birth_date)
VALUES
    ('Benichou', 'Marc', '1998-11-02'),
    ('Cohen', 'Yoan', '2010-12-03'),
    ('Benichou', 'Lea', '1987-07-27'),
    ('Dux', 'Amelia', '1996-04-07'),
    ('Grez', 'David', '2003-06-14'),
    ('Simpson', 'Omer', '1980-10-03');

INSERT INTO students (last_name, first_name, birth_date)
VALUES ('YOUR_LAST_NAME', 'YOUR_FIRST_NAME', 'YYYY-MM-DD');

INSERT INTO students (last_name, first_name, birth_date)
VALUES
    ('Shatner', 'William', '1955-04-25'),
    ('Parton', 'Dolly', '1959-11-29');

-- 1. Fetch all data
SELECT *
FROM students;


-- 2. Fetch first names and last names
SELECT first_name, last_name
FROM students;


-- 3. Student with ID 2
SELECT first_name, last_name
FROM students
WHERE id = 2;


-- 4. Marc Benichou
SELECT first_name, last_name
FROM students
WHERE last_name = 'Benichou'
  AND first_name = 'Marc';


-- 5. Last name Benichou OR first name Marc
SELECT first_name, last_name
FROM students
WHERE last_name = 'Benichou'
   OR first_name = 'Marc';


-- 6. First names containing the letter A
SELECT first_name, last_name
FROM students
WHERE first_name ILIKE '%a%';


-- 7. First names starting with A
SELECT first_name, last_name
FROM students
WHERE first_name ILIKE 'a%';


-- 8. First names ending with A
SELECT first_name, last_name
FROM students
WHERE first_name ILIKE '%a';


-- 9. Second-to-last letter is A
SELECT first_name, last_name
FROM students
WHERE first_name ILIKE '%a_';


-- 10. IDs 1 and 3
SELECT first_name, last_name
FROM students
WHERE id IN (1, 3);


-- 11. Birth date equal to or after 2000-01-01
SELECT *
FROM students
WHERE birth_date >= '2000-01-01';