-- 1. Show the first four students, ordered by last name
SELECT
    first_name,
    last_name,
    birth_date
FROM students
ORDER BY last_name ASC
LIMIT 4;

-- 2. Show the youngest student
SELECT
    first_name,
    last_name,
    birth_date
FROM students
ORDER BY birth_date DESC
LIMIT 1;

-- 3. Show three students, skipping the first two results
SELECT
    first_name,
    last_name,
    birth_date
FROM students
ORDER BY id ASC
LIMIT 3
OFFSET 2;