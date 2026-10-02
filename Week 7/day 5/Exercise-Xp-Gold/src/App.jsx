import Forms from './Components/Forms.jsx'

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Forms, with state</h1>
        <p className="intro">Controlled fields, validation, and a few React form elements.</p>
      </header>
      <Forms />
    </main>
  )
}
