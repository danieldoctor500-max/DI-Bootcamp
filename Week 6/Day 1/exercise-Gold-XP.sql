-- Exercise 1: Students table #2

-- 1. First four students alphabetically by last name
SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC
LIMIT 4;


-- 2. Youngest student
SELECT first_name, last_name, birth_date
FROM students
ORDER BY birth_date DESC
LIMIT 1;


-- 3. Three students, skipping the first two
SELECT first_name, last_name, birth_date
FROM students
ORDER BY id ASC
LIMIT 3
OFFSET 2;