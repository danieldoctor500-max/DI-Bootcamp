"use strict";
// ============================================
// DAILY CHALLENGE: LIBRARY SYSTEM
// ============================================
// 2. Library Class
class Library {
    books = [];
    addBook(book) {
        this.books.push(book);
    }
    getBookDetails(isbn) {
        return this.books.find(book => book.isbn === isbn);
    }
    getAllBooks() {
        return this.books;
    }
}
// 3. DigitalLibrary Class
class DigitalLibrary extends Library {
    website;
    constructor(website) {
        super();
        this.website = website;
    }
    listBooks() {
        return this.getAllBooks().map(book => book.title);
    }
}
// 4. Create Digital Library
const library = new DigitalLibrary("https://www.mylibrary.com");
// 5. Add Books
library.addBook({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    publishedYear: 1925,
    genre: "Fiction"
});
library.addBook({
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    isbn: "9780380015035",
    publishedYear: 1958,
    genre: "Historical Fiction"
});
library.addBook({
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    publishedYear: 2008,
    genre: "Programming"
});
// 6. Print Website
console.log("Library Website:");
console.log(library.website);
// 7. Get Book Details
console.log("\nBook Details:");
console.log(library.getBookDetails("9780743273565"));
console.log(library.getBookDetails("9780380015035"));
console.log(library.getBookDetails("9780132350884"));
// 8. List All Book Titles
console.log("\nAll Book Titles:");
console.log(library.listBooks());
