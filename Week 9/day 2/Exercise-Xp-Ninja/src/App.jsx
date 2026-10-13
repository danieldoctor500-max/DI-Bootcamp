import { connect } from 'react-redux'
import AuthPanel from './components/AuthPanel.jsx'
import TodoCategory from './components/TodoCategory.jsx'
import TodoForm from './components/TodoForm.jsx'
import { authFailed, authLoggedOut } from './redux/actions.js'
import { endSession } from './services/authService.js'

function App({ auth, categories, authFailed, authLoggedOut }) {
  if (auth.status !== 'authenticated') {
    return <AuthPanel />
  }

  const todos = categories.flatMap((category) => category.todos)
  const completedCount = todos.filter((todo) => todo.completed).length

  const handleLogout = () => {
    try {
      endSession()
      authLoggedOut()
    } catch (error) {
      authFailed(
        error instanceof Error
          ? `Could not end this browser session: ${error.message}`
          : 'Could not end this browser session.',
      )
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">D</span>
          daymark
        </a>
        <div className="account-bar">
          <span className="welcome-note">
            Hello, <strong>{auth.user.name}</strong>
          </span>
          <button className="logout-button" type="button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      <section className="page-heading" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">YOUR PERSONAL SPACE</p>
          <h1 id="page-title">Room for it all<span>.</span></h1>
          <p className="intro">Keep each part of your day in its own place.</p>
        </div>
        <div className="progress-badge">
          <span className="progress-value">{completedCount}<span>/{todos.length}</span></span>
          <span className="progress-label">completed</span>
        </div>
      </section>

      {auth.error && (
        <p className="form-message form-message-error" role="alert">{auth.error}</p>
      )}

      <TodoForm />

      <section className="category-grid" aria-label="Todos by category">
        {categories.map((category) => (
          <TodoCategory category={category} key={category.id} />
        ))}
      </section>

      <p className="page-note">Make room for what matters.</p>
    </main>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  categories: state.todos.categories,
})

export default connect(mapStateToProps, { authFailed, authLoggedOut })(App)
