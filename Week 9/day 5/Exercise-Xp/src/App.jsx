import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook, removeBook } from './redux/booksSlice.js'
import {
  selectBooks,
  selectFantasyBooks,
  selectHorrorBooks,
  selectScienceFictionBooks,
} from './redux/selectors.js'

const genres = [
  { label: 'All books', value: 'All', selector: selectBooks },
  { label: 'Horror', value: 'Horror', selector: selectHorrorBooks },
  { label: 'Fantasy', value: 'Fantasy', selector: selectFantasyBooks },
  { label: 'Science fiction', value: 'Science Fiction', selector: selectScienceFictionBooks },
]

function BookList() {
  const [selectedGenre, setSelectedGenre] = useState('All')
  const dispatch = useDispatch()
  const books = useSelector(genres.find(({ value }) => value === selectedGenre).selector)

  return (
    <section className="inventory" aria-labelledby="inventory-title">
      <div className="inventory-heading">
        <div>
          <p className="eyebrow">YOUR COLLECTION</p>
          <h2 id="inventory-title">{selectedGenre === 'All' ? 'Every good story' : selectedGenre}</h2>
        </div>
        <span className="book-count">{books.length} {books.length === 1 ? 'book' : 'books'}</span>
      </div>

      <div className="genre-tabs" role="group" aria-label="Filter books by genre">
        {genres.map(({ label, value }) => (
          <button
            key={value}
            className={`genre-tab${selectedGenre === value ? ' active' : ''}`}
            type="button"
            aria-pressed={selectedGenre === value}
            onClick={() => setSelectedGenre(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {books.length > 0 ? (
        <ul className="book-grid">
          {books.map((book, index) => (
            <li className="book-card" key={book.id}>
              <div className={`book-cover cover-${index % 3}`} aria-hidden="true">
                <span>{book.title.charAt(0)}</span>
                <small>{book.genre}</small>
              </div>
              <div className="book-info">
                <span className="genre-label">{book.genre}</span>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
              </div>
              <button
                className="remove-book"
                type="button"
                aria-label={`Remove ${book.title}`}
                onClick={() => dispatch(removeBook(book.id))}
              >
                −
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No books in this genre yet. Add one to get started.</p>
      )}
    </section>
  )
}

function AddBookForm() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState('Horror')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanAuthor = author.trim()
    if (!cleanTitle || !cleanAuthor) return

    dispatch(addBook({ title: cleanTitle, author: cleanAuthor, genre }))
    setTitle('')
    setAuthor('')
  }

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="add-book-heading">
        <div>
          <p className="eyebrow">GROW YOUR SHELF</p>
          <h2>Add a book</h2>
        </div>
        <span className="plus-mark" aria-hidden="true">+</span>
      </div>
      <div className="form-fields">
        <label>
          Book title
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. The Left Hand of Darkness"
          />
        </label>
        <label>
          Author
          <input
            required
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="Author name"
          />
        </label>
        <label>
          Genre
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option>Horror</option>
            <option>Fantasy</option>
            <option>Science Fiction</option>
          </select>
        </label>
        <button className="add-button" type="submit">Add to inventory <span aria-hidden="true">↗</span></button>
      </div>
    </form>
  )
}

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Shelf Notes home">
          <span className="brand-mark" aria-hidden="true">S</span>
          shelf notes
        </a>
        <span className="topbar-note">WEEK 09 <span>·</span> REDUX PERFORMANCE</span>
      </header>

      <section className="hero">
        <p className="eyebrow">A LITTLE LIBRARY, WELL ORGANIZED</p>
        <h1>Stories for every<br /><em>kind of curious.</em></h1>
        <p className="intro">Browse your collection by genre. Memoized selectors keep each view focused and efficient.</p>
      </section>

      <BookList />
      <AddBookForm />
      <footer className="page-note">Thoughtfully sorted with Redux Toolkit selectors.</footer>
    </main>
  )
}

export default App
