const express = require("express");

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getAllBooks);

router.get("/:bookId", getBookById);

router.post("/", createBook);

router.put("/:bookId", updateBook);

router.delete("/:bookId", deleteBook);

module.exports = router;
