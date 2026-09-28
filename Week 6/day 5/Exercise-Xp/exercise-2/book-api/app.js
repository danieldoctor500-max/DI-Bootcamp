const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: "Things Fall Apart",
        author: "Chinua Achebe",
        publishedYear: 1958
    },
    {
        id: 2,
        title: "The River Between",
        author: "Ngugi wa Thiong'o",
        publishedYear: 1965
    },
    {
        id: 3,
        title: "Animal Farm",
        author: "George Orwell",
        publishedYear: 1945
    }
];

// GET all books
app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});

// GET one book
app.get("/api/books/:bookId", (req, res) => {
    const bookId = parseInt(req.params.bookId);

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json(book);
});

// POST a new book
app.post("/api/books", (req, res) => {
    const { title, author, publishedYear } = req.body;

    if (!title || !author || !publishedYear) {
        return res.status(400).json({
            message: "Title, author and publishedYear are required"
        });
    }

    const newBook = {
        id: books.length > 0
            ? books[books.length - 1].id + 1
            : 1,
        title,
        author,
        publishedYear
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

app.listen(PORT, () => {
    console.log(`Book API server is running on http://localhost:${PORT}`);
});