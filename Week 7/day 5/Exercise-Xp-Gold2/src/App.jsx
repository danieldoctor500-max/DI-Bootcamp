import BookForm from './Components/BookForm.jsx'
import ContactForm from './Components/ContactForm.jsx'

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Forms that remember</h1>
        <p className="intro">Capture input in state, validate it, and respond on submit.</p>
      </header>
      <div className="exercise-grid">
        <BookForm />
        <ContactForm />
      </div>
    </main>
  )
}
