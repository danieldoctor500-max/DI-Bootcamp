import { useState, type FormEvent } from 'react'
import { List } from './components/List'
import './App.css'

interface Book {
  id: string
  title: string
  author: string
}

const starterBooks: Book[] = [
  { id: 'bk-01', title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin' },
  { id: 'bk-02', title: 'The Remains of the Day', author: 'Kazuo Ishiguro' },
  { id: 'bk-03', title: 'Kindred', author: 'Octavia E. Butler' },
]

function App() {
  const [books, setBooks] = useState<Book[]>(starterBooks)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [search, setSearch] = useState('')

  const visibleBooks = books.filter((book) =>
    `${book.title} ${book.author}`.toLowerCase().includes(search.trim().toLowerCase()),
  )

  function addBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanAuthor = author.trim()
    if (!cleanTitle || !cleanAuthor) return

    const id = globalThis.crypto?.randomUUID?.() ?? `book-${Date.now()}-${Math.random().toString(36).slice(2)}`
    setBooks((currentBooks) => [...currentBooks, { id, title: cleanTitle, author: cleanAuthor }])
    setTitle('')
    setAuthor('')
  }

  return (
    <div className="reading-room">
      <header className="reading-header">
        <a href="#shelf" className="bookmark-brand"><span className="brand-mark">B</span><span>FIELDNOTES <small>LIBRARY</small></span></a>
        <div className="header-location"><span>WEEK 10</span><b>/</b><span>DAY 1</span><b>/</b><span>TYPESCRIPT</span></div>
        <span className="live-count">SHELF <strong>{books.length.toString().padStart(2, '0')}</strong></span>
      </header>

      <main id="shelf" className="reading-main">
        <section className="reading-intro">
          <p className="section-kicker">A SMALL, GROWING COLLECTION <span>—</span> 001</p>
          <h1>Books worth<br /><em>keeping close.</em></h1>
          <p className="intro-copy">A personal shelf for the stories, ideas, and voices you want to return to.</p>
          <div className="intro-stamp" aria-hidden="true"><span>READ</span><b>MORE</b></div>
        </section>

        <section className="shelf-section" aria-labelledby="shelf-heading">
          <div className="shelf-heading-row">
            <div><p className="section-kicker">THE COLLECTION</p><h2 id="shelf-heading">On the shelf <span>({books.length})</span></h2></div>
            <label className="search-field"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find a title or author" aria-label="Search books" /></label>
          </div>
          {visibleBooks.length > 0 ? (
            <ul className="book-list">
              <List items={visibleBooks} getKey={(book) => book.id} renderItem={(book, index) => <div className="book-entry">
                <span className={`book-cover cover-${index % 4}`} aria-hidden="true"><span>{book.title.slice(0, 1).toUpperCase()}</span></span>
                <div className="book-copy"><span className="book-index">BOOK {String(index + 1).padStart(2, '0')}</span><h3>{book.title}</h3><p>{book.author}</p></div>
                <span className="entry-arrow" aria-hidden="true">↗</span>
              </div>} />
            </ul>
          ) : <div className="empty-shelf"><span>Nothing on this shelf.</span><p>Try another search, or add a book below.</p></div>}
        </section>

        <section className="add-section" aria-labelledby="add-heading">
          <div className="add-copy"><p className="section-kicker">MAKE ROOM FOR ANOTHER</p><h2 id="add-heading">Add to the shelf<span>.</span></h2><p>Every new book becomes a typed item in the generic list.</p></div>
          <form className="add-form" onSubmit={addBook}>
            <label htmlFor="book-title">Title</label><input id="book-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Book title" required />
            <label htmlFor="book-author">Author</label><input id="book-author" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author name" required />
            <button type="submit"><span>Add book</span><b aria-hidden="true">+</b></button>
          </form>
        </section>
        <footer className="reading-footer"><span>FIELDNOTES LIBRARY</span><span>BUILT WITH REACT + TYPESCRIPT</span></footer>
      </main>
    </div>
  )
}

export default App
