import Clock from './Components/Clock.jsx'
import Form from './Components/Form.jsx'

export default function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <h1>Time and contact</h1>
        <p className="intro">A live lifecycle example and a form with custom validation.</p>
      </header>
      <div className="content-grid">
        <Form />
        <Clock />
      </div>
    </main>
  )
}
