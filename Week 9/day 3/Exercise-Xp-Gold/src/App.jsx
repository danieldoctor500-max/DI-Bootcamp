import { useSelector } from 'react-redux'
import AuthenticatedContent from './components/AuthenticatedContent.jsx'
import Login from './components/Login.jsx'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">D</span>
          daymark
        </a>
        <span className="topbar-note">A little progress, every day.</span>
      </header>

      <section className="auth-card" aria-labelledby="page-title">
        {isAuthenticated && user ? (
          <AuthenticatedContent user={user} />
        ) : (
          <>
            <div className="card-heading">
              <p className="eyebrow">YOUR PERSONAL SPACE</p>
              <h1 id="page-title">Welcome <span>back.</span></h1>
              <p className="card-copy">Sign in to continue to your daymark.</p>
            </div>
            <Login />
          </>
        )}
      </section>

      <p className="page-note">Make room for what matters.</p>
    </main>
  )
}

export default App
