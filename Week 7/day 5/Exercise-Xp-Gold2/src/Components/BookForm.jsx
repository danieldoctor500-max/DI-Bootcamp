import { useState } from 'react'

const initialBook = {
  title: '',
  author: '',
  genre: '',
  review: '',
}

export default function BookForm() {
  const [book, setBook] = useState(initialBook)
  const [submittedBook, setSubmittedBook] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setBook((currentBook) => ({ ...currentBook, [name]: value }))
    setSubmittedBook(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const bookData = { ...book }
    setSubmittedBook(bookData)
    console.log('Book review submitted:', bookData)
  }

  return (
    <section className="exercise-panel" aria-labelledby="book-title">
      <div className="panel-heading">
        <span className="exercise-number">01</span>
        <div>
          <p className="eyebrow">Exercise 1</p>
          <h2 id="book-title">Share a book review</h2>
        </div>
      </div>

      <form className="form-fields" onSubmit={handleSubmit}>
        <label className="field" htmlFor="book-name">
          <span>Book title</span>
          <input
            id="book-name"
            name="title"
            onChange={handleChange}
            required
            type="text"
            value={book.title}
          />
        </label>
        <label className="field" htmlFor="book-author">
          <span>Author</span>
          <input
            id="book-author"
            name="author"
            onChange={handleChange}
            required
            type="text"
            value={book.author}
          />
        </label>
        <label className="field" htmlFor="book-genre">
          <span>Genre</span>
          <select
            id="book-genre"
            name="genre"
            onChange={handleChange}
            required
            value={book.genre}
          >
            <option disabled value="">Choose a genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Nonfiction">Nonfiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="field" htmlFor="book-review">
          <span>Your review</span>
          <textarea
            id="book-review"
            name="review"
            onChange={handleChange}
            required
            rows="4"
            value={book.review}
          />
        </label>
        <button className="primary-button" type="submit">Send review</button>
      </form>

      {submittedBook && (
        <div className="success-message" aria-live="polite" role="status">
          <strong>Review submitted.</strong>
          <p><span>{submittedBook.title}</span> by {submittedBook.author} has been added.</p>
        </div>
      )}
    </section>
  )
}
