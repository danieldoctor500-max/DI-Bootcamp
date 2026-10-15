import AgeControls from './components/AgeControls.jsx'
import AgeDisplay from './components/AgeDisplay.jsx'

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Agewell home">
          <span className="brand-mark" aria-hidden="true">a</span>
          agewell
        </a>
        <span className="topbar-note">A moment for yourself.</span>
      </header>

      <section className="tracker-card" aria-labelledby="page-title">
        <div className="card-heading">
          <p className="eyebrow">A SIMPLE LITTLE TRACKER</p>
          <h1 id="page-title">Growing, <span>gracefully.</span></h1>
          <p className="intro">
            Every year is a story. Take a look at the number you&apos;re on.
          </p>
        </div>
        <AgeDisplay />
        <AgeControls />
      </section>

      <p className="page-note">The best is always still becoming.</p>
    </main>
  )
}

export default App
