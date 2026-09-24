-- PART I

-- 1. Create Customer table

CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL
);


-- Create Customer Profile table

CREATE TABLE CustomerProfile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT FALSE,
    customer_id INTEGER UNIQUE,
    
    FOREIGN KEY (customer_id)
        REFERENCES Customer(id)
);


-- 2. Insert customers

INSERT INTO Customer (first_name, last_name)
VALUES
    ('John', 'Doe'),
    ('Jerome', 'Lalu'),
    ('Lea', 'Rive');


-- 3. Insert customer profiles using subqueries

INSERT INTO CustomerProfile (isLoggedIn, customer_id)
VALUES
    (
        TRUE,
        (SELECT id FROM Customer WHERE first_name = 'John')
    ),
    (
        FALSE,
        (SELECT id FROM Customer WHERE first_name = 'Jerome')
    );


-- 4. Display the first_name of logged-in customers

SELECT
    c.first_name
FROM Customer c
INNER JOIN CustomerProfile cp
    ON c.id = cp.customer_id
WHERE cp.isLoggedIn = TRUE;


-- Display all customers, including customers
-- who do not have a profile

SELECT
    c.first_name,
    cp.isLoggedIn
FROM Customer c
LEFT JOIN CustomerProfile cp
    ON c.id = cp.customer_id;


-- Display the number of customers who are not logged in

SELECT
    COUNT(*) AS not_logged_in
FROM Customer c
LEFT JOIN CustomerProfile cp
    ON c.id = cp.customer_id
WHERE cp.isLoggedIn = FALSE
   OR cp.isLoggedIn IS NULL;


-- ============================================================
-- PART II
-- ============================================================


-- 1. Create Book table

CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);


-- 2. Insert books

INSERT INTO Book (title, author)
VALUES
    ('Alice In Wonderland', 'Lewis Carroll'),
    ('Harry Potter', 'J.K Rowling'),
    ('To kill a mockingbird', 'Harper Lee');


-- 3. Create Student table

CREATE TABLE Student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INTEGER CHECK (age <= 15)
);


-- 4. Insert students

INSERT INTO Student (name, age)
VALUES
    ('John', 12),
    ('Lera', 11),
    ('Patrick', 10),
    ('Bob', 14);


-- 5. Create Library junction table

CREATE TABLE Library (
    book_fk_id INTEGER,
    student_fk_id INTEGER,
    borrowed_date DATE,

    PRIMARY KEY (book_fk_id, student_fk_id),

    FOREIGN KEY (book_fk_id)
        REFERENCES Book(book_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (student_fk_id)
        REFERENCES Student(student_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- 6. Insert records using subqueries

INSERT INTO Library
    (book_fk_id, student_fk_id, borrowed_date)
VALUES
    (
        (SELECT book_id
         FROM Book
         WHERE title = 'Alice In Wonderland'),

        (SELECT student_id
         FROM Student
         WHERE name = 'John'),

        '2022-02-15'
    ),

    (
        (SELECT book_id
         FROM Book
         WHERE title = 'To kill a mockingbird'),

        (SELECT student_id
         FROM Student
         WHERE name = 'Bob'),

        '2021-03-03'
    ),

    (
        (SELECT book_id
         FROM Book
         WHERE title = 'Alice In Wonderland'),

        (SELECT student_id
         FROM Student
         WHERE name = 'Lera'),

        '2021-05-23'
    ),

    (
        (SELECT book_id
         FROM Book
         WHERE title = 'Harry Potter'),

        (SELECT student_id
         FROM Student
         WHERE name = 'Bob'),

        '2021-08-12'
    );


-- 7. Display all columns from the junction table

SELECT *
FROM Library;


-- Display the student name and borrowed book title

SELECT
    s.name AS student_name,
    b.title AS book_title
FROM Library l
INNER JOIN Student s
    ON l.student_fk_id = s.student_id
INNER JOIN Book b
    ON l.book_fk_id = b.book_id;


-- Display the average age of children
-- who borrowed Alice In Wonderland

SELECT
    AVG(s.age) AS average_age
FROM Library l
INNER JOIN Student s
    ON l.student_fk_id = s.student_id
INNER JOIN Book b
    ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';


-- Delete a student

DELETE FROM Student
WHERE name = 'John';


-- Check what happened in the junction table

SELECT *
FROM Library;