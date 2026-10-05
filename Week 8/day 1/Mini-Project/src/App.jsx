import ColumnLeft from './columns/ColumnLeft.jsx'
import ColumnRight from './columns/ColumnRight.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand__mark" aria-hidden="true">!</span>
          Error boundaries in React
        </a>
        <span className="topbar__tag">WEEK 8 · DAY 1</span>
      </header>

      <main className="columns">
        <aside className="column column--left">
          <ColumnLeft />
        </aside>

        <section className="column column--right">
          <ErrorBoundary>
            <ColumnRight />
          </ErrorBoundary>
        </section>
      </main>
    </div>
  )
}

export default App
