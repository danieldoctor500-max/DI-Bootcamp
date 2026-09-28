const express = require('express');

const router = express.Router();

const books = [
    {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        publishedYear: 1988
    },
    {
        id: 2,
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        publishedYear: 1958
    },
    {
        id: 3,
        title: 'Atomic Habits',
        author: 'James Clear',
        publishedYear: 2018
    }
];

// GET /books
router.get('/', (req, res) => {
    res.json(books);
});

// POST /books
router.post('/', (req, res) => {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
        return res.status(400).json({
            message: 'Title, author and publishedYear are required'
        });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        publishedYear
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT /books/:id
router.put('/:id', (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const { title, author, publishedYear } = req.body;

    if (title !== undefined) {
        book.title = title;
    }

    if (author !== undefined) {
        book.author = author;
    }

    if (publishedYear !== undefined) {
        book.publishedYear = publishedYear;
    }

    res.json(book);
});

// DELETE /books/:id
router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const deletedBook = books.splice(index, 1)[0];

    res.json({
        message: 'Book deleted successfully',
        book: deletedBook
    });
});

module.exports = router;